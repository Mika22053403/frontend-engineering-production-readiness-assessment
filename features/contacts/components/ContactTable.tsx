"use client";

import { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ContactSearch from "./ContactSearch";
import CreateContactDialog from "./CreateContactDialog";
import EditContactDialog from "./EditContactDialog";

import { columns } from "../table/table-columns";
import type { Contact } from "../types/contact";
import { useCreateContact } from "../hooks/useCreateContact";
import { useUpdateContact } from "../hooks/useUpdateContact";
import { useDeleteContact } from "../hooks/useDeleteContact";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  data: Contact[];
}

export default function ContactTable({ data }: Props) {
  const [tableData, setTableData] = useState<Contact[]>(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  useEffect(() => {
    setTableData(data);
  }, [data]);

  // ------------------------
  // Edit Contact
  // ------------------------

  /**
   * Handles the edit action for a contact
   * @param contact - The contact object to be edited
   */
  const handleEdit = (contact: Contact) => {
    // Set the contact to be edited in the state
    setEditingContact(contact);
    // Open the edit modal/form
    setEditOpen(true);
  };

  const handleSaveEdit = (updatedContact: Contact) => {
    updateContact.mutate({
      id: updatedContact.id,
      contact: updatedContact,
    });

    setEditOpen(false);
  };
  // ------------------------
  // Table
  // ------------------------

  const table = useReactTable({
    data: tableData,

    columns: columns({
      onEdit: handleEdit,
    }),

    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnVisibility,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ------------------------
  // Delete Selected
  // ------------------------

  const handleDeleteSelected = () => {
    table.getSelectedRowModel().rows.forEach((row) => {
      deleteContact.mutate(row.original.id);
    });

    table.resetRowSelection();
  };

  // ------------------------
  // Export CSV
  // ------------------------

  const handleExportSelected = () => {
    const selectedContacts = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    if (!selectedContacts.length) return;

    const csv = [
      ["Name", "Email", "Phone", "Company", "Status"],
      ...selectedContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.company,
        contact.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "contacts.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ContactSearch value={globalFilter} onChange={setGlobalFilter} />

          <CreateContactDialog
            onCreate={(contact) =>
              createContact.mutate({
                ...contact,
                tags: [],
              })
            }
          />
        </div>

        <div className="flex gap-2">
          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
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

          {/* Export */}
          <Button
            variant="outline"
            disabled={table.getSelectedRowModel().rows.length === 0}
            onClick={handleExportSelected}
          >
            Export
          </Button>

          {/* Delete */}
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={table.getSelectedRowModel().rows.length === 0}
              >
                Delete Selected
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete selected contacts?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. The selected contacts will be
                  permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => {
                    handleDeleteSelected();
                    setDeleteOpen(false);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Table */}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-48 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-lg font-medium">No contacts found</p>

                  <p className="text-sm text-muted-foreground">
                    Try changing your search or create a new contact.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Dialog */}

      {editingContact && (
        <EditContactDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          contact={editingContact}
          onSave={handleSaveEdit}
        />
      )}

      {/* Pagination */}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
