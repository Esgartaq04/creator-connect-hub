import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [videoTypes, setVideoTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRegistering = mode === "register";
  const isFormValid = isRegistering
    ? displayName.trim() &&
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      dateOfBirth.trim() &&
      password.trim() &&
      videoTypes.length > 0
    : email.trim() && password.trim();
  const videoTypeOptions = [
    "Education",
    "Gaming",
    "Vlogs",
    "Tech",
    "Lifestyle",
    "Comedy",
    "Beauty",
    "Fitness",
    "Food",
    "Music",
    "Travel",
    "Finance",
  ];

  const toggleVideoType = (type: string) => {
    setVideoTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, {
          name: displayName,
          firstName,
          lastName,
          phone,
          dateOfBirth,
          videoTypes,
        });
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Authentication failed. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-md">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </CardTitle>
              <CardDescription>
                {mode === "login"
                  ? "Login to access your dashboard."
                  : "Sign up to access your dashboard."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegistering && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Name</Label>
                      <Input
                        id="displayName"
                        placeholder="Your display name"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        required={isRegistering}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          required={isRegistering}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          required={isRegistering}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                {isRegistering && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required={isRegistering}
                    />
                  </div>
                )}
                {isRegistering && (
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(event) => setDateOfBirth(event.target.value)}
                      required={isRegistering}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                {isRegistering && (
                  <div className="space-y-2">
                    <Label>Types of videos you make</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {videoTypes.length > 0
                            ? `${videoTypes.length} selected`
                            : "Select video types"}
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {videoTypeOptions.map((type) => (
                          <DropdownMenuCheckboxItem
                            key={type}
                            checked={videoTypes.includes(type)}
                            onCheckedChange={() => toggleVideoType(type)}
                          >
                            {type}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !isFormValid}
                >
                  {isSubmitting
                    ? "Please wait..."
                    : mode === "login"
                      ? "Login"
                      : "Create account"}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setMode("register")}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setMode("login")}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
              <div className="mt-4 text-center">
                <Link to="/" className="text-xs text-muted-foreground hover:underline">
                  Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
