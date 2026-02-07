import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { CreatorCard } from "@/components/CreatorCard";
import { mockCreators } from "@/data/mockData";
import { ArrowRight, Sparkles, Users, BarChart3, Handshake, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CollaborationModal } from "@/components/CollaborationModal";
import type { Creator } from "@/data/mockData";

const Index = () => {
  const [collabCreator, setCollabCreator] = useState<Creator | null>(null);
  const featuredCreator = mockCreators[1]; // Maya for featured preview

  const steps = [
    {
      icon: Sparkles,
      title: "Create Your Profile",
      description: "Add your content, platforms, and collaboration preferences in minutes.",
    },
    {
      icon: BarChart3,
      title: "Track Your Growth",
      description: "See unified analytics and understand your audience across platforms.",
    },
    {
      icon: Handshake,
      title: "Find Collaborators",
      description: "Connect with creators at your level who share your vision.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Users className="h-4 w-4" />
                For Emerging Creators
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                One portfolio.
                <br />
                <span className="gradient-text">One audience.</span>
                <br />
                Better collaborations.
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Showcase your work, track your growth, and connect with creators who get you. 
                Built for creators ready to level up.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-base">
                  <Link to="/onboarding">
                    Create Your Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base">
                  <Link to="/discover">Explore Creators</Link>
                </Button>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {mockCreators.slice(0, 4).map((creator) => (
                    <img
                      key={creator.id}
                      src={creator.avatar}
                      alt={creator.name}
                      className="h-10 w-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> creators already growing together
                </p>
              </div>
            </div>

            {/* Right: Featured Creator Preview */}
            <div className="relative lg:pl-8">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 blur-2xl" />
              <div className="relative glass-card rounded-2xl p-6 animate-float">
                <div className="flex items-center gap-4">
                  <img
                    src={featuredCreator.avatar}
                    alt={featuredCreator.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{featuredCreator.name}</h3>
                    <p className="text-sm text-muted-foreground">Level {featuredCreator.level} – {featuredCreator.levelName}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary/50 p-3 text-center">
                    <p className="text-xl font-bold text-foreground">245K</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3 text-center">
                    <p className="text-xl font-bold text-foreground">34K</p>
                    <p className="text-xs text-muted-foreground">Avg Views</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3 text-center">
                    <p className="text-xl font-bold text-foreground">8.2%</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredCreator.niche.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button className="mt-4 w-full" asChild>
                  <Link to={`/creator/${featuredCreator.id}`}>View Full Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Get started in minutes and focus on what matters—creating.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative glass-card rounded-2xl p-6 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Creators CTA */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Discover Creators
              </h2>
              <p className="mt-2 text-muted-foreground">
                Find your next collaboration partner
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/discover" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCreators.slice(0, 3).map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onRequestCollab={() => setCollabCreator(creator)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Ready to grow together?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Join hundreds of creators building their audience and finding meaningful collaborations.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link to="/onboarding">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1.5">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold">CreatorHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CreatorHub. Built with ❤️ for creators.
          </p>
        </div>
      </footer>

      <CollaborationModal
        creator={collabCreator}
        open={!!collabCreator}
        onOpenChange={(open) => !open && setCollabCreator(null)}
      />
    </div>
  );
};

export default Index;
