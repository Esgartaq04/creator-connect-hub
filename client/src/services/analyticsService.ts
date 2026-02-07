import type { AnalyticsData } from "@/types/analytics";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

const request = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<T>;
};

const defaultAnalytics: AnalyticsData = {
  weeklyViews: [],
  growthTrend: [],
  topContent: [],
  insights: [],
};

export async function getAnalyticsByCreatorId(
  creatorId: string
): Promise<AnalyticsData> {
  const analytics = await request<AnalyticsData>(`/api/analytics/${creatorId}`);
  return { ...defaultAnalytics, ...analytics };
}

export async function initializeAnalytics(
  creatorId: string
): Promise<void> {
  await request(`/api/analytics/${creatorId}/init`, {
    method: "POST",
  });
}
