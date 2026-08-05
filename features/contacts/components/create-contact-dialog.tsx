"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { contactSchema } from "@/schemas/contact.schema";
import { useCreateContact } from "../mutations/useCreateContact";

export default function CreateContactDialog() {
  const [open, setOpen] = useState(false);

  const createContact = useCreateContact();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      tags: [] as string[],
      status: "Active" as "Active" | "Inactive",
    },
    validators: {
      onSubmit: contactSchema,
    },

    onSubmit: async ({ value }) => {
      await createContact.mutateAsync(value);

      form.reset();
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Create Contact">Create Contact</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Contact</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="firstName">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>

                <Input
                  id="firstName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>

                <Input
                  id="lastName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>

                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="company">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>

                <Input
                  id="company"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="tags">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>

                <Input
                  id="tags"
                  placeholder="VIP, Customer, Lead"
                  aria-describedby="tags-help"
                  aria-invalid={field.state.meta.errors.length > 0}
                  value={field.state.value.join(", ")}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    )
                  }
                />

                <p id="tags-help" className="text-xs text-muted-foreground">
                  Separate multiple tags with commas.
                </p>

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>

                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as "Active" | "Inactive")
                  }
                >
                  <SelectTrigger id="status" aria-label="Contact status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          <Button
            type="submit"
            className="w-full"
            disabled={createContact.isPending}
          >
            {createContact.isPending ? "Creating..." : "Create Contact"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
