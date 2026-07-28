export const contactKeys = {
  all: ["contacts"] as const,

  lists: () => [...contactKeys.all, "list"] as const,

  list: (filters?: Record<string, unknown>) =>
    [...contactKeys.lists(), filters] as const,

  details: () => [...contactKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...contactKeys.details(), id] as const,
};