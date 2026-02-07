import { ContentItem, formatNumber } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Play, Heart, Eye } from "lucide-react";

interface ContentThumbnailCardProps {
  content: ContentItem;
  className?: string;
}

const platformColors: Record<string, string> = {
  youtube: "bg-red-500",
  tiktok: "bg-foreground",
  instagram: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
};

export function ContentThumbnailCard({ content, className }: ContentThumbnailCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl glass-card-hover cursor-pointer",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/20">
          <div className="rounded-full bg-white/90 p-3 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
            <Play className="h-6 w-6 text-foreground fill-current" />
          </div>
        </div>

        {/* Platform badge */}
        <div
          className={cn(
            "absolute right-2 top-2 rounded-md px-2 py-0.5 text-xs font-medium text-white capitalize",
            platformColors[content.platform]
          )}
        >
          {content.platform}
        </div>
      </div>

      {/* Content info */}
      <div className="p-3">
        <h4 className="font-medium text-foreground line-clamp-2 text-sm leading-snug">
          {content.title}
        </h4>
        
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {formatNumber(content.views)}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {formatNumber(content.likes)}
          </span>
        </div>
      </div>
    </div>
  );
}
