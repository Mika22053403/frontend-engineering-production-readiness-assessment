export const queryKeys = {
  contacts: ["contacts"] as const,

  contact: (id: string) => ["contact", id] as const,
};