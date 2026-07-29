"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Contact } from "../types/contact";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact;
  onSave: (contact: Contact) => void;
}

export default function EditContactDialog({
  open,
  onOpenChange,
  contact,
  onSave,
}: Props) {
  const [form, setForm] = useState<Contact>(contact);

  function handleOpenChange(value: boolean) {
    if (value) {
      // Reset form whenever dialog opens
      setForm(contact);
    }

    onOpenChange(value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    onSave(form);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="name" value={form.name} onChange={handleChange} />

          <Input name="email" value={form.email} onChange={handleChange} />

          <Input name="phone" value={form.phone} onChange={handleChange} />

          <Input name="company" value={form.company} onChange={handleChange} />

          <Button className="w-full" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
