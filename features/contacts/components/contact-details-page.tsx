"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, UserRound } from "lucide-react";

import { useContacts } from "@/hooks/useContacts";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import EditContactDialog from "./edit-contact-dialog";
import DeleteContactDialog from "./delete-contact-dialog";
import { ContactTableSkeleton } from "./contact-table-skeleton";

interface ContactDetailsPageProps {
  id: string;
}

function getInitials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

export default function ContactDetailsPage({ id }: ContactDetailsPageProps) {
  const { data, isLoading, isError } = useContacts();

  if (isLoading) {
    return <ContactTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-center text-muted-foreground">
        Failed to load contact.
      </div>
    );
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

  const isActive = contact.status === "Active";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/contacts">
          <Button variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            Back to contacts
          </Button>
        </Link>

        <div className="flex gap-2">
          <EditContactDialog contact={contact} />
          <DeleteContactDialog contact={contact} />
        </div>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Avatar size="lg" className="size-16 text-lg">
            <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
              {getInitials(contact.firstName, contact.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {contact.firstName} {contact.lastName}
            </h1>
            {contact.company && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="size-3.5" />
                {contact.company}
              </p>
            )}
          </div>

          <Badge
            variant="outline"
            className={
              isActive
                ? "border-success/20 bg-success/10 text-success"
                : "border-border bg-muted text-muted-foreground"
            }
          >
            <span
              className={`size-1.5 rounded-full ${isActive ? "bg-success" : "bg-muted-foreground"}`}
            />
            {contact.status}
          </Badge>
        </div>
      </Card>

      <Card>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <Mail className="size-4" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </p>
              <p className="mt-0.5 text-sm font-medium break-all">
                {contact.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <Phone className="size-4" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Phone
              </p>
              <p className="mt-0.5 text-sm font-medium">{contact.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <UserRound className="size-4" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Company
              </p>
              <p className="mt-0.5 text-sm font-medium">
                {contact.company || "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Tags
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {contact.tags.length ? (
              contact.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tags yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}