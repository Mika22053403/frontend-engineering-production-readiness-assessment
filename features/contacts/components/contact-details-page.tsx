"use client";

import Link from "next/link";

import { useContacts } from "@/hooks/useContacts";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import EditContactDialog from "./edit-contact-dialog";
import DeleteContactDialog from "./delete-contact-dialog";

interface ContactDetailsPageProps {
  id: string;
}

export default function ContactDetailsPage({ id }: ContactDetailsPageProps) {
  const { data, isLoading, isError } = useContacts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load contact.</div>;
  }

  const contact = data?.find((contact) => contact.id === id);

  if (!contact) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold">Contact not found</h2>

        <p className="mt-2 text-muted-foreground">
          The requested contact could not be found.
        </p>

        <Link href="/contacts" className="mt-6">
          <Button>Back to Contacts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/contacts">
          <Button variant="outline">← Back</Button>
        </Link>

        <div className="flex gap-2">
          <EditContactDialog contact={contact} />
          <DeleteContactDialog contact={contact} />
        </div>
      </div>

      <div className="rounded-lg border p-6 space-y-4">
        <h1 className="text-3xl font-bold">
          {contact.firstName} {contact.lastName}
        </h1>

        <div>
          <p className="font-medium">Email</p>
          <p>{contact.email}</p>
        </div>

        <div>
          <p className="font-medium">Phone</p>
          <p>{contact.phone}</p>
        </div>

        <div>
          <p className="font-medium">Company</p>
          <p>{contact.company}</p>
        </div>

        <div>
          <p className="font-medium">Status</p>
          <Badge>{contact.status}</Badge>
        </div>

        <div>
          <p className="font-medium">Tags</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {contact.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
