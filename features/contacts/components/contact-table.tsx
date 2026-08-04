"use client";

import * as React from "react";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useBulkDeleteContacts } from "../mutations/useBulkDeleteContacts";
import { exportContacts } from "@/lib/export-contacts";
import { Contact } from "@/types/contact";
interface ContactTableProps {
  columns: ColumnDef<Contact>[];
  data: Contact[];
}

export function ContactTable({ columns, data }: ContactTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const bulkDelete = useBulkDeleteContacts();
  const [rowSelection, setRowSelection] = React.useState({});
  const companies = Array.from(
    new Set(data.map((contact) => contact.company).filter(Boolean)),
  );
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
      rowSelection,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            aria-label="Search contacts by first name"
            placeholder="Search by first name..."
            value={
              (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="w-64"
          />
          <Input
            aria-label="Search contacts by tag"
            placeholder="Search by tag..."
            value={(table.getColumn("tags")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("tags")?.setFilterValue(event.target.value)
            }
            className="w-56"
          />

          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={
              (table.getColumn("company")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
              table
                .getColumn("company")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Company" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>

              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              <Button
                variant="outline"
                aria-label="Export selected contacts"
                onClick={() =>
                  exportContacts(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original),
                  )
                }
              >
                Export Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>

              <Button
                variant="destructive"
                aria-label="Delete selected contacts"
                onClick={() =>
                  bulkDelete.mutate(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original.id),
                  )
                }
                disabled={bulkDelete.isPending}
              >
                Delete Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Show or hide table columns">
                Columns
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="overflow-x-auto"></div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                  aria-live="polite"
                >
                  No contacts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>

          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
