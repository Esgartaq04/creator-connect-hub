import { useState } from "react";
import { Creator, collaborationTypes } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Send } from "lucide-react";

interface CollaborationModalProps {
  creator: Creator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollaborationModal({ creator, open, onOpenChange }: CollaborationModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSelectedTypes([]);
      setMessage("");
      onOpenChange(false);
    }, 2000);
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  if (!creator) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {sent ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-accent/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-accent" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">Request Sent!</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Your collaboration request has been sent to {creator.name}.
              They'll receive a notification shortly.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">
                Request Collaboration
              </DialogTitle>
              <DialogDescription>
                Send a collaboration request to{" "}
                <span className="font-medium text-foreground">{creator.name}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              {/* Collaboration types */}
              <div>
                <Label className="text-sm font-medium">
                  What type of collaboration? (select all that apply)
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {collaborationTypes.map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2 transition-colors hover:bg-secondary has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <Checkbox
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  Your message
                </Label>
                <Textarea
                  id="message"
                  placeholder={`Hi ${creator.name}! I'd love to collaborate with you on...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 min-h-[100px] resize-none"
                />
              </div>

              {/* Send button */}
              <Button
                onClick={handleSend}
                disabled={selectedTypes.length === 0 || !message.trim()}
                className="w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Request
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
