"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Contact } from "@/types/contact";
import { contactKeys } from "../queries/contact-query-keys";

export function useBulkDeleteContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/contacts/${id}`, {
            method: "DELETE",
          }),
        ),
      );
    },

    // Optimistic Update
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries({
        queryKey: contactKeys.all,
      });

      const previousContacts =
        queryClient.getQueryData<Contact[]>(contactKeys.all);

      queryClient.setQueryData<Contact[]>(contactKeys.all, (old = []) =>
        old.filter((contact) => !ids.includes(contact.id)),
      );

      return { previousContacts };
    },

    // Rollback on failure
    onError: (_error, _ids, context) => {
      if (context?.previousContacts) {
        queryClient.setQueryData(
          contactKeys.all,
          context.previousContacts,
        );
      }

      toast.error("Failed to delete selected contacts.");
    },

    onSuccess: () => {
      toast.success("Selected contacts deleted.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });
    },
  });
}