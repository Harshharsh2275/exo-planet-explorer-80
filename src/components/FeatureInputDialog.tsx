import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

interface FeatureDetail {
  name: string;
  display_name: string;
  description: string;
  type: string;
  unit: string;
  default_value: number;
}

interface FeatureInputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  params: { model: string; dataset: string };
}

export const FeatureInputDialog = ({ open, onOpenChange, params }: FeatureInputDialogProps) => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState<Record<string, string>>({});
  const [requiredFeatures, setRequiredFeatures] = useState<FeatureDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !params.model || !params.dataset) return;
    
    setLoading(true);
    setRequiredFeatures([]); // Reset features
    setFeatures({}); // Reset form
    
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/get_features`, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, params})
      .then((r) => {
        console.log("API Response:", r.data); // Debug log
        
        if (r.data.error) {
          toast.error(r.data.error);
          return;
        }
        
        const featureList = r.data.feature_details || [];
        console.log("Feature List:", featureList); // Debug log
        
        if (featureList.length === 0) {
          toast.error("No features found for this model");
          return;
        }
        
        setRequiredFeatures(featureList);
        
        // Initialize form with default values or empty strings
        const initial = Object.fromEntries(
          featureList.map((f: FeatureDetail) => [
            f.name, 
            f.default_value ? String(f.default_value) : ""
          ])
        );
        setFeatures(initial);
      })
      .catch((error) => {
        console.error("Error fetching features:", error); // Debug log
        toast.error("Failed to fetch features");
      })
      .finally(() => setLoading(false));
  }, [open, params.model, params.dataset]);

  const handleChange = (fieldName: string, value: string) => {
    setFeatures((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const allFilled = Object.values(features).every((val) => val.trim() !== "");
    if (!allFilled) {
      toast.error("Please fill in all feature values");
      return;
    }

    // Convert string values to numbers for API
    const numericFeatures = Object.fromEntries(
      Object.entries(features).map(([key, val]) => [key, parseFloat(val)])
    );

    axios.post(import.meta.env.VITE_BASE_URL+"predict", {
      dataset: params.dataset,
      model: params.model,
      features
    }).then((r) => {
      localStorage.setItem('result', JSON.stringify(r.data.confidence_scores))
    })

    // Store for results page
    localStorage.setItem('features', JSON.stringify(features))
    
    toast.success("Processing prediction...");
    onOpenChange(false);
    navigate("/results");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-primary/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-cosmic bg-clip-text text-transparent">
            Enter Exoplanet Features
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Model: {params.model?.toUpperCase()} | Dataset: {params.dataset?.toUpperCase()}
          </p>
        </DialogHeader>
        
        {loading ? (
          <div className="text-center text-muted-foreground py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            Loading features...
          </div>
        ) : requiredFeatures.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">
            No features available. Please try again.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredFeatures.map((feature, idx) => (
                <div className="space-y-2" key={feature.name || idx}>
                  <Label htmlFor={feature.name} className="text-foreground font-medium">
                    {feature.display_name}
                    {feature.unit && (
                      <span className="text-muted-foreground text-xs ml-1">
                        ({feature.unit})
                      </span>
                    )}
                  </Label>
                  {feature.description && (
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  )}
                  <Input
                    id={feature.name}
                    type="number"
                    step="any"
                    placeholder={`Enter ${feature.display_name} ${feature.default_value ? `(default: ${feature.default_value})` : ''}`}
                    value={features[feature.name] ?? ""}
                    onChange={(e) => handleChange(feature.name, e.target.value)}
                    className="bg-input/50 border-primary/30"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-primary/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-primary/30"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary text-white hover:bg-primary/80"
              >
                Generate Prediction
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};