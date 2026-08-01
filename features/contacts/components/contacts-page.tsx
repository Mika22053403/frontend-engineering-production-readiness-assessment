"use client";

import { useContacts } from "@/hooks/useContacts";

import { columns } from "../table/columns";
import { ContactTable } from "./contact-table";
import CreateContactDialog from "./create-contact-dialog";

export default function ContactsPage() {
  const { data, isLoading, error } = useContacts();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Failed to load contacts.</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>

        <CreateContactDialog />
      </div>

      <ContactTable columns={columns} data={data ?? []} />
    </div>
  );
}
