import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, X } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState<any>(null);
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  useEffect(() => {
    const storedFeatures = localStorage.getItem("exoplanetFeatures");
    if (!storedFeatures) {
      navigate("/");
      return;
    }

    const parsedFeatures = JSON.parse(storedFeatures);
    setFeatures(parsedFeatures);

    // Simulate prediction (in real app, this would be an API call)
    setTimeout(() => {
      // Simple mock prediction based on inputs
      const isHabitable = 
        parseFloat(parsedFeatures.equilibriumTemp) > 200 && 
        parseFloat(parsedFeatures.equilibriumTemp) < 350 &&
        parseFloat(parsedFeatures.planetRadius) > 0.5 &&
        parseFloat(parsedFeatures.planetRadius) < 2.5;
      
      setPrediction(isHabitable);
      setConfidence(Math.random() * 30 + 70); // 70-100% confidence
    }, 1500);
  }, [navigate]);

  if (!features) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="p-8 bg-card/40 backdrop-blur-xl border-primary/20 shadow-cosmic">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-6">
            Prediction Results
          </h1>

          {prediction === null ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Analyzing exoplanet features...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-card to-muted/20 rounded-lg border border-primary/20">
                <div className={`p-4 rounded-full ${prediction ? 'bg-cosmic/20' : 'bg-destructive/20'}`}>
                  {prediction ? (
                    <Check className="h-8 w-8 text-cosmic" />
                  ) : (
                    <X className="h-8 w-8 text-destructive" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {prediction ? "Potentially Habitable" : "Not Habitable"}
                  </h2>
                  <p className="text-muted-foreground">
                    Confidence: {confidence.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-muted/20">
                  <h3 className="text-sm text-muted-foreground mb-1">Orbital Period</h3>
                  <p className="text-lg font-semibold">{features.orbitalPeriod} days</p>
                </Card>
                <Card className="p-4 bg-muted/20">
                  <h3 className="text-sm text-muted-foreground mb-1">Planet Radius</h3>
                  <p className="text-lg font-semibold">{features.planetRadius} R⊕</p>
                </Card>
                <Card className="p-4 bg-muted/20">
                  <h3 className="text-sm text-muted-foreground mb-1">Equilibrium Temp</h3>
                  <p className="text-lg font-semibold">{features.equilibriumTemp} K</p>
                </Card>
                <Card className="p-4 bg-muted/20">
                  <h3 className="text-sm text-muted-foreground mb-1">Planet Mass</h3>
                  <p className="text-lg font-semibold">{features.planetMass} M⊕</p>
                </Card>
              </div>

              <div className="p-4 bg-muted/10 rounded-lg border border-primary/10">
                <h3 className="font-semibold mb-2">Analysis Summary</h3>
                <p className="text-muted-foreground text-sm">
                  {prediction 
                    ? "Based on the provided features, this exoplanet shows characteristics consistent with potentially habitable conditions. The equilibrium temperature falls within the habitable zone range, and the planet's size suggests it could maintain an atmosphere."
                    : "The analyzed features indicate conditions outside the habitable zone parameters. The planet's characteristics suggest it may not support life as we know it."
                  }
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Results;
