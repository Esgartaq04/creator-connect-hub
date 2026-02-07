const express = require("express");
const cors = require("cors");
const path = require("path");
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
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
    res.status(201).json({ id: creatorId });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      error: error.message || "Failed to create creator.",
    });
  }
});

app.get("/api/analytics/:creatorId", async (req, res) => {
  try {
    const analytics = await getAnalyticsByCreatorId(req.params.creatorId);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analytics." });
  }
});

app.post("/api/analytics/:creatorId/init", async (req, res) => {
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
