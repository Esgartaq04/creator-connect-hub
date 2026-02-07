import { Header } from "@/components/Header";
import { ContentThumbnailCard } from "@/components/ContentThumbnailCard";
import { currentUser, analyticsData, formatNumber } from "@/data/mockData";
import {
  TrendingUp,
  Youtube,
  Instagram,
  Music, // for TikTok
  Plus,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Safe access to platform data (mocking the split if not fully available in your data structure)
  const ytFollowers = currentUser.platforms?.youtube?.followers || 12500;
  const igFollowers = currentUser.platforms?.instagram?.followers || 55200;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, {currentUser.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here is your cross-platform performance today.
            </p>
          </div>
          <div className="flex items-center gap-2">
             <p className="text-sm text-muted-foreground">Last updated: Just now</p>
          </div>
        </div>

        {/* Hero Card: Total Audience */}
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                        Total Audience (Aggregated)
                    </h2>
                    <div className="text-5xl font-display font-bold text-foreground">
                        {formatNumber(currentUser.stats.totalFollowers)} <span className="text-lg font-normal text-muted-foreground">Followers</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-lg border border-green-500/20">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-bold text-lg">+5.2%</span>
                    <span className="text-xs opacity-80">(Last 30d)</span>
                </div>
            </div>
            
            {/* Decorative bg blur */}
            <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Platform Summaries */}
        <div className="grid gap-6 md:grid-cols-3">
            {/* YouTube */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm font-semibold uppercase">
                        <Youtube className="h-4 w-4" /> YouTube Summary
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                        {formatNumber(ytFollowers)} <span className="text-sm font-normal text-muted-foreground">Subs</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3" /> +120 this week
                    </p>
                </div>
                <Button variant="link" className="w-fit p-0 h-auto mt-4 text-primary">View Report &gt;</Button>
            </div>

            {/* Instagram */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm font-semibold uppercase">
                        <Instagram className="h-4 w-4" /> Instagram Summary
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                        {formatNumber(igFollowers)} <span className="text-sm font-normal text-muted-foreground">Followers</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3" /> +200 this week
                    </p>
                </div>
                <Button variant="link" className="w-fit p-0 h-auto mt-4 text-primary">View Report &gt;</Button>
            </div>

            {/* TikTok (Connect Placeholder) */}
            <div className="glass-card rounded-2xl p-6 border-dashed border-2 flex flex-col items-center justify-center text-center hover:bg-secondary/50 transition-colors cursor-pointer group">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Connect TikTok</h3>
                <p className="text-sm text-muted-foreground">Sync your account to track stats</p>
            </div>
        </div>

        {/* Growth Chart */}
        <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">Growth Chart</h3>
                <div className="flex gap-2">
                    {["All", "YT", "IG"].map((tab, i) => (
                        <button 
                            key={tab}
                            className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.growthTrend}>
                    <defs>
                        <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                    />
                    <RechartsTooltip 
                        contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))", 
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            color: "hsl(var(--foreground))"
                        }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorFollowers)" 
                    />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Content Performance Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">Recent Content Performance</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-secondary/50">
                        <tr className="text-left text-xs font-medium text-muted-foreground uppercase">
                            <th className="px-6 py-4">Content</th>
                            <th className="px-6 py-4">Platform</th>
                            <th className="px-6 py-4">Views</th>
                            <th className="px-6 py-4">Engagement</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {analyticsData.topContent.map((item) => (
                            <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-16 rounded-md bg-muted overflow-hidden relative shrink-0">
                                            <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                                        </div>
                                        <span className="font-medium text-foreground truncate max-w-[200px]">{item.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {item.platform === 'youtube' ? (
                                        <div className="flex items-center gap-2 text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded w-fit dark:bg-red-900/30 dark:text-red-400">
                                            <Youtube className="h-3 w-3" /> YouTube
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-xs font-medium bg-pink-100 text-pink-600 px-2 py-1 rounded w-fit dark:bg-pink-900/30 dark:text-pink-400">
                                            <Instagram className="h-3 w-3" /> Instagram
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-foreground font-medium">
                                    {formatNumber(item.views)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 font-medium">12%</span>
                                        <span className="text-xs text-green-600/70 bg-green-500/10 px-1.5 py-0.5 rounded">(High)</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </main>
    </div>
  );
}