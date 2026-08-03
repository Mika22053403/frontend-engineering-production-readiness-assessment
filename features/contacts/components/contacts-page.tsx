"use client";

import CreateContactDialog from "./create-contact-dialog";
import { ContactTable } from "./contact-table";
import { columns } from "../table/columns";
import { useContacts } from "@/hooks/useContacts";
import { ContactTableSkeleton } from "./contact-table-skeleton";
export default function ContactsPage() {
  const { data, isLoading, isError, error } = useContacts();

  if (isLoading) {
    return <ContactTableSkeleton />;
  }
  if (isError) {
    return (
      <div className="rounded-lg border border-destructive p-8 text-center">
        <h2 className="text-lg font-semibold text-destructive">
          Something went wrong
        </h2>

        <p className="mt-2 text-muted-foreground">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>

        <CreateContactDialog />
      </div>

      <ContactTable columns={columns} data={data ?? []} />

      {data?.length === 0 && (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <h2 className="text-lg font-semibold">No Contacts Yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first contact to get started.
          </p>

          <div className="mt-6">
            <CreateContactDialog />
          </div>
        </div>
      )}
    </div>
  );
}
