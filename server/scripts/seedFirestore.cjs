const { db } = require("../lib/firebaseAdmin.cjs");

const creatorsData = [
  {
    id: "creator_alex_chen",
    name: "Alex Chen",
    avatar: "https://i.ibb.co/VtP2f1M/alex-chen.jpg",
    bio: "Demystifying complex tech concepts and sharing educational content for developers and enthusiasts. Let's code!",
    niche: ["Tech", "Education", "Programming"],
    level: 5,
    levelName: "Visionary",
    platforms: {
      youtube: {
        followers: 1200000,
        handle: "AlexChenTech",
      },
      instagram: {
        followers: 300000,
        handle: "AlexChenOfficial",
      },
    },
    stats: {
      avgViews: 550000,
      engagementRate: 6.8,
      totalFollowers: 1500000,
    },
    collaborationGoals: [
      "Tech product reviews",
      "Educational series",
      "Hackathon partnerships",
    ],
    featuredContent: [
      {
        id: "fc_ac_001",
        title: "Mastering Python: Advanced Concepts",
        thumbnail: "https://i.ibb.co/30Z1r23/python-advanced.jpg",
        views: 980000,
        likes: 75000,
        platform: "youtube",
        publishedAt: "2023-10-26",
      },
      {
        id: "fc_ac_002",
        title: "Understanding AI: From Basics to Breakthroughs",
        thumbnail: "https://i.ibb.co/yY11x5j/ai-breakthroughs.jpg",
        views: 720000,
        likes: 50000,
        platform: "youtube",
        publishedAt: "2024-01-15",
      },
    ],
  },
  {
    id: "creator_maya_rodriguez",
    name: "Maya Rodriguez",
    avatar: "https://i.ibb.co/x7R41D4/maya-rodriguez.jpg",
    bio: "Exploring the world through art and sharing creative tutorials. Anyone can be an artist!",
    niche: ["Art", "Education", "DIY", "Crafts"],
    level: 4,
    levelName: "Illustrator",
    platforms: {
      youtube: {
        followers: 850000,
        handle: "MayaArtFlow",
      },
      instagram: {
        followers: 1500000,
        handle: "MayaRodriguezArt",
      },
      tiktok: {
        followers: 700000,
        handle: "ArtByMaya",
      },
    },
    stats: {
      avgViews: 400000,
      engagementRate: 8.1,
      totalFollowers: 3050000,
    },
    collaborationGoals: [
      "Art supply sponsorships",
      "Online art workshops",
      "Creative challenges",
    ],
    featuredContent: [
      {
        id: "fc_mr_001",
        title: "Beginner's Guide to Watercolor Painting",
        thumbnail: "https://i.ibb.co/4T1GvP2/watercolor-guide.jpg",
        views: 650000,
        likes: 60000,
        platform: "youtube",
        publishedAt: "2023-08-01",
      },
      {
        id: "fc_mr_002",
        title: "5 Minute Sketch Challenges!",
        thumbnail: "https://i.ibb.co/YyY1q5K/sketch-challenges.jpg",
        views: 300000,
        likes: 45000,
        platform: "tiktok",
        publishedAt: "2024-02-01",
      },
    ],
  },
  {
    id: "creator_jordan_parks",
    name: "Jordan Parks",
    avatar: "https://i.ibb.co/hR41d3W/jordan-parks.jpg",
    bio: "Bringing you the funniest gaming moments and top-tier gameplay. Get ready to laugh and be amazed!",
    niche: ["Gaming", "Comedy", "Entertainment"],
    level: 3,
    levelName: "Pro Gamer",
    platforms: {
      youtube: {
        followers: 900000,
        handle: "JordanPlays",
      },
      tiktok: {
        followers: 1500000,
        handle: "JordanGaming",
      },
    },
    stats: {
      avgViews: 600000,
      engagementRate: 7.5,
      totalFollowers: 2400000,
    },
    collaborationGoals: [
      "Game promotions",
      "Esports events",
      "Merchandise partnerships",
    ],
    featuredContent: [
      {
        id: "fc_jp_001",
        title: "Epic Fails & Clutch Plays Compilation #10",
        thumbnail: "https://i.ibb.co/T1H2j5G/gaming-compilation.jpg",
        views: 1100000,
        likes: 90000,
        platform: "youtube",
        publishedAt: "2023-12-10",
      },
      {
        id: "fc_jp_002",
        title: "Trying Out the NEWest Indie Game!",
        thumbnail: "https://i.ibb.co/Z1B2c4F/indie-game.jpg",
        views: 800000,
        likes: 70000,
        platform: "youtube",
        publishedAt: "2024-01-20",
      },
    ],
  },
  {
    id: "creator_priya_sharma",
    name: "Priya Sharma",
    avatar: "https://i.ibb.co/J3F2G1H/priya-sharma.jpg",
    bio: "Your guide to a healthier and happier lifestyle through fitness, mindful eating, and positive vibes.",
    niche: ["Fitness", "Lifestyle", "Health"],
    level: 4,
    levelName: "Wellness Guru",
    platforms: {
      instagram: {
        followers: 2100000,
        handle: "PriyaFitLife",
      },
      youtube: {
        followers: 600000,
        handle: "PriyaWellness",
      },
    },
    stats: {
      avgViews: 300000,
      engagementRate: 6.2,
      totalFollowers: 2700000,
    },
    collaborationGoals: [
      "Fitness gear reviews",
      "Healthy food partnerships",
      "Workout challenges",
    ],
    featuredContent: [
      {
        id: "fc_ps_001",
        title: "Full Body Home Workout (No Equipment!)",
        thumbnail: "https://i.ibb.co/K2L3M4N/home-workout.jpg",
        views: 700000,
        likes: 55000,
        platform: "youtube",
        publishedAt: "2023-09-05",
      },
      {
        id: "fc_ps_002",
        title: "My Daily Healthy Meal Prep Routine",
        thumbnail: "https://i.ibb.co/V5W6X7Y/meal-prep.jpg",
        views: 450000,
        likes: 30000,
        platform: "youtube",
        publishedAt: "2023-11-12",
      },
    ],
  },
  {
    id: "creator_marcus_williams",
    name: "Marcus Williams",
    avatar: "https://i.ibb.co/L4M5N6O/marcus-williams.jpg",
    bio: "Sharing my passion for music production, theory, and helping aspiring artists find their sound.",
    niche: ["Music", "Education", "Production"],
    level: 3,
    levelName: "Sound Architect",
    platforms: {
      youtube: {
        followers: 700000,
        handle: "MarcusBeats",
      },
      instagram: {
        followers: 150000,
        handle: "MarcusBeatsOfficial",
      },
    },
    stats: {
      avgViews: 250000,
      engagementRate: 5.0,
      totalFollowers: 850000,
    },
    collaborationGoals: [
      "Software reviews",
      "Gear endorsements",
      "Artist collaborations",
    ],
    featuredContent: [
      {
        id: "fc_mw_001",
        title: "Beginner's Guide to FL Studio",
        thumbnail: "https://i.ibb.co/P7Q8R9S/fl-studio.jpg",
        views: 500000,
        likes: 40000,
        platform: "youtube",
        publishedAt: "2023-07-20",
      },
      {
        id: "fc_mw_002",
        title: "Music Theory for Producers: Chord Progressions",
        thumbnail: "https://i.ibb.co/T0U1V2W/chord-progressions.jpg",
        views: 350000,
        likes: 28000,
        platform: "youtube",
        publishedAt: "2023-10-01",
      },
    ],
  },
  {
    id: "creator_emily_foster",
    name: "Emily Foster",
    avatar: "https://i.ibb.co/X7Y8Z9A/emily-foster.jpg",
    bio: "Delicious recipes, cooking hacks, and lifestyle tips to make your everyday extraordinary!",
    niche: ["Food", "Lifestyle", "Cooking", "Home"],
    level: 2,
    levelName: "Culinary Explorer",
    platforms: {
      instagram: {
        followers: 1000000,
        handle: "EmilyEats",
      },
      tiktok: {
        followers: 1800000,
        handle: "EmilyCooks",
      },
    },
    stats: {
      avgViews: 380000,
      engagementRate: 7.0,
      totalFollowers: 2800000,
    },
    collaborationGoals: [
      "Food brand partnerships",
      "Kitchen gadget reviews",
      "Recipe development",
    ],
    featuredContent: [
      {
        id: "fc_ef_001",
        title: "Easy Weeknight Meal Ideas for Busy People",
        thumbnail: "https://i.ibb.co/B0C1D2E/weeknight-meals.jpg",
        views: 600000,
        likes: 45000,
        platform: "youtube",
        publishedAt: "2023-09-18",
      },
      {
        id: "fc_ef_002",
        title: "My Favorite Fall Desserts!",
        thumbnail: "https://i.ibb.co/F3G4H5I/fall-desserts.jpg",
        views: 400000,
        likes: 30000,
        platform: "tiktok",
        publishedAt: "2023-11-05",
      },
    ],
  },
];

const analyticsData = [
  {
    creator_id: "creator_alex_chen",
    weeklyViews: [
      { day: "Mon", views: 70000 },
      { day: "Tue", views: 85000 },
      { day: "Wed", views: 90000 },
      { day: "Thu", views: 80000 },
      { day: "Fri", views: 100000 },
      { day: "Sat", views: 120000 },
      { day: "Sun", views: 110000 },
    ],
    growthTrend: [
      { month: "Sept", followers: 1300000 },
      { month: "Oct", followers: 1370000 },
      { month: "Nov", followers: 1420000 },
      { month: "Dec", followers: 1470000 },
      { month: "Jan", followers: 1500000 },
    ],
    topContent: [
      {
        id: "fc_ac_001",
        title: "Mastering Python: Advanced Concepts",
        thumbnail: "https://i.ibb.co/30Z1r23/python-advanced.jpg",
        views: 980000,
        likes: 75000,
        platform: "youtube",
        publishedAt: "2023-10-26",
      },
    ],
    insights: [
      {
        title: "YouTube Subscribers",
        value: "1.2M",
        change: "+50K",
        positive: true,
      },
      {
        title: "Engagement Rate",
        value: "6.8%",
        change: "+0.2%",
        positive: true,
      },
    ],
  },
  {
    creator_id: "creator_maya_rodriguez",
    weeklyViews: [
      { day: "Mon", views: 60000 },
      { day: "Tue", views: 75000 },
      { day: "Wed", views: 80000 },
      { day: "Thu", views: 70000 },
      { day: "Fri", views: 95000 },
      { day: "Sat", views: 110000 },
      { day: "Sun", views: 100000 },
    ],
    growthTrend: [
      { month: "Sept", followers: 2700000 },
      { month: "Oct", followers: 2850000 },
      { month: "Nov", followers: 2950000 },
      { month: "Dec", followers: 3000000 },
      { month: "Jan", followers: 3050000 },
    ],
    topContent: [
      {
        id: "fc_mr_002",
        title: "5 Minute Sketch Challenges!",
        thumbnail: "https://i.ibb.co/YyY1q5K/sketch-challenges.jpg",
        views: 300000,
        likes: 45000,
        platform: "tiktok",
        publishedAt: "2024-02-01",
      },
    ],
    insights: [
      {
        title: "Instagram Reach",
        value: "5.5M",
        change: "+12%",
        positive: true,
      },
      {
        title: "TikTok Views",
        value: "2.8M",
        change: "+18%",
        positive: true,
      },
    ],
  },
  {
    creator_id: "creator_jordan_parks",
    weeklyViews: [
      { day: "Mon", views: 80000 },
      { day: "Tue", views: 95000 },
      { day: "Wed", views: 100000 },
      { day: "Thu", views: 90000 },
      { day: "Fri", views: 130000 },
      { day: "Sat", views: 150000 },
      { day: "Sun", views: 140000 },
    ],
    growthTrend: [
      { month: "Sept", followers: 2000000 },
      { month: "Oct", followers: 2150000 },
      { month: "Nov", followers: 2250000 },
      { month: "Dec", followers: 2350000 },
      { month: "Jan", followers: 2400000 },
    ],
    topContent: [
      {
        id: "fc_jp_001",
        title: "Epic Fails & Clutch Plays Compilation #10",
        thumbnail: "https://i.ibb.co/T1H2j5G/gaming-compilation.jpg",
        views: 1100000,
        likes: 90000,
        platform: "youtube",
        publishedAt: "2023-12-10",
      },
    ],
    insights: [
      {
        title: "YouTube Watch Time",
        value: "2.1M hours",
        change: "+20%",
        positive: true,
      },
      {
        title: "TikTok Engagement",
        value: "7.5%",
        change: "+0.5%",
        positive: true,
      },
    ],
  },
  {
    creator_id: "creator_priya_sharma",
    weeklyViews: [
      { day: "Mon", views: 50000 },
      { day: "Tue", views: 65000 },
      { day: "Wed", views: 70000 },
      { day: "Thu", views: 60000 },
      { day: "Fri", views: 80000 },
      { day: "Sat", views: 95000 },
      { day: "Sun", views: 85000 },
    ],
    growthTrend: [
      { month: "Sept", followers: 2300000 },
      { month: "Oct", followers: 2450000 },
      { month: "Nov", followers: 2550000 },
      { month: "Dec", followers: 2650000 },
      { month: "Jan", followers: 2700000 },
    ],
    topContent: [
      {
        id: "fc_ps_001",
        title: "Full Body Home Workout (No Equipment!)",
        thumbnail: "https://i.ibb.co/K2L3M4N/home-workout.jpg",
        views: 700000,
        likes: 55000,
        platform: "youtube",
        publishedAt: "2023-09-05",
      },
    ],
    insights: [
      {
        title: "Instagram Saves",
        value: "150K",
        change: "+10%",
        positive: true,
      },
      {
        title: "YouTube Subscribers",
        value: "600K",
        change: "+30K",
        positive: true,
      },
    ],
  },
  {
    creator_id: "creator_marcus_williams",
    weeklyViews: [
      { day: "Mon", views: 40000 },
      { day: "Tue", views: 50000 },
      { day: "Wed", views: 55000 },
      { day: "Thu", views: 48000 },
      { day: "Fri", views: 65000 },
      { day: "Sat", views: 75000 },
      { day: "Sun", views: 68000 },
    ],
    growthTrend: [
      { month: "Sept", followers: 700000 },
      { month: "Oct", followers: 750000 },
      { month: "Nov", followers: 800000 },
      { month: "Dec", followers: 830000 },
      { month: "Jan", followers: 850000 },
    ],
    topContent: [
      {
        id: "fc_mw_001",
        title: "Beginner's Guide to FL Studio",
        thumbnail: "https://i.ibb.co/P7Q8R9S/fl-studio.jpg",
        views: 500000,
        likes: 40000,
        platform: "youtube",
        publishedAt: "2023-07-20",
      },
    ],
    insights: [
      {
        title: "YouTube Average View Duration",
        value: "6:30",
        change: "+0:15",
        positive: true,
      },
      {
        title: "New Subscribers",
        value: "10K/month",
        change: "+1K",
        positive: true,
      },
    ],
  },
  {
    creator_id: "creator_emily_foster",
    weeklyViews: [
      { day: "Mon", views: 55000 },
      { day: "Tue", views: 68000 },
      { day: "Wed", views: 72000 },
      { day: "Thu", views: 65000 },
      { day: "Fri", views: 88000 },
      { day: "Sat", views: 105000 },
      { day: "Sun", views: 95000 },
    ],
    growthTrend: [
      { month: "Sept", followers: 2300000 },
      { month: "Oct", followers: 2480000 },
      { month: "Nov", followers: 2600000 },
      { month: "Dec", followers: 2750000 },
      { month: "Jan", followers: 2800000 },
    ],
    topContent: [
      {
        id: "fc_ef_001",
        title: "Easy Weeknight Meal Ideas for Busy People",
        thumbnail: "https://i.ibb.co/B0C1D2E/weeknight-meals.jpg",
        views: 600000,
        likes: 45000,
        platform: "youtube",
        publishedAt: "2023-09-18",
      },
    ],
    insights: [
      {
        title: "TikTok Views",
        value: "4.1M",
        change: "+25%",
        positive: true,
      },
      {
        title: "Instagram Impressions",
        value: "8.5M",
        change: "+15%",
        positive: true,
      },
    ],
  },
];

const seedCreators = async () => {
  for (const creator of creatorsData) {
    const { id, ...data } = creator;
    await db.collection("creators").doc(id).set(data, { merge: true });
  }
};

const seedAnalytics = async () => {
  for (const analytics of analyticsData) {
    const { creator_id, ...data } = analytics;
    await db.collection("analytics").doc(creator_id).set(data, { merge: true });
  }
};

const run = async () => {
  await seedCreators();
  await seedAnalytics();
  console.log("Seed complete.");
  console.log(
    "Creator IDs:",
    creatorsData.map((creator) => creator.id)
  );
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
