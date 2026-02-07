import { useState } from "react";
import { Header } from "@/components/Header";
import { currentUser } from "@/data/mockData"; // Removed ContentThumbnailCard to use custom card
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  Video,
  Users,
  Sparkles,
  Zap,
  MoreHorizontal,
  Youtube,
  Instagram,
  Music,
  Play,
  Eye,
  Heart
} from "lucide-react";

// 1. Helper Component for Platform Icons
const PlatformIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  if (p === 'youtube') {
    return (
      <div className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
        <Youtube className="h-3 w-3 fill-current" />
        <span>Youtube</span>
      </div>
    );
  }
  if (p === 'instagram') {
    return (
      <div className="flex items-center gap-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
        <Instagram className="h-3 w-3" />
        <span>Insta</span>
      </div>
    );
  }
  if (p === 'tiktok') {
    return (
      <div className="flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-white/20">
        <Music className="h-3 w-3" />
        <span>TikTok</span>
      </div>
    );
  }
  return <div className="bg-gray-600 text-white p-1 rounded"><Video className="h-3 w-3" /></div>;
};

export default function Posts() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data usage
  const allPosts = currentUser.featuredContent;
  const collabPosts = allPosts.filter(post => post.title.toLowerCase().includes("collab") || post.title.toLowerCase().includes("vs"));
  
  const drafts = [
    {
      id: "draft-1",
      title: "Day in the Life: Coding Bootcamp (DRAFT)",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=640",
      views: 0,
      likes: 0,
      date: "Edited 2h ago",
      platform: "youtube",
      type: "video"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Content Manager
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your videos, track collaborations, and plan your growth.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex bg-background">
              <Zap className="mr-2 h-4 w-4 text-amber-500 fill-amber-500" />
              Growth Insights
            </Button>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-5 w-5" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content Area (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search & Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50 p-1.5 rounded-xl border border-border/50">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search your posts..." 
                  className="pl-9 bg-transparent border-none shadow-none focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1 pr-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-6">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="collabs">Collabs</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>

              {/* 2. Custom Card Rendering for "All Posts" */}
              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {allPosts.map((post) => (
                    <div key={post.id} className="group flex flex-col gap-3 rounded-xl bg-card border border-border p-3 hover:shadow-md transition-all">
                      {/* Thumbnail & Icon */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        
                        {/* Platform Icon Overlay */}
                        <div className="absolute top-2 right-2">
                          <PlatformIcon platform={post.platform} />
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg">
                                <Play className="h-6 w-6 text-white fill-white" />
                            </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1 leading-tight mb-2">{post.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
                                <Eye className="h-3 w-3" /> 
                                {new Intl.NumberFormat('en-US', { notation: "compact" }).format(post.views)}
                            </span>
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
                                <Heart className="h-3 w-3" /> 
                                {new Intl.NumberFormat('en-US', { notation: "compact" }).format(post.likes)}
                            </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="collabs" className="space-y-6">
                <div className="flex items-center gap-2 mb-4 p-3 bg-primary/10 rounded-lg text-primary text-sm border border-primary/20">
                  <Users className="h-4 w-4" />
                  <span>Collaborations have <strong>2.5x higher engagement</strong> on average.</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {collabPosts.map((post) => (
                    <div key={post.id} className="group rounded-xl bg-card border border-border p-3">
                       <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                          <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
                          <div className="absolute top-2 right-2"><PlatformIcon platform={post.platform} /></div>
                          <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">COLLAB</div>
                       </div>
                       <h3 className="mt-3 font-semibold text-foreground line-clamp-1">{post.title}</h3>
                       <p className="text-xs text-muted-foreground mt-1">vs. Competitor / Partner</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="drafts" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="group rounded-xl bg-card border border-dashed border-border p-3 opacity-75 hover:opacity-100 transition-opacity">
                       <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted grayscale">
                          <img src={draft.thumbnail} alt={draft.title} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs font-mono">DRAFT</span>
                          </div>
                       </div>
                       <h3 className="mt-3 font-medium text-foreground line-clamp-1">{draft.title}</h3>
                       <p className="text-xs text-muted-foreground mt-1">{draft.date}</p>
                    </div>
                  ))}
                  
                  {/* Create New Draft Button */}
                  <button className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all min-h-[200px]">
                    <div className="rounded-full bg-background p-3 shadow-sm mb-3">
                      <Video className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">Create Draft</span>
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 3. Right Sidebar - Quick Overview */}
          <div className="space-y-6">
            
            {/* Performance Card */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Performance</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-muted-foreground">Views (30d)</span>
                    <span className="font-bold text-foreground text-lg">+12.4K</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[70%] rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Active Collabs</span>
                  <span className="font-semibold text-foreground">2 Active</span>
                </div>
              </div>
            </div>

            {/* Growth Tips Card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4 text-foreground">Grow Your Reach</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start group cursor-pointer">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 shrink-0 group-hover:scale-125 transition-transform" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">Post a Short today</p>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                      Short-form content is trending up <strong>15%</strong> this week.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start group cursor-pointer">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">Reply to comments</p>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                      You have <strong>12 unread</strong> comments on your latest video.
                    </p>
                  </div>
                </li>
              </ul>
              <Button variant="link" className="w-full mt-4 text-xs h-auto p-0 text-muted-foreground hover:text-primary">
                View all suggestions
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}