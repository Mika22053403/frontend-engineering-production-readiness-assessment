import { queryOptions } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";

export const contactQueries = {
  all: () =>
    queryOptions({
      queryKey: ["contacts"],
      queryFn: contactService.getContacts,
    }),
};