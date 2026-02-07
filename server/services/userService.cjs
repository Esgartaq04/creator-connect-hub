const { db } = require("../lib/firebaseAdmin.cjs");

const USERS_COLLECTION = "users";

const getUserById = async (userId) => {
  const docRef = db.collection(USERS_COLLECTION).doc(userId);
  const snapshot = await docRef.get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

const upsertUser = async ({ id, email, creatorId }) => {
  await db
    .collection(USERS_COLLECTION)
    .doc(id)
    .set(
      {
        email: email || null,
        creatorId: creatorId ?? null,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
};

const updateUserCreator = async (userId, creatorId) => {
  await db.collection(USERS_COLLECTION).doc(userId).set(
    {
      creatorId,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
};

module.exports = {
  getUserById,
  upsertUser,
  updateUserCreator,
};
