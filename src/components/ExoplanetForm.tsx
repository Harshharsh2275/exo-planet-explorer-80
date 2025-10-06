import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Rocket, Brain, Network, TrendingUp, Cpu } from "lucide-react";
import axios from "axios"

interface ExoplanetFormProps {
  onSubmit: (modelName: string, datasetName: string) => void;
}

export const ExoplanetForm = ({ onSubmit }: ExoplanetFormProps) => {
  const [model, setModel] = useState("");
  const [dataset, setDataset] = useState("");
  const [modelDescriptions, setModelDescriptions] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model && dataset) {
      onSubmit(model, dataset);
    }
  };

  useEffect(() => {
      axios.get(import.meta.env.VITE_BASE_URL+"models").then((r) => setModelDescriptions(r.data.models));
  }, [])

  const selectedModel = model ? Object.keys(modelDescriptions).map(md => {
    if(modelDescriptions[md].model_type == model) return modelDescriptions[md];
    return null
  }) : null;

  return (
    <div className="flex gap-8 max-w-6xl w-full animate-fade-in">
      {/* Left Side - Form */}
      <Card className="flex-1 p-8 bg-card/40 backdrop-blur-xl border-primary/20 shadow-cosmic">
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
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border z-50">
              { Object.keys(modelDescriptions).map((model, idx) => {
                console.log(model)
                return (
                  <SelectItem value={modelDescriptions[model].model_type} key={idx}>{modelDescriptions[model].title}</SelectItem>
                )
              }) }
                
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
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border z-50">
                <SelectItem value="k2pandc">Kepler 2 Mission Data</SelectItem>
                <SelectItem value="cumi">Kepler 1 Mission Data</SelectItem>
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

      {/* Right Side - Model Description */}
      <Card className="flex-1 p-8 bg-card/40 backdrop-blur-xl border-accent/20 shadow-cosmic">
        {selectedModel ? 
        selectedModel.map(sm => {
          if(sm != null) {
            // console.log(sm);
            return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <sm.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{sm.title}</h3>
                <p className="text-sm text-accent">Accuracy: {sm.accuracy}</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {sm.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Key Features:</h4>
              <ul className="space-y-2">
                {sm.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                This model has been trained on thousands of confirmed exoplanets and validated 
                against real-world astronomical observations.
              </p>
            </div>
          </div>
        ) 
          }
        }) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Select a Model</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Choose a machine learning model from the dropdown to view its detailed 
                description, accuracy metrics, and key features.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
