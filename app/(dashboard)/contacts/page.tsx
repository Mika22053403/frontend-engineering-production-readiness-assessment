"use client";

import Loading from "@/components/common/loading";
import EmptyState from "@/components/common/empty";
import ErrorMessage from "@/components/common/error";
import { useContacts } from "@/queries/useContacts";

export default function ContactsPage() {
  const { data, isLoading, isError } = useContacts();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message="Unable to load contacts." />;
  }

  if (!data?.length) {
    return <EmptyState />;
  }

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-3xl font-bold">Contacts</h1>

      {data.map((contact) => (
        <div key={contact.id} className="rounded-lg border p-4">
          <h2 className="font-semibold">{contact.name}</h2>

          <p>{contact.email}</p>

          <p>{contact.company}</p>
        </div>
      ))}
    </main>
  );
}
