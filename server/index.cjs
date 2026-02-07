const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
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
  findUserByEmail,
  createUser,
  updateUserCreator,
  getUserById,
} = require("./services/userService.cjs");
const {
  createSession,
  getSession,
  deleteSession,
} = require("./services/sessionService.cjs");
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

const createToken = async (userId) => {
  const token = crypto.randomBytes(32).toString("hex");
  await createSession({ token, userId });
  return token;
};

const getUserIdFromToken = async (token) => {
  const session = await getSession(token);
  if (!session) return null;
  if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
    await deleteSession(token);
    return null;
  }
  return session.userId || null;
};

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const userId = await getUserIdFromToken(token);
  if (!userId) {
    return res.status(401).json({ error: "Invalid token." });
  }
  req.user = { id: userId };
  return next();
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required." });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUser({ email, passwordHash });
    const token = await createToken(userId);
    res.status(201).json({
      token,
      user: { id: userId, email: email.toLowerCase(), creatorId: null },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required." });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = await createToken(user.id);
    res.json({
      token,
      user: { id: user.id, email: user.email, creatorId: user.creatorId || null },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login." });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      id: user.id,
      email: user.email,
      creatorId: user.creatorId || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

app.post("/api/auth/logout", authMiddleware, async (req, res) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (token) {
      await deleteSession(token);
    }
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to logout." });
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

app.post("/api/creators", async (req, res) => {
  try {
    const creatorId = await createCreator(req.body || {});
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (token) {
      const userId = await getUserIdFromToken(token);
      if (userId) {
        await updateUserCreator(userId, creatorId);
      }
    }
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
