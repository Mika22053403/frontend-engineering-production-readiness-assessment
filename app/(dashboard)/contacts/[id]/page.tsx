"use client";

import { useParams } from "next/navigation";

export default function ContactDetailsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Contact Details</h1>

      <p className="text-muted-foreground">Contact ID: {id}</p>
    </div>
  );
}
