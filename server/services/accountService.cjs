const { db } = require("../lib/firebaseAdmin.cjs");

const ACCOUNTS_COLLECTION = "accounts";

const getAccountByAuthUid = async (authUid) => {
  const docRef = db.collection(ACCOUNTS_COLLECTION).doc(authUid);
  const snapshot = await docRef.get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

const upsertAccount = async (authUid, data) => {
  await db.collection(ACCOUNTS_COLLECTION).doc(authUid).set(
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
};

module.exports = {
  getAccountByAuthUid,
  upsertAccount,
};
