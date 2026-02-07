import { Header } from "@/components/Header";
import { LevelBadge } from "@/components/LevelBadge";
import { StatTile } from "@/components/StatTile";
import { formatNumber } from "@/data/mockData";
import { useCurrentCreator } from "@/hooks/useCurrentCreator";
import { ExternalLink, Instagram, Music, Users, Eye, TrendingUp, Youtube } from "lucide-react";

const platformIcons: Record<string, React.ElementType> = {
  youtube: Youtube,
  tiktok: Music,
  instagram: Instagram,
};

export default function Profile() {
  const { data: creator, isLoading } = useCurrentCreator();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-10">
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </main>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-10">
          <p className="text-sm text-muted-foreground">
            No creator profile found yet.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-28 w-28 rounded-2xl object-cover ring-4 ring-white shadow-lg"
            />
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {creator.name}
                </h1>
                <LevelBadge level={creator.level} />
              </div>
              <p className="text-sm text-muted-foreground">
                Level {creator.level} – {creator.levelName}
              </p>
              <p className="text-muted-foreground">{creator.bio}</p>
              <div className="flex flex-wrap gap-2">
                {creator.niche.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatTile
              label="Total Followers"
              value={formatNumber(creator.stats.totalFollowers)}
              icon={Users}
            />
            <StatTile
              label="Average Views"
              value={formatNumber(creator.stats.avgViews)}
              icon={Eye}
            />
            <StatTile
              label="Engagement Rate"
              value={`${creator.stats.engagementRate}%`}
              icon={TrendingUp}
            />
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Connected Platforms
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {Object.entries(creator.platforms).map(([platform, data]) => {
                const Icon = platformIcons[platform] || ExternalLink;
                return (
                  <div
                    key={platform}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{data.handle}</span>
                    <span className="text-muted-foreground">
                      {formatNumber(data.followers)}
                    </span>
                  </div>
                );
              })}
              {Object.keys(creator.platforms).length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No platforms connected yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
