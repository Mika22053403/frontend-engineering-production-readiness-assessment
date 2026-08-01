"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactService } from "../services/contact.service";

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.createContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
}