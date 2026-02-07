import { Header } from "@/components/Header";
import { StatTile } from "@/components/StatTile";
import { ContentThumbnailCard } from "@/components/ContentThumbnailCard";
import { LevelBadge } from "@/components/LevelBadge";
import { currentUser, analyticsData, levelDescriptions, formatNumber } from "@/data/mockData";
import {
  Eye,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  Info,
  Lightbulb,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Messaging() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"> 
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Welcome to {currentUser.name.split(" ")[0]} Posts
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's is your current content
            </p>
          </div>
        </div>

        {/* // body ish of the page */}
         <div>
            <p>
                test texxt to be changed and replaced with posts

            </p>
          </div>


      </main>
    </div>
  );
}
