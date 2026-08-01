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

    onSubmit: async ({ value }) => {
      await updateContact.mutateAsync(value);

      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
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
                <Label>First Name</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
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
