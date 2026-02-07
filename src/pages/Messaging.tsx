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
              {currentUser.name.split(" ")[0]} Messages
            </h1>
            {/* <p className="text-muted-foreground mt-1">
              Here's how your content is performing
            </p> */}
          </div>
        </div>

        {/* main body portion of messages page */}
        <div>
            {/* side bar with all the messages and then when you click on a message it will show the message thread on the right side of the page */}
             {/* or people messaging */}
            <div>
                <h3>Messages people</h3>
            </div>

            {/* message thread portion below*/}
            <div>
                <h1>
                    message thread from {currentUser.name.split(" ")[0]} and {"User 2"}
                </h1>
            </div>
        </div>

        
        


      </main>
    </div>
  );
}
