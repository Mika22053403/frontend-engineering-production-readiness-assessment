"use client";

import ContactTable from "@/features/contacts/components/ContactTable";
import { useContacts } from "@/features/contacts/hooks/useContacts";

export default function ContactsPage() {
  const { data, isLoading, isError } = useContacts();

  if (isLoading) {
    return <p>Loading contacts...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Contacts</h1>

      <ContactTable data={data ?? []} />
    </main>
  );
}
