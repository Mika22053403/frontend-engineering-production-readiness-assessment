"use client";

import { useQuery } from "@tanstack/react-query";
import { contactQueries } from "@/queries/contact.query";

export function useContacts() {
  return useQuery(contactQueries.all());
}