import { useQuery } from "@tanstack/react-query";
import { getAnalyticsForCurrentUser } from "@/services/analyticsService";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics", "me"],
    queryFn: () => getAnalyticsForCurrentUser(),
  });
}
