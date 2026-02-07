import { Creator, formatNumber } from "@/data/mockData";
import { LevelBadge } from "./LevelBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CreatorCardProps {
  creator: Creator;
  className?: string;
  onRequestCollab?: () => void;
}

export function CreatorCard({ creator, className, onRequestCollab }: CreatorCardProps) {
  return (
    <div
      className={cn(
        "glass-card-hover rounded-2xl p-5 flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground truncate">
            {creator.name}
          </h3>
          <div className="mt-1 flex flex-wrap gap-1">
            {creator.niche.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Level Badge */}
      <div className="mt-3">
        <LevelBadge level={creator.level} size="sm" />
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-secondary/50 p-2 text-center">
          <Eye className="mx-auto h-4 w-4 text-muted-foreground" />
          <p className="mt-1 text-sm font-semibold text-foreground">
            {formatNumber(creator.stats.avgViews)}
          </p>
          <p className="text-[10px] text-muted-foreground">Avg Views</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-2 text-center">
          <TrendingUp className="mx-auto h-4 w-4 text-muted-foreground" />
          <p className="mt-1 text-sm font-semibold text-foreground">
            {creator.stats.engagementRate}%
          </p>
          <p className="text-[10px] text-muted-foreground">Engagement</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-2 text-center">
          <Users className="mx-auto h-4 w-4 text-muted-foreground" />
          <p className="mt-1 text-sm font-semibold text-foreground">
            {formatNumber(creator.stats.totalFollowers)}
          </p>
          <p className="text-[10px] text-muted-foreground">Followers</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={`/creator/${creator.id}`}>View Profile</Link>
        </Button>
        <Button size="sm" className="flex-1" onClick={onRequestCollab}>
          Request Collab
        </Button>
      </div>
    </div>
  );
}
