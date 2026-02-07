import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Creator } from "@/data/mockData";
import { levelNames } from "@/data/mockData";

const defaultStats = {
  avgViews: 0,
  engagementRate: 0,
  totalFollowers: 0,
};

const defaultCreator = {
  avatar:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  bio: "",
  niche: [] as string[],
  level: 1 as Creator["level"],
  levelName: levelNames[1],
  platforms: {} as Creator["platforms"],
  stats: defaultStats,
  collaborationGoals: [] as string[],
  featuredContent: [] as Creator["featuredContent"],
};

const normalizeLevel = (level: number): Creator["level"] => {
  if (level <= 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  if (level === 4) return 4;
  return 5;
};

const toCreator = (id: string, data: Partial<Creator>): Creator => {
  const level = normalizeLevel(Number(data.level ?? defaultCreator.level));
  return {
    id,
    name: data.name ?? "Unknown Creator",
    avatar: data.avatar ?? defaultCreator.avatar,
    bio: data.bio ?? defaultCreator.bio,
    niche: data.niche ?? defaultCreator.niche,
    level,
    levelName: data.levelName ?? levelNames[level],
    platforms: data.platforms ?? defaultCreator.platforms,
    stats: data.stats ?? defaultCreator.stats,
    collaborationGoals: data.collaborationGoals ?? defaultCreator.collaborationGoals,
    featuredContent: data.featuredContent ?? defaultCreator.featuredContent,
  };
};

export async function getCreators(): Promise<Creator[]> {
  const snapshot = await getDocs(collection(db, "creators"));
  return snapshot.docs.map((docSnap) =>
    toCreator(docSnap.id, docSnap.data() as Partial<Creator>)
  );
}

export async function getCreatorById(id: string): Promise<Creator | null> {
  const docRef = doc(db, "creators", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return toCreator(snapshot.id, snapshot.data() as Partial<Creator>);
}

export interface CreateCreatorInput {
  name: string;
  bio: string;
  niche: string;
  platforms: string[];
  collaborationGoals: string[];
}

const toHandle = (name: string) => {
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
  return normalized ? `@${normalized}` : "@creator";
};

const buildPlatformStats = (platforms: string[], handle: string) => {
  const entries = platforms.map((platform) => [
    platform,
    { followers: 0, handle },
  ]);
  return Object.fromEntries(entries) as Creator["platforms"];
};

export async function createCreator(input: CreateCreatorInput): Promise<string> {
  const level: Creator["level"] = 1;
  const handle = toHandle(input.name);
  const creator: Omit<Creator, "id"> = {
    name: input.name,
    avatar: defaultCreator.avatar,
    bio: input.bio,
    niche: [input.niche],
    level,
    levelName: levelNames[level],
    platforms: buildPlatformStats(input.platforms, handle),
    stats: defaultStats,
    collaborationGoals: input.collaborationGoals,
    featuredContent: [],
  };

  const docRef = await addDoc(collection(db, "creators"), creator);
  return docRef.id;
}
