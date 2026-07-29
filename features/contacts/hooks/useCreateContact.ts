import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import type { Contact } from "../types/contact";
import { toast } from "sonner";

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contact: Omit<Contact, "id">) =>
      contactService.createContact(contact),

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["contacts"],
  });
  toast.success("Contact created successfully");
    },
    onError: () => {
  toast.error("Failed to create contact");
},
    
  });
}