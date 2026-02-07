import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ArrowRight, Sparkles, Users, BarChart3, ShieldCheck, LayoutDashboard, User } from "lucide-react";
import { useEffect, useState } from "react";

// --- Custom Animated Tree Component ---
const NetworkTree = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Positions for the "User Leaves"
  const nodes = [
    { x: 50, y: 30, delay: 600, color: "text-primary bg-primary/10" },
    { x: 20, y: 50, delay: 800, color: "text-accent bg-accent/10" },
    { x: 80, y: 50, delay: 1000, color: "text-blue-500 bg-blue-500/10" },
    { x: 35, y: 20, delay: 1200, color: "text-purple-500 bg-purple-500/10" },
    { x: 65, y: 20, delay: 1400, color: "text-green-500 bg-green-500/10" },
    { x: 10, y: 30, delay: 1600, color: "text-amber-500 bg-amber-500/10" },
    { x: 90, y: 30, delay: 1800, color: "text-red-500 bg-red-500/10" },
    // Inner nodes
    { x: 40, y: 60, delay: 900, color: "text-primary bg-primary/10" },
    { x: 60, y: 60, delay: 1100, color: "text-accent bg-accent/10" },
  ];

  return (
    <div className={`relative w-full aspect-square max-w-md mx-auto transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent blur-3xl rounded-full" />

      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Trunk & Branches (SVG Paths) */}
        <g 
          className="stroke-muted-foreground/40" 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="round"
        >
           {/* Main Trunk */}
           <path d="M50 100 L50 70" className="animate-grow origin-bottom" style={{ animationDuration: '1s' }} />
           
           {/* Branches Left */}
           <path d="M50 70 Q40 50 20 50" className="animate-grow" style={{ animationDelay: '0.2s', transformOrigin: '50% 70%' }} />
           <path d="M45 60 Q30 40 35 20" className="animate-grow" style={{ animationDelay: '0.4s', transformOrigin: '45% 60%' }} />
           <path d="M40 50 Q20 40 10 30" className="animate-grow" style={{ animationDelay: '0.5s', transformOrigin: '40% 50%' }} />

           {/* Branches Right */}
           <path d="M50 70 Q60 50 80 50" className="animate-grow" style={{ animationDelay: '0.3s', transformOrigin: '50% 70%' }} />
           <path d="M55 60 Q70 40 65 20" className="animate-grow" style={{ animationDelay: '0.5s', transformOrigin: '55% 60%' }} />
           <path d="M60 50 Q80 40 90 30" className="animate-grow" style={{ animationDelay: '0.6s', transformOrigin: '60% 50%' }} />
           
           {/* Top Branch */}
           <path d="M50 70 L50 30" className="animate-grow" style={{ animationDelay: '0.4s', transformOrigin: '50% 70%' }} />
        </g>

        {/* Connecting Lines (Digital Network Effect) */}
        <g className="stroke-primary/20" strokeWidth="0.5" strokeDasharray="2 2">
            <line x1="20" y1="50" x2="35" y2="20" className="animate-fade-in" style={{ animationDelay: '2s' }} />
            <line x1="80" y1="50" x2="65" y2="20" className="animate-fade-in" style={{ animationDelay: '2.2s' }} />
            <line x1="50" y1="30" x2="35" y2="20" className="animate-fade-in" style={{ animationDelay: '2.4s' }} />
            <line x1="50" y1="30" x2="65" y2="20" className="animate-fade-in" style={{ animationDelay: '2.5s' }} />
        </g>
      </svg>

      {/* User "Leaves" */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className={`absolute flex items-center justify-center w-10 h-10 -ml-5 -mt-5 rounded-full shadow-lg border border-white/10 backdrop-blur-md transition-all duration-700 ease-out ${node.color}`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1) translateY(0)' : 'scale(0) translateY(10px)',
            transitionDelay: `${node.delay}ms`
          }}
        >
          <User className="w-5 h-5" />
        </div>
      ))}
      
     

    </div>
  );
};

// --- Main Index Page ---

const isLoggedIn = true; // Toggle this to test Auth states

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
                {isLoggedIn ? (
                  <Button size="lg" asChild className="text-base">
                    <Link to="/dashboard">
                      Go to Dashboard
                      <LayoutDashboard className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild className="text-base">
                      <Link to="/onboarding">
                        Get started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="text-base">
                      <Link to="/login">Log in</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Right: Network Tree Animation */}
            <div className="relative lg:pl-8 flex items-center justify-center">
               <NetworkTree />
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

      {/* Footer CTA (Only if NOT logged in) */}
      {!isLoggedIn && (
        <section className="py-16 gradient-hero">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Ready to grow together?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Join hundreds of creators building their audience.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link to="/onboarding">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      )}

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
            © 2026 CreatorHub.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;