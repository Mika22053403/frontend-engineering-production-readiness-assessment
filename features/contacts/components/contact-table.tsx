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
import { Checkbox } from "@/components/ui/checkbox";

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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import EditContactDialog from "./edit-contact-dialog";
import DeleteContactDialog from "./delete-contact-dialog";

interface ContactTableProps {
  columns: ColumnDef<Contact>[];
  data: Contact[];
}

export function ContactTable({ columns, data }: ContactTableProps) {
  const isMobile = useIsMobile();
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

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search contacts by first name"
                placeholder="Search by first name..."
                value={
                  (table.getColumn("firstName")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("firstName")
                    ?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
            </div>

            <div className="relative w-full sm:w-48">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search contacts by tag"
                placeholder="Search by tag..."
                value={
                  (table.getColumn("tags")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("tags")?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:w-auto">
              <Select
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ??
                  "all"
                }
                onValueChange={(value) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="w-full sm:w-36">
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
                  (table.getColumn("company")?.getFilterValue() as string) ??
                  "all"
                }
                onValueChange={(value) =>
                  table
                    .getColumn("company")
                    ?.setFilterValue(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="w-full sm:w-44">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  aria-label="Show or hide table columns"
                  className="ml-auto hidden shrink-0 lg:inline-flex"
                >
                  <SlidersHorizontal className="size-3.5" />
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

          {selectedCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-accent px-3 py-2">
              <span className="text-sm font-medium text-accent-foreground">
                {selectedCount} selected
              </span>

              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Export selected contacts"
                  onClick={() =>
                    exportContacts(
                      table
                        .getFilteredSelectedRowModel()
                        .rows.map((row) => row.original),
                    )
                  }
                >
                  Export
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
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
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {isMobile ? (
        /* Mobile card list */
        <div className="space-y-3">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const contact = row.original;
              return (
                <Card key={row.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label={`Select ${contact.firstName} ${contact.lastName}`}
                        className="mt-1"
                      />
                      <div>
                        <Link
                          href={`/contacts/${contact.id}`}
                          className="font-semibold text-foreground hover:text-primary"
                        >
                          {contact.firstName} {contact.lastName}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {contact.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.phone}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        contact.status === "Active"
                          ? "shrink-0 border-success/20 bg-success/10 text-success"
                          : "shrink-0 border-border bg-muted text-muted-foreground"
                      }
                    >
                      {contact.status}
                    </Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                    <div className="flex flex-wrap gap-1">
                      {contact.company && (
                        <Badge variant="secondary">{contact.company}</Badge>
                      )}
                      {contact.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {contact.tags.length > 2 && (
                        <Badge variant="secondary">
                          +{contact.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <EditContactDialog contact={contact} />
                      <DeleteContactDialog contact={contact} />
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="py-12 text-center text-sm text-muted-foreground">
              No contacts found.
            </Card>
          )}
        </div>
      ) : (
        /* Desktop / tablet table */
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                        <TableCell key={cell.id} className="py-3">
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
                      className="h-32 text-center text-muted-foreground"
                      aria-live="polite"
                    >
                      No contacts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
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
          {table.getPageCount() || 1}
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