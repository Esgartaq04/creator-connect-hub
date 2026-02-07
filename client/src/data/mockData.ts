// Mock data for Creator Platform MVP

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  niche: string[];
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  platforms: {
    youtube?: { followers: number; handle: string };
    tiktok?: { followers: number; handle: string };
    instagram?: { followers: number; handle: string };
  };
  stats: {
    avgViews: number;
    engagementRate: number;
    totalFollowers: number;
  };
  collaborationGoals: string[];
  featuredContent: ContentItem[];
}

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  platform: 'youtube' | 'tiktok' | 'instagram';
  publishedAt: string;
}

export const levelNames: Record<number, string> = {
  1: "Newcomer",
  2: "Rising",
  3: "Emerging",
  4: "Established",
  5: "Star",
};

export const levelDescriptions: Record<number, string> = {
  1: "Just getting started with 0-1K followers",
  2: "Building momentum with 1K-10K followers",
  3: "Growing influence with 10K-100K followers",
  4: "Strong presence with 100K-500K followers",
  5: "Major influence with 500K+ followers",
};

export const niches = [
  "Tech",
  "Gaming",
  "Art",
  "Music",
  "Education",
  "Lifestyle",
  "Fitness",
  "Food",
  "Travel",
  "Comedy",
  "Beauty",
  "Finance",
];

export const collaborationTypes = [
  "Co-create content",
  "Guest appearance",
  "Editing help",
  "Cross-promotion",
  "Podcast feature",
  "Tutorial collab",
];

export const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Tech enthusiast breaking down complex topics. Making AI and coding accessible to everyone.",
    niche: ["Tech", "Education"],
    level: 3,
    levelName: "Emerging",
    platforms: {
      youtube: { followers: 45000, handle: "@alexchentech" },
      tiktok: { followers: 28000, handle: "@alexchentech" },
    },
    stats: {
      avgViews: 12500,
      engagementRate: 6.8,
      totalFollowers: 73000,
    },
    collaborationGoals: ["Co-create content", "Guest appearance"],
    featuredContent: [
      {
        id: "c1",
        title: "AI Tools That Changed My Workflow",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
        views: 45200,
        likes: 3200,
        platform: "youtube",
        publishedAt: "2024-01-15",
      },
      {
        id: "c2",
        title: "Learn React in 10 Minutes",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        views: 28300,
        likes: 2100,
        platform: "youtube",
        publishedAt: "2024-01-10",
      },
      {
        id: "c3",
        title: "Coding Setup Tour 2024",
        thumbnail: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=225&fit=crop",
        views: 18900,
        likes: 1800,
        platform: "tiktok",
        publishedAt: "2024-01-05",
      },
    ],
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    bio: "Digital artist and illustrator. Sharing my creative process and helping others find their style.",
    niche: ["Art", "Education"],
    level: 4,
    levelName: "Established",
    platforms: {
      instagram: { followers: 156000, handle: "@mayacreates" },
      youtube: { followers: 89000, handle: "@mayarodriguezart" },
    },
    stats: {
      avgViews: 34000,
      engagementRate: 8.2,
      totalFollowers: 245000,
    },
    collaborationGoals: ["Co-create content", "Tutorial collab"],
    featuredContent: [
      {
        id: "c4",
        title: "Digital Painting Timelapse",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=225&fit=crop",
        views: 67000,
        likes: 8900,
        platform: "instagram",
        publishedAt: "2024-01-18",
      },
      {
        id: "c5",
        title: "My Art Journey: 1 Year Progress",
        thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=225&fit=crop",
        views: 52000,
        likes: 6200,
        platform: "youtube",
        publishedAt: "2024-01-12",
      },
    ],
  },
  {
    id: "3",
    name: "Jordan Parks",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    bio: "Pro gamer and streamer. Competitive FPS player sharing tips, tricks, and epic moments.",
    niche: ["Gaming", "Comedy"],
    level: 3,
    levelName: "Emerging",
    platforms: {
      youtube: { followers: 62000, handle: "@jordanparks" },
      tiktok: { followers: 43000, handle: "@jordanparksgaming" },
    },
    stats: {
      avgViews: 18500,
      engagementRate: 7.4,
      totalFollowers: 105000,
    },
    collaborationGoals: ["Co-create content", "Guest appearance", "Cross-promotion"],
    featuredContent: [
      {
        id: "c6",
        title: "Insane 1v5 Clutch Compilation",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
        views: 89000,
        likes: 7800,
        platform: "youtube",
        publishedAt: "2024-01-20",
      },
      {
        id: "c7",
        title: "Pro Settings Revealed",
        thumbnail: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=225&fit=crop",
        views: 34000,
        likes: 2900,
        platform: "tiktok",
        publishedAt: "2024-01-14",
      },
    ],
  },
  {
    id: "4",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    bio: "Wellness coach and yoga instructor. Helping you find balance in a chaotic world.",
    niche: ["Fitness", "Lifestyle"],
    level: 2,
    levelName: "Rising",
    platforms: {
      instagram: { followers: 8500, handle: "@priyawellness" },
      youtube: { followers: 3200, handle: "@priyasharmayoga" },
    },
    stats: {
      avgViews: 2800,
      engagementRate: 9.1,
      totalFollowers: 11700,
    },
    collaborationGoals: ["Guest appearance", "Cross-promotion"],
    featuredContent: [
      {
        id: "c8",
        title: "Morning Yoga Routine",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
        views: 5600,
        likes: 890,
        platform: "instagram",
        publishedAt: "2024-01-19",
      },
    ],
  },
  {
    id: "5",
    name: "Marcus Williams",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
    bio: "Music producer and beatmaker. Creating vibes and teaching the art of production.",
    niche: ["Music", "Education"],
    level: 3,
    levelName: "Emerging",
    platforms: {
      youtube: { followers: 38000, handle: "@marcusbeats" },
      tiktok: { followers: 52000, handle: "@marcuswilliamsmusic" },
      instagram: { followers: 21000, handle: "@marcusbeats" },
    },
    stats: {
      avgViews: 15200,
      engagementRate: 5.9,
      totalFollowers: 111000,
    },
    collaborationGoals: ["Co-create content", "Podcast feature"],
    featuredContent: [
      {
        id: "c9",
        title: "Making a Beat in 60 Seconds",
        thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop",
        views: 42000,
        likes: 5100,
        platform: "tiktok",
        publishedAt: "2024-01-17",
      },
      {
        id: "c10",
        title: "Studio Setup Under $1000",
        thumbnail: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=400&h=225&fit=crop",
        views: 28500,
        likes: 2300,
        platform: "youtube",
        publishedAt: "2024-01-08",
      },
    ],
  },
  {
    id: "6",
    name: "Emily Foster",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    bio: "Food blogger and home chef. Easy recipes for busy people who love good food.",
    niche: ["Food", "Lifestyle"],
    level: 2,
    levelName: "Rising",
    platforms: {
      instagram: { followers: 12000, handle: "@emilycooks" },
      tiktok: { followers: 8900, handle: "@emilyfosterfood" },
    },
    stats: {
      avgViews: 4200,
      engagementRate: 8.7,
      totalFollowers: 20900,
    },
    collaborationGoals: ["Co-create content", "Cross-promotion"],
    featuredContent: [
      {
        id: "c11",
        title: "5-Minute Pasta Hack",
        thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=225&fit=crop",
        views: 18700,
        likes: 2100,
        platform: "tiktok",
        publishedAt: "2024-01-16",
      },
    ],
  },
];

export const currentUser: Creator = mockCreators[0];

// Analytics mock data
export const analyticsData = {
  weeklyViews: [
    { day: "Mon", views: 8200 },
    { day: "Tue", views: 9100 },
    { day: "Wed", views: 12400 },
    { day: "Thu", views: 11800 },
    { day: "Fri", views: 15600 },
    { day: "Sat", views: 18200 },
    { day: "Sun", views: 14300 },
  ],
  growthTrend: [
    { month: "Sep", followers: 45000 },
    { month: "Oct", followers: 52000 },
    { month: "Nov", followers: 58000 },
    { month: "Dec", followers: 65000 },
    { month: "Jan", followers: 73000 },
  ],
  topContent: mockCreators[0].featuredContent,
  insights: [
    {
      title: "Best posting time",
      value: "6-8 PM",
      change: "+23% engagement",
      positive: true,
    },
    {
      title: "Top performing niche",
      value: "AI Tools",
      change: "45K avg views",
      positive: true,
    },
    {
      title: "Audience growth",
      value: "+12.3%",
      change: "This month",
      positive: true,
    },
  ],
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};
