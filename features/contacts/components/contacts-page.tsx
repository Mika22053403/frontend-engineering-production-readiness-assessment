"use client";

import CreateContactDialog from "./create-contact-dialog";
import { Button } from "@/components/ui/button";
import { ContactTable } from "./contact-table";
import { columns } from "../table/columns";
import { useContacts } from "@/hooks/useContacts";
import { ContactTableSkeleton } from "./contact-table-skeleton";
export default function ContactsPage() {
  const { data, isLoading, isError, error, refetch } = useContacts();
  const contacts = data ?? [];
  if (isLoading) {
    return <ContactTableSkeleton />;
  }
  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-md rounded-lg border border-destructive p-8 text-center">
          <h2 className="text-xl font-semibold text-destructive">
            Failed to load contacts
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            {(error as Error).message}
          </p>

          <Button className="mt-6" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>

        <CreateContactDialog />
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <h2 className="text-lg font-semibold">No Contacts Yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first contact to get started.
          </p>

          <div className="mt-6">
            <CreateContactDialog />
          </div>
        </div>
      ) : (
        <ContactTable columns={columns} data={data ?? []} />
      )}
    </div>
  );
}
