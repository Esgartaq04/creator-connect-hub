import { useQuery } from "@tanstack/react-query";
import { getCreators } from "@/services/creatorService";

export function useCreators() {
  return useQuery({
    queryKey: ["creators"],
    queryFn: getCreators,
  });
}
