"use client";

import { useQuery } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";
import { contactKeys } from "./contact.query-keys";

export function useContacts() {
  return useQuery({
    queryKey: contactKeys.all,
    queryFn: contactService.getContacts,
  });
}