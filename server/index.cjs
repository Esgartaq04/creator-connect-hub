const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { admin } = require("./lib/firebaseAdmin.cjs");
const {
  listCreators,
  getCreatorById,
  createCreator,
} = require("./services/creatorService.cjs");
const {
  getAnalyticsByCreatorId,
  initializeAnalytics,
} = require("./services/analyticsService.cjs");
const {
  getUserById,
  upsertUser,
  updateUserCreator,
} = require("./services/userService.cjs");
const {
  getAccountByAuthUid,
  upsertAccount,
} = require("./services/accountService.cjs");
const app = express();

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);
app.use(express.json());

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { id: decoded.uid, email: decoded.email || null };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/users/me", authMiddleware, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      await upsertUser({ id: req.user.id, email: req.user.email });
    }
    const refreshed = await getUserById(req.user.id);
    res.json({
      id: req.user.id,
      email: req.user.email,
      creatorId: refreshed?.creatorId || req.user.id,
      name: refreshed?.name || null,
      firstName: refreshed?.firstName || null,
      lastName: refreshed?.lastName || null,
      phone: refreshed?.phone || null,
      dateOfBirth: refreshed?.dateOfBirth || null,
      videoTypes: refreshed?.videoTypes || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

app.get("/api/accounts/me", authMiddleware, async (req, res) => {
  try {
    const existing = await getAccountByAuthUid(req.user.id);
    if (existing) {
      return res.json({
        id: existing.id,
        linkedAccounts: existing.linkedAccounts || [],
      });
    }

    const creator = await getCreatorById(req.user.id);
    const linkedAccounts = creator
      ? Object.entries(creator.platforms || {}).map(([platform, data]) => ({
          platform,
          handle: data.handle,
          url: data.handle?.startsWith("@") ? null : data.handle,
        }))
      : [];

    await upsertAccount(req.user.id, { linkedAccounts });

    res.json({
      id: req.user.id,
      linkedAccounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch accounts." });
  }
});

app.put("/api/users/me", authMiddleware, async (req, res) => {
  try {
    const { name, firstName, lastName, phone, dateOfBirth, videoTypes } =
      req.body || {};
    await upsertUser({
      id: req.user.id,
      email: req.user.email,
      creatorId: req.user.id,
      name,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      videoTypes,
    });
    const updated = await getUserById(req.user.id);
    res.json({
      id: req.user.id,
      email: req.user.email,
      creatorId: updated?.creatorId || req.user.id,
      name: updated?.name || null,
      firstName: updated?.firstName || null,
      lastName: updated?.lastName || null,
      phone: updated?.phone || null,
      dateOfBirth: updated?.dateOfBirth || null,
      videoTypes: updated?.videoTypes || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user." });
  }
});

app.get("/api/creators", async (_req, res) => {
  try {
    const creators = await listCreators();
    res.json(creators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch creators." });
  }
});

app.get("/api/creators/:id", async (req, res) => {
  try {
    const creator = await getCreatorById(req.params.id);
    if (!creator) {
      return res.status(404).json({ error: "Creator not found." });
    }
    res.json(creator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch creator." });
  }
});

app.post("/api/creators", authMiddleware, async (req, res) => {
  try {
    const creatorId = await createCreator(req.user.id, req.body || {});
    await updateUserCreator(req.user.id, creatorId);
    res.status(201).json({ id: creatorId });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      error: error.message || "Failed to create creator.",
    });
  }
});

app.get("/api/analytics/:creatorId", authMiddleware, async (req, res) => {
  try {
    const analytics = await getAnalyticsByCreatorId(req.params.creatorId);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analytics." });
  }
});

app.get("/api/analytics/me", authMiddleware, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    const creatorId = user?.creatorId || req.user.id;
    if (!creatorId) {
      return res.json({
        weeklyViews: [],
        growthTrend: [],
        topContent: [],
        insights: [],
      });
    }
    const analytics = await getAnalyticsByCreatorId(creatorId);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analytics." });
  }
});

app.post("/api/analytics/:creatorId/init", authMiddleware, async (req, res) => {
  try {
    await initializeAnalytics(req.params.creatorId);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to initialize analytics." });
  }
});

const port = Number(process.env.PORT || 5174);
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
