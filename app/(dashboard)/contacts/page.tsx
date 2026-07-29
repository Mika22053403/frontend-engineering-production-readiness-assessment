"use client";

import ContactTable from "@/features/contacts/components/ContactTable";
import { useContacts } from "@/features/contacts/hooks/useContacts";
import ContactTableSkeleton from "@/features/contacts/components/ContactTableSkeleton";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const { data, isLoading, isError } = useContacts();

  if (isLoading) {
    return (
      <main className="p-8">
        <h1 className="mb-6 text-3xl font-bold">Contacts</h1>

        <ContactTableSkeleton />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>

        <p className="text-muted-foreground">
          We couldn&apos;t load your contacts.
        </p>

        <Button onClick={() => window.location.reload()}>Retry</Button>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Contacts</h1>

      <ContactTable data={data ?? []} />
    </main>
  );
}
