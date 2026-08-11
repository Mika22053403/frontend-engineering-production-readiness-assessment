"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import { columns } from "../table/columns";
import { useContacts } from "@/hooks/useContacts";
import { ContactTableSkeleton } from "./contact-table-skeleton";

const CreateContactDialog = dynamic(() => import("./create-contact-dialog"), {
  loading: () => (
    <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
  ),
});

const ContactTable = dynamic(
  () =>
    import("./contact-table").then((mod) => ({
      default: mod.ContactTable,
    })),
  {
    loading: () => <ContactTableSkeleton />,
  },
);

export default function ContactsPage() {
  const { data, isLoading, isError, error, refetch } = useContacts();

  const contacts = useMemo(() => data ?? [], [data]);

  const hasNoContacts = useMemo(() => contacts.length === 0, [contacts]);

  if (isLoading) {
    return <ContactTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-destructive">
            Failed to load contacts
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            {(error as Error).message}
          </p>

          <Button
            className="mt-6"
            onClick={() => refetch()}
            aria-label="Retry loading contacts"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Contacts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {contacts.length
              ? `${contacts.length} contact${contacts.length === 1 ? "" : "s"} in your CRM`
              : "Manage the people you reach on WhatsApp and email"}
          </p>
        </div>

        <div className="sm:shrink-0">
          <CreateContactDialog />
        </div>
      </div>

      {hasNoContacts ? (
        <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent">
            <UsersRound className="h-8 w-8 text-primary" />
          </div>

          <h2 className="mt-4 text-xl font-semibold">No Contacts Yet</h2>

          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Create your first contact to start reaching customers on WhatsApp
            and email.
          </p>

          <div className="mt-6 flex justify-center">
            <CreateContactDialog />
          </div>
        </div>
      ) : (
        <ContactTable columns={columns} data={contacts} />
      )}
    </div>
  );
}