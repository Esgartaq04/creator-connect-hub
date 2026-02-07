import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, LayoutDashboard, Compass, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/discover", label: "Discover", icon: Compass },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/messaging", label: "Messaging", icon: User },
    { href: "/posts", label: "Posts", icon: LayoutDashboard },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-lg bg-primary p-1.5 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            CreatorHub
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link
                  to={user.creatorId ? `/creator/${user.creatorId}` : "/onboarding"}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {user.creatorId ? "My Profile" : "Create Profile"}
                </Link>
              </Button>
              <Button size="sm" variant="outline" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link to="/login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </>
          )}
          {/* Theme Toggle Button */}
          <ThemeToggle />
          
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link to="/creator/1" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              My Profile
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/onboarding">Create Profile</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}