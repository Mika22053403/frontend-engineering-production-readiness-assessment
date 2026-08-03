"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { contactKeys } from "../queries/contact-query-keys";

export function useBulkDeleteContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(
        ids.map(async (id) => {
          await fetch(`/api/contacts/${id}`, {
            method: "DELETE",
          });
        })
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });

      toast.success("Selected contacts deleted.");
    },

    onError: () => {
      toast.error("Failed to delete selected contacts.");
    },
  });
}