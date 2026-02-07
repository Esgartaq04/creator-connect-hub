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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Welcome back, {currentUser.name.split(" ")[0]}! 👋 adi push check yeho
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's how your content is performing
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LevelBadge level={currentUser.level} />
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-popover">
                <p className="font-medium">Creator Level {currentUser.level}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {levelDescriptions[currentUser.level]}
                </p>
                <p className="text-xs text-primary mt-2">
                  +27K followers to reach Level {currentUser.level + 1}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatTile
            label="Total Followers"
            value={formatNumber(currentUser.stats.totalFollowers)}
            icon={Users}
            trend={{ value: "+12.3% this month", positive: true }}
          />
          <StatTile
            label="Average Views"
            value={formatNumber(currentUser.stats.avgViews)}
            icon={Eye}
            trend={{ value: "+8.5% this week", positive: true }}
          />
          <StatTile
            label="Engagement Rate"
            value={`${currentUser.stats.engagementRate}%`}
            icon={TrendingUp}
            trend={{ value: "+0.8%", positive: true }}
          />
          <StatTile
            label="Best Posting Time"
            value="6-8 PM"
            icon={Clock}
          />
        </div>

        {/* Charts & Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Views Chart */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Weekly Views
                </h2>
                <span className="text-sm text-muted-foreground">Last 7 days</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.weeklyViews}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatNumber(value)}
                    />
                    <Bar
                      dataKey="views"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Follower Growth Chart */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Follower Growth
                </h2>
                <span className="text-sm text-muted-foreground">Last 5 months</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.growthTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatNumber(value)}
                    />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="hsl(var(--accent))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Insights & Top Content */}
          <div className="space-y-6">
            {/* Insights */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Insights
                </h2>
              </div>
              <div className="space-y-4">
                {analyticsData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {insight.title}
                      </p>
                      <p className="font-semibold text-foreground">{insight.value}</p>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        insight.positive ? "text-accent" : "text-destructive"
                      }`}
                    >
                      <ArrowUpRight className="h-3 w-3" />
                      {insight.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Content */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Best Performing
              </h2>
              <div className="space-y-3">
                {analyticsData.topContent.slice(0, 2).map((content) => (
                  <ContentThumbnailCard key={content.id} content={content} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
