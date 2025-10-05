import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const datasets = [
    { name: "NASA Exoplanet Archive", url: "#nasa-archive" },
    { name: "Kepler Mission Data", url: "#kepler-data" },
    { name: "Habitable Zone Gallery", url: "#habitable-zone" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Kshitij
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Discover habitable worlds beyond our solar system
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="glass" size="icon" className="relative group">
              <Download className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-card/95 backdrop-blur-xl border-border z-50"
          >
            <div className="px-2 py-1.5">
              <p className="text-sm font-semibold text-foreground mb-1">Download Datasets</p>
              <p className="text-xs text-muted-foreground">Access our curated data</p>
            </div>
            {datasets.map((dataset, index) => (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
                onClick={() => {
                  console.log(`Downloading: ${dataset.name}`);
                  // Add actual download logic here
                }}
              >
                <Download className="mr-2 h-4 w-4 text-primary" />
                <span className="text-foreground">{dataset.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
