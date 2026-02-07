import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { niches, collaborationTypes } from "@/data/mockData";
import { Sparkles, Youtube, Instagram, Music } from "lucide-react";
import { createCreator } from "@/services/creatorService";
import { initializeAnalytics } from "@/services/analyticsService";

const platforms = [
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "tiktok", label: "TikTok", icon: Music },
  { id: "instagram", label: "Instagram", icon: Instagram },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    niche: "",
    platforms: [] as string[],
    collaborationGoals: [] as string[],
  });

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborationGoals: prev.collaborationGoals.includes(goal)
        ? prev.collaborationGoals.filter((g) => g !== goal)
        : [...prev.collaborationGoals, goal],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const creatorId = await createCreator({
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        niche: formData.niche,
        platforms: formData.platforms,
        collaborationGoals: formData.collaborationGoals,
      });
      await initializeAnalytics(creatorId);
      navigate(`/creator/${creatorId}`);
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to create your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid =
    formData.name.trim() &&
    formData.bio.trim() &&
    formData.niche &&
    formData.platforms.length > 0 &&
    formData.collaborationGoals.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Create Your Profile
            </h1>
            <p className="mt-2 text-muted-foreground">
              Tell us about yourself and start connecting with creators
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Basic Information
              </h2>

              <div className="space-y-2">
                <Label htmlFor="name">Creator Name</Label>
                <Input
                  id="name"
                  placeholder="How should we call you?"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell other creators what you're about..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="min-h-[100px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/200 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label>Primary Content Type</Label>
                <Select
                  value={formData.niche}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, niche: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Platforms */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Your Platforms
              </h2>
              <p className="text-sm text-muted-foreground">
                Select where you create content (we'll import your stats)
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {platforms.map((platform) => (
                  <label
                    key={platform.id}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                      formData.platforms.includes(platform.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      checked={formData.platforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                      className="sr-only"
                    />
                    <platform.icon
                      className={`h-8 w-8 ${
                        formData.platforms.includes(platform.id)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        formData.platforms.includes(platform.id)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {platform.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Collaboration Goals */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Collaboration Goals
              </h2>
              <p className="text-sm text-muted-foreground">
                What kind of collaborations are you interested in?
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {collaborationTypes.map((goal) => (
                  <label
                    key={goal}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                      formData.collaborationGoals.includes(goal)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      checked={formData.collaborationGoals.includes(goal)}
                      onCheckedChange={() => toggleGoal(goal)}
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full text-base"
              disabled={!isValid || isSubmitting}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {isSubmitting ? "Creating Profile..." : "Generate My Portfolio"}
            </Button>
            {submitError && (
              <p className="text-sm text-destructive text-center">{submitError}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
