import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { LevelBadge } from "@/components/LevelBadge";
import { StatTile } from "@/components/StatTile";
import { ContentThumbnailCard } from "@/components/ContentThumbnailCard";
import { CollaborationModal } from "@/components/CollaborationModal";
import { Button } from "@/components/ui/button";
import { formatNumber, levelDescriptions } from "@/data/mockData";
import {
  Eye,
  TrendingUp,
  Users,
  Youtube,
  Instagram,
  Music,
  Handshake,
  Info,
  ExternalLink,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCreator } from "@/hooks/useCreator";

const platformIcons: Record<string, React.ElementType> = {
  youtube: Youtube,
  tiktok: Music,
  instagram: Instagram,
};

export default function Portfolio() {
  const { id } = useParams();
  const { data: creator, isLoading } = useCreator(id);
  const [showCollab, setShowCollab] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-10">
          <p className="text-sm text-muted-foreground">Loading creator...</p>
        </main>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-10">
          <p className="text-sm text-muted-foreground">Creator not found.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/discover">Back to Discover</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Header */}
      <div className="relative overflow-hidden gradient-hero border-b border-border">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-32 w-32 rounded-2xl object-cover ring-4 ring-white shadow-xl"
            />

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-foreground">
                  {creator.name}
                </h1>
                <div className="flex items-center gap-2">
                  <LevelBadge level={creator.level} />
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-popover">
                      <p className="font-medium">Creator Level {creator.level}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {levelDescriptions[creator.level]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Niche tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {creator.niche.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-muted-foreground max-w-xl">{creator.bio}</p>

              {/* Platforms */}
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(creator.platforms).map(([platform, data]) => {
                  const Icon = platformIcons[platform] || ExternalLink;
                  return (
                    <a
                      key={platform}
                      href="#"
                      className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {data.handle}
                      <span className="text-muted-foreground">
                        {formatNumber(data.followers)}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* CTA */}
              <Button onClick={() => setShowCollab(true)} size="lg" className="mt-6">
                <Handshake className="mr-2 h-5 w-5" />
                Request Collaboration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left: Featured Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Featured Content
            </h2>
            {creator.featuredContent.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {creator.featuredContent.map((content) => (
                  <ContentThumbnailCard key={content.id} content={content} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No featured content yet.
              </p>
            )}

            {/* Collaboration preferences */}
            <div className="glass-card rounded-2xl p-6 mt-8">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Open to Collaborate
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {creator.collaborationGoals.map((goal) => (
                  <span
                    key={goal}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats Sidebar */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Stats Overview
            </h2>
            <StatTile
              label="Average Views"
              value={formatNumber(creator.stats.avgViews)}
              icon={Eye}
            />
            <StatTile
              label="Engagement Rate"
              value={`${creator.stats.engagementRate}%`}
              icon={TrendingUp}
              trend={{ value: "+0.8% this month", positive: true }}
            />
            <StatTile
              label="Total Followers"
              value={formatNumber(creator.stats.totalFollowers)}
              icon={Users}
            />

            {/* Quick actions */}
            <div className="glass-card rounded-2xl p-4 mt-6">
              <p className="text-sm text-muted-foreground text-center">
                Is this your profile?
              </p>
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <CollaborationModal
        creator={creator}
        open={showCollab}
        onOpenChange={setShowCollab}
      />
    </div>
  );
}
