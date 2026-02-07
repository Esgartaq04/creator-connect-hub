import type { ContentItem } from "@/data/mockData";

export interface WeeklyViewsPoint {
  day: string;
  views: number;
}

export interface GrowthTrendPoint {
  month: string;
  followers: number;
}

export interface InsightItem {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface AnalyticsData {
  weeklyViews: WeeklyViewsPoint[];
  growthTrend: GrowthTrendPoint[];
  topContent: ContentItem[];
  insights: InsightItem[];
}
