export const contactKeys = {
  all: ["contacts"] as const,
  detail: (id: string) => ["contacts", id] as const,
};