import { useState } from "react";
import { Header } from "@/components/Header";
import { CreatorCard } from "@/components/CreatorCard";
import { CollaborationModal } from "@/components/CollaborationModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  niches,
  collaborationTypes,
  levelNames,
  Creator,
} from "@/data/mockData";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useCreators } from "@/hooks/useCreators";

export default function Discover() {
  const [search, setSearch] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedCollabTypes, setSelectedCollabTypes] = useState<string[]>([]);
  const [levelRange, setLevelRange] = useState([1, 5]);
  const [showFilters, setShowFilters] = useState(false);
  const [collabCreator, setCollabCreator] = useState<Creator | null>(null);
  const { data: creators, isLoading } = useCreators();
  const creatorList = creators ?? [];

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const toggleCollabType = (type: string) => {
    setSelectedCollabTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedNiches([]);
    setSelectedCollabTypes([]);
    setLevelRange([1, 5]);
  };

  const filteredCreators = creatorList.filter((creator) => {
    // Search filter
    if (
      search &&
      !creator.name.toLowerCase().includes(search.toLowerCase()) &&
      !creator.niche.some((n) => n.toLowerCase().includes(search.toLowerCase()))
    ) {
      return false;
    }

    // Niche filter
    if (
      selectedNiches.length > 0 &&
      !creator.niche.some((n) => selectedNiches.includes(n))
    ) {
      return false;
    }

    // Collaboration type filter
    if (
      selectedCollabTypes.length > 0 &&
      !creator.collaborationGoals.some((g) => selectedCollabTypes.includes(g))
    ) {
      return false;
    }

    // Level filter
    if (creator.level < levelRange[0] || creator.level > levelRange[1]) {
      return false;
    }

    return true;
  });

  const hasActiveFilters =
    selectedNiches.length > 0 ||
    selectedCollabTypes.length > 0 ||
    levelRange[0] > 1 ||
    levelRange[1] < 5;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Discover Creators
          </h1>
          <p className="text-muted-foreground mt-2">
            Find creators to collaborate with based on niche, level, and goals
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-foreground">
                  Filters
                </h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Niche Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Content Niche
                </Label>
                <div className="flex flex-wrap gap-2">
                  {niches.slice(0, 8).map((niche) => (
                    <button
                      key={niche}
                      onClick={() => toggleNiche(niche)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        selectedNiches.includes(niche)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Range */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Creator Level ({levelRange[0]} - {levelRange[1]})
                </Label>
                <Slider
                  value={levelRange}
                  onValueChange={setLevelRange}
                  min={1}
                  max={5}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{levelNames[1]}</span>
                  <span>{levelNames[5]}</span>
                </div>
              </div>

              {/* Collaboration Types */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Open to
                </Label>
                <div className="space-y-2">
                  {collaborationTypes.slice(0, 4).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCollabTypes.includes(type)}
                        onCheckedChange={() => toggleCollabType(type)}
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search creators by name or niche..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {selectedNiches.length + selectedCollabTypes.length}
                  </span>
                )}
              </Button>
            </div>

            {/* Active Filters Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedNiches.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => toggleNiche(niche)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {niche}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {selectedCollabTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleCollabType(type)}
                    className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {type}
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredCreators.length}
              </span>{" "}
              creators
            </p>

            {/* Creator Grid */}
            {filteredCreators.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCreators.map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    onRequestCollab={() => setCollabCreator(creator)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Loading creators..."
                    : "No creators found matching your filters."}
                </p>
                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <CollaborationModal
        creator={collabCreator}
        open={!!collabCreator}
        onOpenChange={(open) => !open && setCollabCreator(null)}
      />
    </div>
  );
}
