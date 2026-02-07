import { useQuery } from "@tanstack/react-query";
import { getAnalyticsByCreatorId } from "@/services/analyticsService";

export function useAnalytics(creatorId: string | undefined) {
  return useQuery({
    queryKey: ["analytics", creatorId],
    queryFn: () => getAnalyticsByCreatorId(creatorId ?? ""),
    enabled: !!creatorId,
  });
}
