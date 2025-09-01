import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { NouveauMatchingModal } from "@/components/NouveauMatchingModal";
import { 
  Brain, 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Play,
  Pause,
  Settings
} from "lucide-react";
import { useState } from "react";

interface MatchingResult {
  id: string;
  projectName: string;
  consultant: string;
  matchScore: number;
  status: "In Progress" | "Completed" | "On hold" | "Failure";
  algorithm: string;
  createdAt: string;
  tags: string[];
}

interface Algorithm {
  id: string;
  name: string;
  description: string;
  successRate: number;
  totalMatches: number;
  status: "Active" | "Inactive" | "Test";
  lastUpdated: string;
}

export default function MatchingsIA() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isNouveauMatchingOpen, setIsNouveauMatchingOpen] = useState(false);

  const algorithms: Algorithm[] = [
    {
      id: "algo1",
      name: "DeepMatch Pro",
      description: "Deep learning algorithm for expert matching",
      successRate: 94.2,
      totalMatches: 1247,
      status: "Active",
      lastUpdated: "2h ago"
    },
    {
      id: "algo2", 
      name: "SkillSync AI",
      description: "Matching based on skills and experience",
      successRate: 89.7,
      totalMatches: 892,
      status: "Active",
      lastUpdated: "5h ago"
    },
    {
      id: "algo3",
      name: "CultureFit Beta",
      description: "cultural compatibility analysis (in testing)",
      successRate: 78.3,
      totalMatches: 156,
      status: "Test",
      lastUpdated: "1d ago"
    }
  ];

  const matchingResults: MatchingResult[] = [
    {
      id: "m1",
      projectName: "Transformation Digitale Banque",
      consultant: "Mariem Hafidi",
      matchScore: 96,
      status: "Completed",
      algorithm: "DeepMatch Pro",
      createdAt: "2024-01-15",
      tags: ["Cybersecurity", "Fintech", "Senior"]
    },
    {
      id: "m2", 
      projectName: "E-commerce Data Strategy",
      consultant: "Ahmed Benali",
      matchScore: 91,
      status: "In Progress",
      algorithm: "SkillSync AI",
      createdAt: "2024-01-14",
      tags: ["Data Science", "E-commerce", "Expert"]
    },
    {
      id: "m3",
      projectName: "Migration Cloud Healthcare",
      consultant: "Marie Dubois",
      matchScore: 88,
      status: "On hold",
      algorithm: "DeepMatch Pro",
      createdAt: "2024-01-13",
      tags: ["Cloud", "Healthcare", "DevOps"]
    },
    {
      id: "m4",
      projectName: "Startup Security Audit",
      consultant: "Karima Warteni", 
      matchScore: 72,
      status: "Failure",
      algorithm: "CultureFit Beta",
      createdAt: "2024-01-12",
      tags: ["Security", "Startup", "Junior"]
    }
  ];

  const metrics = [
    {
      title: "Active Matchings",
      value: "24",
      change: "+15%",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "Success Rate",
      value: "92.3%", 
      change: "+8.1%",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Average Time",
      value: "2.4min",
      change: "-12%",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Active Consultants",
      value: "156",
      change: "+23%",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "On hold": return "bg-yellow-100 text-yellow-800";
      case "Failure": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlgoStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Test": return "bg-yellow-100 text-yellow-800"; 
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResults = matchingResults.filter(result => {
    const matchesSearch = result.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.consultant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || result.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Matchings</h1>
            <p className="text-muted-foreground mt-1">
              Management and analysis of correspondences by artificial intelligence
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/configuration-ia">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Link>
            </Button>
            <Button size="sm" onClick={() => setIsNouveauMatchingOpen(true)}>
              <Play className="h-4 w-4 mr-2" />
                New Matching
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {metric.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm ml-1 text-green-600">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${metric.color}`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Algorithm Performance */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                AI Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {algorithms.map((algo) => (
                <div key={algo.id} className="space-y-3 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{algo.name}</h4>
                    <Badge className={getAlgoStatusColor(algo.status)}>
                      {algo.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {algo.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Success rate</span>
                      <span className="font-medium">{algo.successRate}%</span>
                    </div>
                    <Progress value={algo.successRate} className="h-1" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{algo.totalMatches} matchings</span>
                    <span>{algo.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Matching Results */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Matching Results
              </CardTitle>
              <div className="flex gap-2 mt-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by project or consultant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="All">All statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On hold">On hold</option>
                  <option value="Failure">Failure</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-sm">{result.projectName}</h4>
                        <Badge className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {result.consultant}
                        </span>
                        <span className="flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          {result.algorithm}
                        </span>
                        <span>{result.createdAt}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {result.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {result.matchScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">234</div>
                <p className="text-sm text-muted-foreground">
                Successful Matches this Month
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2.4min</div>
                <p className="text-sm text-muted-foreground">
                Average processing time
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">96.8%</div>
                <p className="text-sm text-muted-foreground">
                Accuracy of algorithms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NouveauMatchingModal
        open={isNouveauMatchingOpen}
        onOpenChange={setIsNouveauMatchingOpen}
      />
    </Layout>
  );
}
