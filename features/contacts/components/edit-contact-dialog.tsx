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

import { Contact } from "@/types/contact";
import { useUpdateContact } from "../mutations/useUpdateContact";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { editContactSchema } from "@/schemas/contact.schema";
interface EditContactDialogProps {
  contact: Contact;
}

export default function EditContactDialog({ contact }: EditContactDialogProps) {
  const [open, setOpen] = useState(false);

  const updateContact = useUpdateContact();

  const form = useForm({
    defaultValues: {
      ...contact,
    },
    validators: {
      onSubmit: editContactSchema,
    },
    onSubmit: async ({ value }) => {
      await updateContact.mutateAsync(value);

      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label={`Edit ${contact.firstName}`}>
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="firstName">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name</Label>

                <Input
                  id="edit-firstName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name</Label>

                <Input
                  id="edit-lastName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>

                <Input
                  id="edit-email"
                  type="email"
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>

                <Input
                  id="edit-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="company">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>

                <Input
                  id="edit-company"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="tags">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags</Label>

                <Input
                  id="edit-tags"
                  aria-describedby="edit-tags-help"
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

                <p
                  id="edit-tags-help"
                  className="text-xs text-muted-foreground"
                >
                  Separate multiple tags with commas.
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>

                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as "Active" | "Inactive")
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <Button
            className="w-full"
            type="submit"
            disabled={updateContact.isPending}
          >
            {updateContact.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}