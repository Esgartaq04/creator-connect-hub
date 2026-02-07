import { cn } from "@/lib/utils";
import { levelNames } from "@/data/mockData";
import { Sparkles } from "lucide-react";

interface LevelBadgeProps {
  level: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const levelStyles: Record<number, string> = {
  1: "bg-muted text-muted-foreground",
  2: "bg-accent/10 text-accent border-accent/20",
  3: "bg-primary/10 text-primary border-primary/20",
  4: "bg-level-4/10 text-level-4 border-level-4/20",
  5: "bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-600 border-amber-400/30",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function LevelBadge({ level, size = "md", showLabel = true, className }: LevelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        levelStyles[level],
        sizeStyles[size],
        className
      )}
    >
      {level === 5 && <Sparkles className="h-3 w-3" />}
      <span>Level {level}</span>
      {showLabel && <span className="opacity-75">– {levelNames[level]}</span>}
    </span>
  );
}
