"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactService } from "@/services/contact.service";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.deleteContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
}