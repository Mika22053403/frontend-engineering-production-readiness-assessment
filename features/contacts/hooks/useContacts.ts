import { useQuery } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: contactService.getContacts,
  });
}