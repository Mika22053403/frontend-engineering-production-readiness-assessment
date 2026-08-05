"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { contactService } from "@/services/contact.service";
import { Contact } from "@/types/contact";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.deleteContact,

    // Optimistic Update
    onMutate: async (id: string) => {
      // Stop outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["contacts"],
      });

      // Snapshot previous data
      const previousContacts = queryClient.getQueryData<Contact[]>([
        "contacts",
      ]);

      // Remove contact immediately from cache
      queryClient.setQueryData<Contact[]>(["contacts"], (old = []) =>
        old.filter((contact) => contact.id !== id)
      );

      // Return snapshot for rollback
      return { previousContacts };
    },

    // Rollback if API fails
    onError: (_error, _id, context) => {
      if (context?.previousContacts) {
        queryClient.setQueryData(
          ["contacts"],
          context.previousContacts
        );
      }

      toast.error("Unable to delete contact.");
    },

    // Success message
    onSuccess: () => {
      toast.success("Contact deleted successfully!");
    },

    // Always refetch
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
}