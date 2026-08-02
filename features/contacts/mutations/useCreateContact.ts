"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { contactService } from "@/services/contact.service";

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.createContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      toast.success("Contact created successfully!");
    },

    onError: () => {
      toast.error("Failed to create contact.");
    },
  });
}