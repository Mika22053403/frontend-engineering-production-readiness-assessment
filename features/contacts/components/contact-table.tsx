"use client";

import { Contact } from "@/types/contact";

interface ContactTableProps {
  data: Contact[];
}

export default function ContactTable({ data }: ContactTableProps) {
  return (
    <div className="rounded-lg border p-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
