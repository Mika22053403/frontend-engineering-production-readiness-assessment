"use client";

import { useQuery } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import { contactKeys } from "../queries/contact-query-keys";

export function useContact(id: string) {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactService.getContact(id),
    enabled: !!id,
  });
}