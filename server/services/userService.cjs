const { db } = require("../lib/firebaseAdmin.cjs");

const USERS_COLLECTION = "users";

const findUserByEmail = async (email) => {
  const snapshot = await db
    .collection(USERS_COLLECTION)
    .where("email", "==", email.toLowerCase())
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

const createUser = async ({ email, passwordHash }) => {
  const docRef = await db.collection(USERS_COLLECTION).add({
    email: email.toLowerCase(),
    passwordHash,
    creatorId: null,
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
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

const getUserById = async (userId) => {
  const docRef = db.collection(USERS_COLLECTION).doc(userId);
  const snapshot = await docRef.get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUserCreator,
  getUserById,
};
