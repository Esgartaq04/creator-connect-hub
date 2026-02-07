const { db } = require("../lib/firebaseAdmin.cjs");

const SESSIONS_COLLECTION = "sessions";

const createSession = async ({ token, userId, ttlDays = 7 }) => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1000);
  await db.collection(SESSIONS_COLLECTION).doc(token).set({
    userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  });
};

const getSession = async (token) => {
  const snapshot = await db.collection(SESSIONS_COLLECTION).doc(token).get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

const deleteSession = async (token) => {
  await db.collection(SESSIONS_COLLECTION).doc(token).delete();
};

module.exports = {
  createSession,
  getSession,
  deleteSession,
};
