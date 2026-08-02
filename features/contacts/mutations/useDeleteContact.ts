"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { contactService } from "@/services/contact.service";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.deleteContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      toast.success("Contact deleted successfully!");
    },

    onError: () => {
      toast.error("Failed to delete contact.");
    },
  });
}