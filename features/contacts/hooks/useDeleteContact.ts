import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import { toast } from "sonner";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.deleteContact,

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["contacts"],
  });

  toast.success("Contact deleted successfully");
},

onError: () => {
  toast.error("Failed to delete contact");
},
  });
}