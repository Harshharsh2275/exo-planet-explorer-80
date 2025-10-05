import { useState } from "react";
import { SpacePlanet } from "@/components/SpacePlanet";
import { ExoplanetForm } from "@/components/ExoplanetForm";
import { FeatureInputDialog } from "@/components/FeatureInputDialog";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      
      {/* Stars effect */}
      <div className="fixed inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/40 rounded-full animate-glow-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-between px-8 lg:px-16 gap-12">
        {/* Left side - Planet */}
        <div className="flex-1 flex items-center justify-start animate-fade-in">
          <SpacePlanet />
        </div>

        {/* Right side - Form */}
        <div className="flex-1 max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <ExoplanetForm onSubmit={() => setDialogOpen(true)} />
        </div>
      </div>

      {/* Feature Input Dialog */}
      <FeatureInputDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Title overlay */}
      <div className="fixed top-8 left-8 animate-fade-in">
        <h1 className="text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
          Exoplanet
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover habitable worlds beyond our solar system
        </p>
      </div>
    </div>
  );
};

export default Index;
