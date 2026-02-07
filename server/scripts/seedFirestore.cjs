require('dotenv').config({ path: '../.env' }); 

const { db } = require("../lib/firebaseAdmin.cjs");

const UIDS = {
  jordan: "13vyeNJdo4hytNrOCeZc44aVzWI3",
  alex: "1M2UobBV4Ze4WQArta1klS2IGhc2",
  priya: "4HdmfGOJy4NwwaDzlQZEdZk9PVi2",
  maya: "p2jjf56cfJTVNdouxDKNLDWbOtI2",
  emily: "p4B87oGAiQZfydUxFFCTALyvIo03",
  marcus: "tOhR15DGDsgl4B36Qb5p2ugIWXl1",
  kevin: "2ILgPhBgFKPzewSpnZyNsIoFo7U2" //
};

const creatorsData = [
  {
    id: UIDS.alex,
    name: "Alex Chen",
    avatar: "https://i.ibb.co/VtP2f1M/alex-chen.jpg",
    bio: "Demystifying tech concepts for developers. Let's code!",
    niche: ["Tech", "Education"],
    level: 5,
    levelName: "Visionary",
    stats: { avgViews: 550000, engagementRate: 6.8, totalFollowers: 1500000 }
  },
  {
    id: UIDS.priya,
    name: "Priya Sharma",
    avatar: "https://i.ibb.co/J3F2G1H/priya-sharma.jpg",
    bio: "Wellness coach helping you find balance and health.",
    niche: ["Fitness", "Lifestyle"],
    level: 4,
    levelName: "Wellness Guru",
    stats: { avgViews: 300000, engagementRate: 6.2, totalFollowers: 2700000 }
  },
  {
    id: UIDS.jordan,
    name: "Jordan Parks",
    avatar: "https://i.ibb.co/hR41d3W/jordan-parks.jpg",
    bio: "Funny gaming moments and top-tier competitive gameplay.",
    niche: ["Gaming", "Comedy"],
    level: 3,
    levelName: "Pro Gamer",
    stats: { avgViews: 600000, engagementRate: 7.5, totalFollowers: 2400000 }
  },
  {
    id: UIDS.maya,
    name: "Maya Rodriguez",
    avatar: "https://i.ibb.co/x7R41D4/maya-rodriguez.jpg",
    bio: "Digital artist sharing my creative process and tutorials.",
    niche: ["Art", "DIY"],
    level: 4,
    levelName: "Illustrator",
    stats: { avgViews: 400000, engagementRate: 8.1, totalFollowers: 3050000 }
  },
  {
    id: UIDS.emily,
    name: "Emily Foster",
    avatar: "https://i.ibb.co/X7Y8Z9A/emily-foster.jpg",
    bio: "Delicious recipes and culinary inspiration for home chefs.",
    niche: ["Food", "Lifestyle"],
    level: 2,
    levelName: "Culinary Explorer",
    stats: { avgViews: 380000, engagementRate: 7.0, totalFollowers: 2800000 }
  },
  {
    id: UIDS.marcus,
    name: "Marcus Williams",
    avatar: "https://i.ibb.co/L4M5N6O/marcus-williams.jpg",
    bio: "Music producer teaching the art of production and theory.",
    niche: ["Music", "Education"],
    level: 3,
    levelName: "Sound Architect",
    stats: { avgViews: 250000, engagementRate: 5.0, totalFollowers: 850000 }
  },
  {
    id: UIDS.kevin,
    name: "Kevin Kevin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    bio: "New creator on the platform! Ready to collaborate.",
    niche: ["Lifestyle"],
    level: 1,
    levelName: "Newcomer",
    stats: { avgViews: 1200, engagementRate: 4.5, totalFollowers: 950 }
  }
];

const analyticsMock = {
  weeklyViews: [
    { day: "Mon", views: 8200 }, { day: "Tue", views: 9100 },
    { day: "Wed", views: 12400 }, { day: "Thu", views: 11800 },
    { day: "Fri", views: 15600 }, { day: "Sat", views: 18200 },
    { day: "Sun", views: 14300 }
  ],
  insights: [
    { title: "Best posting time", value: "6-8 PM", change: "+23%", positive: true },
    { title: "Top niche", value: "Tech", change: "45K avg views", positive: true }
  ]
};

const seed = async () => {
  const batch = db.batch(); 
  
  for (const creator of creatorsData) {
    const { id, ...data } = creator;
    
    // Create Creator Profile named after the Correct UID
    const creatorRef = db.collection("creators").doc(id);
    batch.set(creatorRef, data, { merge: true });
    
    // Create Analytics Entry named after the Correct UID
    const analyticsRef = db.collection("analytics").doc(id);
    batch.set(analyticsRef, analyticsMock, { merge: true });
  }
  
  await batch.commit();
};

const run = async () => {
  try {
    console.log("Starting seed with EXACT UIDs...");
    await seed();
    console.log("Success! All accounts are back and correctly linked by UID.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

run();