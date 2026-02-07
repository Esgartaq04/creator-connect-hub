import { Header } from "@/components/Header";

export default function Posts() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Posts
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a placeholder for your posts feed.
        </p>
      </main>
    </div>
  );
}
