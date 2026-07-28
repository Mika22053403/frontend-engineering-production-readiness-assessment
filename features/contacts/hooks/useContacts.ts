"use client";

import { useQuery } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import { contactKeys } from "../queries/contact-query-keys";

export function useContacts() {
  return useQuery({
    queryKey: contactKeys.lists(),
    queryFn: contactService.getContacts,
  });
}