"use client";

import ContactTable from "./contact-table";
import { useContacts } from "@/hooks/useContacts";

export default function ContactsPage() {
  const { data, isLoading, error } = useContacts();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8">Failed to load contacts.</div>;
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Contacts</h1>

      <ContactTable data={data ?? []} />
    </main>
  );
}
