const { db } = require("../lib/firebaseAdmin.cjs");

const defaultAnalytics = {
  weeklyViews: [],
  growthTrend: [],
  topContent: [],
  insights: [],
};

const getAnalyticsByCreatorId = async (creatorId) => {
  const docRef = db.collection("analytics").doc(creatorId);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    return defaultAnalytics;
  }
  return { ...defaultAnalytics, ...snapshot.data() };
};

const initializeAnalytics = async (creatorId) => {
  const docRef = db.collection("analytics").doc(creatorId);
  await docRef.set(defaultAnalytics, { merge: true });
};

module.exports = {
  getAnalyticsByCreatorId,
  initializeAnalytics,
};
