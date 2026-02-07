import { Header } from "@/components/Header";
import { mockCreators } from "@/data/mockData"; // Using your existing mock data
import { Link } from "react-router-dom";
import { UserMinus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Network() {
  // In a real app, you'd filter this by the current user's actual connections
  const myConnections = mockCreators.slice(1, 7); 

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-bold">My Network</h1>
          <p className="text-muted-foreground">Manage your professional collaborations and connections.</p>
        </header>

        {/* Search Section */}
        <div className="mb-10">
        {/* The border-b creates the line you wanted below the search bar */}
            <div className="flex w-full border-b border-border pb-6"> 
                <div className="flex w-full">
                    <input 
                        type="text" 
                        placeholder="Search connections..." 
                        className="flex-1 bg-transparent py-3 px-3 outline-none border border-border rounded-l-lg focus:ring-0" 
                        /* px-6: Moves the "flashing bar" and text in from the left 
                        focus:ring-0: Ensures no blue boundary appears on click
                        */
                    />
                    <button className="bg-primary text-primary-foreground px-8 rounded-r-lg font-medium hover:opacity-90 transition-opacity">
                        Search
                    </button>
                </div>
            </div>
        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myConnections.map((person) => (
            <div key={person.id} className="glass-card rounded-2xl p-5 flex flex-col items-center border border-border bg-card">
              <img 
                src={person.avatar} 
                alt={person.name} 
                className="h-20 w-20 rounded-full object-cover mb-4 ring-2 ring-primary/10" 
              />
              <h3 className="font-bold text-lg">{person.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{person.niche[0]} Creator</p>
              
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 text-xs" asChild>
                  <Link to={`/portfolio/${person.id}`}>View Profile</Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}