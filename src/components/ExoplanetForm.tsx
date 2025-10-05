import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Rocket, Brain, Network, TrendingUp, Cpu } from "lucide-react";

interface ExoplanetFormProps {
  onSubmit: () => void;
}

const modelDescriptions = {
  "random-forest": {
    icon: Brain,
    title: "Random Forest Classifier",
    description: "An ensemble learning method that constructs multiple decision trees during training and outputs the mode of their predictions.",
    accuracy: "94.2%",
    features: [
      "Handles non-linear relationships effectively",
      "Resistant to overfitting",
      "Works well with high-dimensional data",
      "Provides feature importance rankings"
    ]
  },
  "neural-network": {
    icon: Network,
    title: "Deep Neural Network",
    description: "A multi-layered artificial neural network that learns complex patterns through backpropagation and gradient descent optimization.",
    accuracy: "96.8%",
    features: [
      "Captures complex non-linear patterns",
      "Adaptive feature learning",
      "High accuracy on large datasets",
      "Handles missing data gracefully"
    ]
  },
  "gradient-boost": {
    icon: TrendingUp,
    title: "Gradient Boosting",
    description: "A powerful ensemble technique that builds trees sequentially, where each new tree corrects errors made by previous trees.",
    accuracy: "95.5%",
    features: [
      "Excellent predictive performance",
      "Handles mixed data types",
      "Built-in feature selection",
      "Minimal data preprocessing needed"
    ]
  },
  "svm": {
    icon: Cpu,
    title: "Support Vector Machine",
    description: "A supervised learning algorithm that finds the optimal hyperplane to separate different classes in high-dimensional space.",
    accuracy: "92.7%",
    features: [
      "Effective in high-dimensional spaces",
      "Memory efficient",
      "Versatile kernel functions",
      "Robust to outliers"
    ]
  }
};

export const ExoplanetForm = ({ onSubmit }: ExoplanetFormProps) => {
  const [model, setModel] = useState("");
  const [dataset, setDataset] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model && dataset) {
      onSubmit();
    }
  };

  const selectedModel = model ? modelDescriptions[model as keyof typeof modelDescriptions] : null;

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
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border z-50">
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

      {/* Right Side - Model Description */}
      <Card className="flex-1 p-8 bg-card/40 backdrop-blur-xl border-accent/20 shadow-cosmic">
        {selectedModel ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <selectedModel.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedModel.title}</h3>
                <p className="text-sm text-accent">Accuracy: {selectedModel.accuracy}</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {selectedModel.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Key Features:</h4>
              <ul className="space-y-2">
                {selectedModel.features.map((feature, index) => (
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
        ) : (
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
