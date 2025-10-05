import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Rocket } from "lucide-react";

interface ExoplanetFormProps {
  onSubmit: () => void;
}

export const ExoplanetForm = ({ onSubmit }: ExoplanetFormProps) => {
  const [model, setModel] = useState("");
  const [dataset, setDataset] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model && dataset) {
      onSubmit();
    }
  };

  return (
    <Card className="p-8 bg-card/40 backdrop-blur-xl border-primary/20 shadow-cosmic">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-2">
          Exoplanet Predictor
        </h2>
        <p className="text-muted-foreground">
          Select your model and dataset to begin prediction
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model" className="text-foreground font-medium">
            Model Selection
          </Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model" className="bg-input/50 border-primary/30 focus:border-primary">
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random-forest">Random Forest</SelectItem>
              <SelectItem value="neural-network">Neural Network</SelectItem>
              <SelectItem value="gradient-boost">Gradient Boosting</SelectItem>
              <SelectItem value="svm">Support Vector Machine</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataset" className="text-foreground font-medium">
            Dataset Selection
          </Label>
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger id="dataset" className="bg-input/50 border-primary/30 focus:border-primary">
              <SelectValue placeholder="Choose a dataset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kepler">Kepler Mission Data</SelectItem>
              <SelectItem value="tess">TESS Mission Data</SelectItem>
              <SelectItem value="combined">Combined Dataset</SelectItem>
              <SelectItem value="custom">Custom Dataset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          variant="cosmic" 
          size="lg" 
          className="w-full"
          disabled={!model || !dataset}
        >
          <Rocket className="mr-2 h-5 w-5" />
          Fill Data Points
        </Button>
      </form>
    </Card>
  );
};
