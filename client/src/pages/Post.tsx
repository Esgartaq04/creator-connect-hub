import { useState } from "react";
import { Header } from "@/components/Header";
import { ContentThumbnailCard } from "@/components/ContentThumbnailCard";
import { currentUser } from "@/data/mockData";
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
  MoreHorizontal
} from "lucide-react";

export default function Posts() {
  const [searchQuery, setSearchQuery] = useState("");

  // In a real app, you'd filter the actual data based on the tabs
  const allPosts = currentUser.featuredContent;
  const collabPosts = allPosts.filter(post => post.title.toLowerCase().includes("collab") || post.title.toLowerCase().includes("vs"));
  
  // Mocking some drafts since they aren't in the main data
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
            <Button variant="outline" className="hidden sm:flex">
              <Zap className="mr-2 h-4 w-4 text-amber-500" />
              Growth Insights
            </Button>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-5 w-5" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50 p-4 rounded-xl border border-border/50">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search your posts..." 
                  className="pl-9 bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="ml-auto sm:ml-0">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="ghost" size="icon">
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

              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {allPosts.map((post) => (
                    <ContentThumbnailCard key={post.id} content={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="collabs" className="space-y-6">
                <div className="flex items-center gap-2 mb-4 p-3 bg-primary/10 rounded-lg text-primary text-sm">
                  <Users className="h-4 w-4" />
                  <span>Collaborations have <strong>2.5x higher engagement</strong> on average.</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {collabPosts.length > 0 ? (
                    collabPosts.map((post) => (
                      <ContentThumbnailCard key={post.id} content={post} />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                      No collaborations found. Try reaching out in the Network tab!
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="drafts" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {drafts.map((draft) => (
                    // @ts-ignore - simplified mock object for draft
                    <ContentThumbnailCard key={draft.id} content={draft} />
                  ))}
                  
                  {/* Empty State / Add New Placeholder */}
                  <button className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all h-[280px]">
                    <div className="rounded-full bg-background p-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Video className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">Create New Draft</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Start working on your next big idea</p>
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Growth Tools */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Performance
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Views (30d)</span>
                  <span className="font-bold text-foreground">+12.4K</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[70%]" />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Collabs</span>
                  <span className="font-bold text-foreground">2 Active</span>
                </div>
              </div>
            </div>

            {/* Suggested Actions */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">Grow Your Reach</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Post a Short today</p>
                    <p className="text-muted-foreground text-xs mt-1">Short-form content is trending up 15% this week.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Reply to comments</p>
                    <p className="text-muted-foreground text-xs mt-1">You have 12 unread comments on your latest video.</p>
                  </div>
                </li>
              </ul>
              <Button variant="link" className="w-full mt-2 text-xs h-auto p-0">
                View all suggestions
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}