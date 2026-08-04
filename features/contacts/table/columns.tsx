"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { Contact } from "@/types/contact";

import Link from "next/link";
import dynamic from "next/dynamic";
import { memo } from "react";

const EditContactDialog = dynamic(
  () => import("../components/edit-contact-dialog"),
);

const DeleteContactDialog = dynamic(
  () => import("../components/delete-contact-dialog"),
);

const ActionsCell = memo(function ActionsCell({
  contact,
}: {
  contact: Contact;
}) {
  return (
    <div className="flex gap-2">
      <EditContactDialog contact={contact} />
      <DeleteContactDialog contact={contact} />
    </div>
  );
});

export const columns: ColumnDef<Contact>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <Link
        href={`/contacts/${row.original.id}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {row.original.firstName}
      </Link>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <Link
        href={`/contacts/${row.original.id}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {row.original.lastName}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
  },

  {
    accessorKey: "status",
    header: "Status",

    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",

    filterFn: (row, id, value) => {
      const tags = row.getValue(id) as string[];

      return tags.some((tag) =>
        tag.toLowerCase().includes((value as string).toLowerCase()),
      );
    },

    cell: ({ row }) => {
      const tags = row.original.tags;

      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell contact={row.original} />,
  },
];
