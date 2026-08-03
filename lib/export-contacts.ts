import {
  mkConfig,
  generateCsv,
  download,
} from "export-to-csv";

import { Contact } from "@/types/contact";

const csvConfig = mkConfig({
  filename: "contacts",
  useKeysAsHeaders: true,
});

export function exportContacts(contacts: Contact[]) {
  const rows = contacts.map((contact) => ({
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    company: contact.company,
    status: contact.status,
  }));

  const csv = generateCsv(csvConfig)(rows);

  download(csvConfig)(csv);
}