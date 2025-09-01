import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Eye, 
  Edit, 
  Calendar, 
  Euro, 
  Clock, 
  MapPin, 
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  FileText,
  Star,
  Building
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: "In Progress" | "Completed" | "Pending" | "Suspended" | "Scheduled";
  priority: "High" | "Medium" | "Low";
  progress: number;
  budget: number;
  startDate: string;
  endDate: string;
  location: string;
  consultants: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  technologies: string[];
  category: string;
  estimatedHours: number;
  completedHours: number;
}

interface VoirProjetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  project: Project | null;
}

export function VoirProjetModal({ open, onOpenChange, onEdit, project }: VoirProjetModalProps) {
  if (!project) return null;

  // Données simulées supplémentaires
  const additionalData = {
    objectives: [
      "Migrate infrastructure to the AWS cloud",
      "Reduce infrastructure costs by 30%",
      "Improve data security",
      "Optimize application performance"
    ],
    deliverables: [
      "Complete cloud architecture",
      "Detailed migration plan",
      "Technical documentation",
      "Team training",
      "Security testing"
    ],
    risks: [
      "Team resistance to change,"
      "Complexity of legacy data migration,"
      "Dependence on cloud providers"
    ],
    milestones: [
      { name: "Analysis and design", date: "2024-02-15", status: "completed", progress: 100 },
      { name: "Development phase", date: "2024-04-30", status: "in-progress", progress: 65 },
      { name: "Testing and validation", date: "2024-06-15", status: "pending", progress: 0 },
      { name: "Deployment", date: "2024-06-30", status: "pending", progress: 0 }
    ],
    recentActivities: [
      { date: "2024-01-20", activity: "Kick-off meeting with the team", user: "Sophie Chen" },
      { date: "2024-01-18", activity: "Validation of the specifications", user: "Ahmed Benali" },
      { date: "2024-01-15", activity: "First cost estimate", user: "Marie Dubois" }
    ],
    kpis: [
      { name: "Customer satisfaction", value: 94, target: 90, unit: "%" },
      { name: "Respect for deadlines", value: 87, target: 95, unit: "%" },
      { name: "Budget used", value: 68, target: 80, unit: "%" },
      { name: "Quality deliverables", value: 92, target: 85, unit: "%" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "On hold": return "bg-yellow-100 text-yellow-800";
      case "Suspended": return "bg-red-100 text-red-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Average": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "in-progress": return "text-blue-600";
      case "pending": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Project Details
          </DialogTitle>
          <DialogDescription>
          Complete overview of {project.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête du projet */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
                  <p className="text-lg text-muted-foreground">{project.client}</p>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
                <Button onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge className={getPriorityColor(project.priority)}>
                  Priority {project.priority}
                </Badge>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{formatCurrency(project.budget)}</div>
                  <div className="text-xs text-muted-foreground">Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.completedHours}h</div>
                  <div className="text-xs text-muted-foreground">/{project.estimatedHours}h</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.consultants.length}</div>
                  <div className="text-xs text-muted-foreground">Consultants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}j
                  </div>
                  <div className="text-xs text-muted-foreground">Remainings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">General information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Customer:</strong> {project.client}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Location:</strong> {project.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Beginning:</strong> {formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Expected end:</strong> {formatDate(project.endDate)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* KPIs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalData.kpis.map((kpi, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{kpi.value}{kpi.unit}</div>
                    <div className="text-xs text-muted-foreground mb-2">{kpi.name}</div>
                    <div className="text-xs text-muted-foreground">
                    Objective: {kpi.target}{kpi.unit}
                    </div>
                    <Progress 
                      value={Math.min((kpi.value / kpi.target) * 100, 100)} 
                      className="h-1 mt-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Équipe et Technologies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Project Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.consultants.map((consultant, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={consultant.avatar} />
                        <AvatarFallback>
                          {consultant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{consultant.name}</p>
                        <p className="text-xs text-muted-foreground">{consultant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Technologies used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objectifs et Livrables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalData.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Jalons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {additionalData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        milestone.status === "completed" ? "bg-green-500" :
                        milestone.status === "in-progress" ? "bg-blue-500" : "bg-gray-300"
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{milestone.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(milestone.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                        {milestone.progress}%
                      </div>
                      <Progress value={milestone.progress} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                Identified risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {additionalData.risks.map((risk, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{risk}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activités récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {additionalData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.activity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{formatDate(activity.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
