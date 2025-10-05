import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface FeatureInputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeatureInputDialog = ({ open, onOpenChange }: FeatureInputDialogProps) => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState({
    orbitalPeriod: "",
    planetRadius: "",
    stellarMagnitude: "",
    equilibriumTemp: "",
    insolationFlux: "",
    planetMass: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const allFilled = Object.values(features).every(val => val.trim() !== "");
    if (!allFilled) {
      toast.error("Please fill in all feature values");
      return;
    }

    // Store data and navigate to results
    localStorage.setItem("exoplanetFeatures", JSON.stringify(features));
    toast.success("Processing prediction...");
    onOpenChange(false);
    navigate("/results");
  };

  const handleChange = (field: keyof typeof features, value: string) => {
    setFeatures(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-primary/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-cosmic bg-clip-text text-transparent">
            Enter Exoplanet Features
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orbitalPeriod" className="text-foreground">
                Orbital Period (days)
              </Label>
              <Input
                id="orbitalPeriod"
                type="number"
                step="0.01"
                placeholder="e.g., 365.25"
                value={features.orbitalPeriod}
                onChange={(e) => handleChange("orbitalPeriod", e.target.value)}
                className="bg-input/50 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planetRadius" className="text-foreground">
                Planet Radius (Earth radii)
              </Label>
              <Input
                id="planetRadius"
                type="number"
                step="0.01"
                placeholder="e.g., 1.0"
                value={features.planetRadius}
                onChange={(e) => handleChange("planetRadius", e.target.value)}
                className="bg-input/50 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stellarMagnitude" className="text-foreground">
                Stellar Magnitude
              </Label>
              <Input
                id="stellarMagnitude"
                type="number"
                step="0.01"
                placeholder="e.g., 4.83"
                value={features.stellarMagnitude}
                onChange={(e) => handleChange("stellarMagnitude", e.target.value)}
                className="bg-input/50 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equilibriumTemp" className="text-foreground">
                Equilibrium Temperature (K)
              </Label>
              <Input
                id="equilibriumTemp"
                type="number"
                step="0.01"
                placeholder="e.g., 288"
                value={features.equilibriumTemp}
                onChange={(e) => handleChange("equilibriumTemp", e.target.value)}
                className="bg-input/50 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insolationFlux" className="text-foreground">
                Insolation Flux (Earth flux)
              </Label>
              <Input
                id="insolationFlux"
                type="number"
                step="0.01"
                placeholder="e.g., 1.0"
                value={features.insolationFlux}
                onChange={(e) => handleChange("insolationFlux", e.target.value)}
                className="bg-input/50 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planetMass" className="text-foreground">
                Planet Mass (Earth masses)
              </Label>
              <Input
                id="planetMass"
                type="number"
                step="0.01"
                placeholder="e.g., 1.0"
                value={features.planetMass}
                onChange={(e) => handleChange("planetMass", e.target.value)}
                className="bg-input/50 border-primary/30"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="cosmic" className="flex-1">
              <Sparkles className="mr-2 h-4 w-4" />
              Predict
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
