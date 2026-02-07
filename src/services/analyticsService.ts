import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AnalyticsData } from "@/types/analytics";

const defaultAnalytics: AnalyticsData = {
  weeklyViews: [],
  growthTrend: [],
  topContent: [],
  insights: [],
};

export async function getAnalyticsByCreatorId(
  creatorId: string
): Promise<AnalyticsData> {
  const docRef = doc(db, "analytics", creatorId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return defaultAnalytics;
  }
  return { ...defaultAnalytics, ...(snapshot.data() as AnalyticsData) };
}

export async function initializeAnalytics(
  creatorId: string
): Promise<void> {
  const docRef = doc(db, "analytics", creatorId);
  await setDoc(docRef, defaultAnalytics, { merge: true });
}
