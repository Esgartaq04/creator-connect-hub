const { db } = require("../lib/firebaseAdmin.cjs");

const USERS_COLLECTION = "users";

const getUserById = async (userId) => {
  const docRef = db.collection(USERS_COLLECTION).doc(userId);
  const snapshot = await docRef.get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

const upsertUser = async ({
  id,
  email,
  creatorId,
  name,
  firstName,
  lastName,
  phone,
  dateOfBirth,
  videoTypes,
}) => {
  await db
    .collection(USERS_COLLECTION)
    .doc(id)
    .set(
      {
        email: email || null,
        creatorId: creatorId ?? id,
        name: name ?? null,
        firstName: firstName ?? null,
        lastName: lastName ?? null,
        phone: phone ?? null,
        dateOfBirth: dateOfBirth ?? null,
        videoTypes: Array.isArray(videoTypes) ? videoTypes : [],
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
