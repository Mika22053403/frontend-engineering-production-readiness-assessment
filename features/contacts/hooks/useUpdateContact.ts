"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import { contactKeys } from "../queries/contact-query-keys";

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<
        typeof contactService.updateContact
      >[1];
    }) =>
      contactService.updateContact(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });
    },
  });
}