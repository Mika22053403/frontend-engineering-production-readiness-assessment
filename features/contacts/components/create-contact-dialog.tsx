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
        <Button>Create Contact</Button>
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
                <Label>First Name</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <div className="space-y-2">
                <Label>Last Name</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
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
