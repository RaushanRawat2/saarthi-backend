import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const CTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast("Thank you for your interest! We'll notify you when new features are available.");
      setEmail("");
    } else {
      toast("Please enter a valid email address.");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-mountain-mist to-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Begin Your <span className="bg-gradient-monastery bg-clip-text text-transparent">Spiritual Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Become a pioneer in preserving Sikkim’s spiritual legacy. Join our beta program and be part of the digital transformation journey.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-monastery mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" variant="monastery" size="lg">
              Join Beta
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            Get early access to virtual tours and digital archives
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div className="group">
            <div className="w-16 h-16 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🏔️</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Explore Sikkim</h3>
            <p className="text-muted-foreground text-sm">Discover the hidden gems of the Himalayas</p>
          </div>
          <div className="group">
            <div className="w-16 h-16 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🧘</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Find Peace</h3>
            <p className="text-muted-foreground text-sm">Connect with ancient spiritual wisdom</p>
          </div>
          <div className="group">
            <div className="w-16 h-16 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Learn History</h3>
            <p className="text-muted-foreground text-sm">Dive deep into centuries of cultural heritage</p>
          </div>
        </div>
      </div>
    </section>
  );
};