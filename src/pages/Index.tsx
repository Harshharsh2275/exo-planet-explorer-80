import { useState } from "react";
import { SpacePlanet } from "@/components/SpacePlanet";
import { ExoplanetForm } from "@/components/ExoplanetForm";
import { FeatureInputDialog } from "@/components/FeatureInputDialog";
import { Header } from "@/components/Header";
import StarryCursorFollower from "@/components/StarryCursorFollower";
import PlanetParticles from "@/components/PlanetParticles";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [parameters, setParameters] = useState({model: "", dataset: ""});

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* <StarryCursorFollower /> */}
      {/* Header */}
      <Header />
      
      {/* Cosmic background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      
      {/* Animated Stars effect */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/60 rounded-full animate-star-move"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 30}s`,
            }}
          />
        ))}
      </div>

      {/* Background Planet */}
      <div className="fixed left-10 bottom-10 opacity-30 pointer-events-none">
        {/* <SpacePlanet /> */}
        <PlanetParticles />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-8 lg:px-16 pt-20">
        <ExoplanetForm onSubmit={(model, dataset) => {
          setParameters({model, dataset});
          setDialogOpen(true)}} />
      </div>

      {/* Feature Input Dialog */}
      <FeatureInputDialog open={dialogOpen} params={parameters} onOpenChange={setDialogOpen} />

      {/* Info Section */}
      <div className="relative z-10 w-full px-8 lg:px-16 py-20">
        {/* Project Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
            About Kshitij
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed">
            Kshitij is an advanced exoplanet habitability prediction system that leverages machine learning 
            to analyze celestial data and determine the potential for life on distant worlds. By combining 
            cutting-edge models with comprehensive datasets, we explore the cosmic horizon in search of 
            habitable exoplanets.
          </p>
        </div>

        {/* Models & Datasets Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Models Card */}
          <div className="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-8 hover:shadow-cosmic transition-all duration-300 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-primary">Machine Learning Models</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Random Forest Classifier</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensemble learning method using multiple decision trees for robust predictions with high accuracy.
                  </p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Neural Networks</h4>
                  <p className="text-sm text-muted-foreground">
                    Deep learning architecture capable of identifying complex patterns in exoplanet characteristics.
                  </p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Support Vector Machines</h4>
                  <p className="text-sm text-muted-foreground">
                    Powerful classification algorithm optimized for high-dimensional space analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Datasets Card */}
          <div className="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-8 hover:shadow-cosmic transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-cosmic/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-accent">Datasets</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">NASA Exoplanet Archive</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive catalog with 5000+ confirmed exoplanets including orbital and physical parameters.
                  </p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Kepler Mission Data</h4>
                  <p className="text-sm text-muted-foreground">
                    High-precision photometric data from NASA's Kepler space telescope survey missions.
                  </p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Habitable Zone Gallery</h4>
                  <p className="text-sm text-muted-foreground">
                    Curated collection of potentially habitable exoplanets with detailed atmospheric data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
