import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Brain,
  Zap,
  Shield,
  Clock,
  Target,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface AlgorithmConfig {
  id: string;
  name: string;
  enabled: boolean;
  weight: number;
  parameters: {
    threshold: number;
    learningRate: number;
    maxIterations: number;
  };
}

export default function ConfigurationIA() {
  const { toast } = useToast();

  // États initiaux pour la réinitialisation
  const initialAlgorithms: AlgorithmConfig[] = [
    {
      id: "deepmatch",
      name: "DeepMatch Pro",
      enabled: true,
      weight: 40,
      parameters: {
        threshold: 85,
        learningRate: 0.001,
        maxIterations: 1000
      }
    },
    {
      id: "skillsync",
      name: "SkillSync AI",
      enabled: true,
      weight: 35,
      parameters: {
        threshold: 80,
        learningRate: 0.002,
        maxIterations: 800
      }
    },
    {
      id: "culturefit",
      name: "CultureFit Beta",
      enabled: false,
      weight: 25,
      parameters: {
        threshold: 75,
        learningRate: 0.003,
        maxIterations: 500
      }
    }
  ];

  const initialGlobalSettings = {
    autoMatching: true,
    realTimeProcessing: true,
    confidenceThreshold: 80,
    maxCandidates: 10,
    timeoutMinutes: 5,
    retryAttempts: 3
  };

  const [algorithms, setAlgorithms] = useState<AlgorithmConfig[]>(initialAlgorithms);

  const [globalSettings, setGlobalSettings] = useState(initialGlobalSettings);

  // Fonctions de gestion
  const handleReset = () => {
    setAlgorithms(initialAlgorithms);
    setGlobalSettings(initialGlobalSettings);
    toast({
      title: "Configuration réinitialisée",
      description: "Toutes les configurations ont été remises aux valeurs par défaut.",
    });
  };

  const handleSave = () => {
    // Simulation de la sauvegarde
    toast({
      title: "Configuration sauvegardée",
      description: "Les paramètres ont été sauvegardés avec succès.",
    });
  };

  const [originalAlgorithms] = useState<AlgorithmConfig[]>([
    {
      id: "deepmatch",
      name: "DeepMatch Pro",
      enabled: true,
      weight: 40,
      parameters: {
        threshold: 85,
        learningRate: 0.001,
        maxIterations: 1000
      }
    },
    {
      id: "skillsync", 
      name: "SkillSync AI",
      enabled: true,
      weight: 35,
      parameters: {
        threshold: 80,
        learningRate: 0.002,
        maxIterations: 800
      }
    },
    {
      id: "culturefit",
      name: "CultureFit Beta",
      enabled: false,
      weight: 25,
      parameters: {
        threshold: 75,
        learningRate: 0.003,
        maxIterations: 500
      }
    }
  ]);


  const updateAlgorithmWeight = (id: string, weight: number) => {
    setAlgorithms(prev => prev.map(algo => 
      algo.id === id ? { ...algo, weight } : algo
    ));
  };

  const toggleAlgorithm = (id: string) => {
    setAlgorithms(prev => prev.map(algo => 
      algo.id === id ? { ...algo, enabled: !algo.enabled } : algo
    ));
  };

  const updateParameter = (id: string, param: string, value: number) => {
    setAlgorithms(prev => prev.map(algo => 
      algo.id === id 
        ? { ...algo, parameters: { ...algo.parameters, [param]: value } }
        : algo
    ));
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI configuration</h1>
            <p className="text-muted-foreground mt-1">
            Parameters and configuration of matching algorithms
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/matchings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Matchings
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Rest
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">AI Services</div>
                  <div className="text-sm text-green-600">Operational</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Database</div>
                  <div className="text-sm text-green-600">Connected</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Last sync</div>
                  <div className="text-sm text-muted-foreground">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Performance</div>
                  <div className="text-sm text-purple-600">94.2%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Global Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Global Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-matching">Automatic Matching</Label>
                  <p className="text-sm text-muted-foreground">
                  Automatically trigger matchings
                  </p>
                </div>
                <Switch 
                  id="auto-matching"
                  checked={globalSettings.autoMatching}
                  onCheckedChange={(checked) => 
                    setGlobalSettings(prev => ({ ...prev, autoMatching: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="realtime">Real-Time Processing</Label>
                  <p className="text-sm text-muted-foreground">
                  Immediate processing of new data
                  </p>
                </div>
                <Switch 
                  id="realtime"
                  checked={globalSettings.realTimeProcessing}
                  onCheckedChange={(checked) => 
                    setGlobalSettings(prev => ({ ...prev, realTimeProcessing: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Confidence Threshold: {globalSettings.confidenceThreshold}%</Label>
                <Slider
                  value={[globalSettings.confidenceThreshold]}
                  onValueChange={([value]) => 
                    setGlobalSettings(prev => ({ ...prev, confidenceThreshold: value }))
                  }
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-candidates">Maximum Candidates</Label>
                <Input
                  id="max-candidates"
                  type="number"
                  value={globalSettings.maxCandidates}
                  onChange={(e) => 
                    setGlobalSettings(prev => ({ ...prev, maxCandidates: parseInt(e.target.value) }))
                  }
                  min={1}
                  max={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Timeout (minutes)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={globalSettings.timeoutMinutes}
                  onChange={(e) => 
                    setGlobalSettings(prev => ({ ...prev, timeoutMinutes: parseInt(e.target.value) }))
                  }
                  min={1}
                  max={60}
                />
              </div>
            </CardContent>
          </Card>

          {/* Algorithm Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Configuration Algorithmes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {algorithms.map((algo) => (
                <div key={algo.id} className="space-y-4 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={algo.enabled}
                        onCheckedChange={() => toggleAlgorithm(algo.id)}
                      />
                      <div>
                        <h4 className="font-medium">{algo.name}</h4>
                        <Badge 
                          variant={algo.enabled ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {algo.enabled ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {algo.enabled && (
                    <div className="space-y-4 pl-8">
                      <div className="space-y-2">
                        <Label>Weight: {algo.weight}%</Label>
                        <Slider
                          value={[algo.weight]}
                          onValueChange={([value]) => updateAlgorithmWeight(algo.id, value)}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Threshold (%)</Label>
                          <Input
                            type="number"
                            value={algo.parameters.threshold}
                            onChange={(e) => 
                              updateParameter(algo.id, 'threshold', parseInt(e.target.value))
                            }
                            min={0}
                            max={100}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Learning rate</Label>
                          <Input
                            type="number"
                            step="0.001"
                            value={algo.parameters.learningRate}
                            onChange={(e) => 
                              updateParameter(algo.id, 'learningRate', parseFloat(e.target.value))
                            }
                            min={0.001}
                            max={0.01}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Max Iterations</Label>
                        <Input
                          type="number"
                          value={algo.parameters.maxIterations}
                          onChange={(e) => 
                            updateParameter(algo.id, 'maxIterations', parseInt(e.target.value))
                          }
                          min={100}
                          max={2000}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Performance Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">2.4s</div>
                <p className="text-sm text-muted-foreground">
                Average response time
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">99.2%</div>
                <p className="text-sm text-muted-foreground">
                Service availability
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">1,247</div>
                <p className="text-sm text-muted-foreground">
                Requests processed/h
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">94.8%</div>
                <p className="text-sm text-muted-foreground">
                Overall accuracy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800">Attention</h4>
                <p className="text-sm text-orange-700">
                  Changing algorithm parameters may affect performance.
                  It is recommended to test in development mode before going live.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
