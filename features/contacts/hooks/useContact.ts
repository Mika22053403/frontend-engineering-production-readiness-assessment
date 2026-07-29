import { useQuery } from "@tanstack/react-query";

export function useContact(id: string) {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: async () => {
      // replace with your service/MSW later
      return null;
    },
  });
}