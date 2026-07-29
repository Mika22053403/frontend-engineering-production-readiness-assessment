"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { contactSchema, type ContactFormData } from "../schemas/contact-schema";

interface Props {
  onCreate: (contact: ContactFormData) => void;
}

export default function CreateContactDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    onCreate({
      ...data,
      status: "Active",
    });

    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Contact</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Contact</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Name" {...register("name")} />
            <p className="text-sm text-red-500">{errors.name?.message}</p>
          </div>

          <div>
            <Input placeholder="Email" {...register("email")} />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <Input placeholder="Phone" {...register("phone")} />
            <p className="text-sm text-red-500">{errors.phone?.message}</p>
          </div>

          <div>
            <Input placeholder="Company" {...register("company")} />
            <p className="text-sm text-red-500">{errors.company?.message}</p>
          </div>

          <Button type="submit" className="w-full">
            Save Contact
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
