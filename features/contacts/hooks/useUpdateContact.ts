import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import type { Contact } from "../types/contact";

interface UpdateContactPayload {
  id: string;
  contact: Partial<Contact>;
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contact }: UpdateContactPayload) =>
      contactService.updateContact(id, contact),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
}