import { Layout } from "@/components/Layout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  FolderOpen,
  Brain,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  Target,
  Activity,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  // Section 1: Activité de la Plateforme - Métriques des 30 derniers jours
  const platformActivity = [
    { label: "New users", value: 127, max: 150, icon: Users, color: "text-blue-600" },
    { label: "Completed projects", value: 89, max: 100, icon: CheckCircle, color: "text-green-600" },
    { label: "Successful Matches", value: 234, max: 250, icon: Brain, color: "text-purple-600" },
    { label: "Customer satisfaction", value: 96, max: 100, icon: Star, color: "text-yellow-600" },
  ];

  // Section 2: Statut des Projets - Répartition actuelle
  const projectStatus = [
    { status: "Completed", value: 89, color: "text-green-600", bgColor: "bg-green-500" },
    { status: "In progress", value: 156, color: "text-blue-600", bgColor: "bg-blue-500" },
    { status: "On hold", value: 23, color: "text-orange-600", bgColor: "bg-orange-500" },
  ];

  // Données pour les consultants top performers
  const topConsultants = [
    {
      id: "SC",
      name: "Amin ben ali",
      role: "Cybersecurity Audit",
      company: "Credit Agricole",
      score: 91,
      status: "Valid",
      avatar: undefined
    },
    {
      id: "AB", 
      name: "Ahmed Benali",
      role: "Strategie Data",
      company: "Society Generale",
      score: 89,
      status: "Révision",
      avatar: undefined
    }
  ];

  // Statistiques générales
  const generalStats = [
    { title: "Active Users", value: "1,247", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Current Projects", value: "156", change: "+8%", icon: FolderOpen, color: "text-green-600" },
    { title: "AI Matchings", value: "234", change: "+15%", icon: Brain, color: "text-purple-600" },
    { title: "Conversion Rate", value: "94.2%", change: "+2.1%", icon: Target, color: "text-orange-600" },
  ];

  return (
    <Layout>
      {/* Header personnalisé avec boutons fonctionnels */}
      <DashboardHeader />
      
      <div className="p-6 space-y-6">
        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {generalStats.map((stat, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm ml-1 text-green-600">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Activité de la Plateforme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Platform Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Key metrics for the last 30 days
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformActivity.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {item.value}
                      {item.label === "Customer satisfaction" && "%"}
                    </span>
                  </div>
                  <Progress
                    value={(item.value / item.max) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 2: Statut des Projets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Project Status
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Current distribution of projects
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectStatus.map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.bgColor}`} />
                    <span className="text-sm text-foreground">{project.status}</span>
                  </div>
                  <span className={`text-lg font-bold ${project.color}`}>
                    {project.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Section supplémentaire: Top Consultants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Top Consultants
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Consultants with the best performance
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topConsultants.map((consultant) => (
                <div key={consultant.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={consultant.avatar} />
                      <AvatarFallback className="text-sm font-medium">
                        {consultant.id}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{consultant.name}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{consultant.score}%</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {consultant.role}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {consultant.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-blue-500" />
                    <Badge 
                      className={
                        consultant.status === "Valid"
                          ? "text-green-700 bg-green-100"
                          : "text-orange-700 bg-orange-100"
                      }
                    >
                      {consultant.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section des performances récentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent AI Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                <p className="text-sm text-muted-foreground">
                  New matches today
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                <p className="text-sm text-muted-foreground">
                  Overall performance
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Average Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2.4min</div>
                <p className="text-sm text-muted-foreground">
                  AI Response Time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
