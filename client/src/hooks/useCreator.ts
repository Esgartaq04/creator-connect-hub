import { useQuery } from "@tanstack/react-query";
import { getCreatorById } from "@/services/creatorService";

export function useCreator(id: string | undefined) {
  return useQuery({
    queryKey: ["creator", id],
    queryFn: () => getCreatorById(id ?? ""),
    enabled: !!id,
  });
}
