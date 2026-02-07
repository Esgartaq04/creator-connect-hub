import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { CreatorCard } from "@/components/CreatorCard";
import { mockCreators } from "@/data/mockData";
import { ArrowRight, Sparkles, Users, BarChart3, Handshake, ChevronRight,ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CollaborationModal } from "@/components/CollaborationModal";
import type { Creator } from "@/data/mockData";

// Home Page
const Index = () => {
  const steps = [
    {
      icon: Sparkles,
      title: "Create a profile",
      description: "Showcase your work and define the collaborations you want.",
    },
    {
      icon: BarChart3,
      title: "Track Your Growth", 
      description: "See unified analytics and understand your audience across platforms.",
    },
    {
      icon: ShieldCheck,
      title: "Collaborate safely",
      description: "Log in to access verified creators and private dashboards.",
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
                Build your creator home.
                <br />
                <span className="gradient-text">Find the right collabs.</span>
                <br />
                Grow together.
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Creator Connect Hub helps you build a profile, understand your
                performance, and discover collaborators in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-base">
                  <Link to="/login">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>

            {/* Right: Preview Card */}
            <div className="relative lg:pl-8">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 blur-2xl" />
              <div className="relative glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      Your creator dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Access analytics, collabs, and profile insights.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs text-muted-foreground">Weekly views</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">48.2k</p>
                    <p className="text-xs text-accent">+12% vs last week</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs text-muted-foreground">Collab requests</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">7 pending</p>
                    <p className="text-xs text-muted-foreground">2 new today</p>
                  </div>
                </div>

                <Button className="mt-6 w-full" asChild>
                  <Link to="/login">Unlock dashboard</Link>
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
            <Link to="/login">
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
            © 2026 Quantify.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
