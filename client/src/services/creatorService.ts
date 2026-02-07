import type { Creator } from "@/data/mockData";
import { levelNames } from "@/data/mockData";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const request = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new ApiError(message || "Request failed", response.status);
  }

  return response.json() as Promise<T>;
};

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
  const creators = await request<Creator[]>("/api/creators");
  return creators.map((creator) => toCreator(creator.id, creator));
}

export async function getCreatorById(id: string): Promise<Creator | null> {
  try {
    const creator = await request<Creator>(`/api/creators/${id}`);
    return toCreator(creator.id, creator);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
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
  const response = await request<{ id: string }>("/api/creators", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.id;
}
