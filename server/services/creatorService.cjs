const { db } = require("../lib/firebaseAdmin.cjs");

const levelNames = {
  1: "Newcomer",
  2: "Rising",
  3: "Emerging",
  4: "Established",
  5: "Star",
};

const defaultAvatar =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face";

const toHandle = (name) => {
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
  return normalized ? `@${normalized}` : "@creator";
};

const buildPlatformStats = (platforms, handle) => {
  if (!Array.isArray(platforms)) return {};
  return platforms.reduce((acc, platform) => {
    acc[platform] = { followers: 0, handle };
    return acc;
  }, {});
};

const listCreators = async () => {
  const snapshot = await db.collection("creators").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getCreatorById = async (id) => {
  const docRef = db.collection("creators").doc(id);
  const snapshot = await docRef.get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

const createCreator = async ({ name, bio, niche, platforms, collaborationGoals }) => {
  if (!name || !bio || !niche) {
    const error = new Error("Missing required fields.");
    error.status = 400;
    throw error;
  }

  const level = 1;
  const handle = toHandle(name);
  const creator = {
    name,
    avatar: defaultAvatar,
    bio,
    niche: Array.isArray(niche) ? niche : [niche],
    level,
    levelName: levelNames[level],
    platforms: buildPlatformStats(platforms, handle),
    stats: {
      avgViews: 0,
      engagementRate: 0,
      totalFollowers: 0,
    },
    collaborationGoals: Array.isArray(collaborationGoals)
      ? collaborationGoals
      : [],
    featuredContent: [],
  };

  const docRef = await db.collection("creators").add(creator);
  return docRef.id;
};

module.exports = {
  listCreators,
  getCreatorById,
  createCreator,
};
