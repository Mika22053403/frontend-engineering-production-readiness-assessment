"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactService } from "@/services/contact.service";

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.updateContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
}