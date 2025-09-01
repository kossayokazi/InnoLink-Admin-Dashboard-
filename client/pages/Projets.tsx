import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiltresProjetsModal } from "@/components/FiltresProjetsModal";
import { NouveauProjetModal } from "@/components/NouveauProjetModal";
import { VoirProjetModal } from "@/components/VoirProjetModal";
import { ModifierProjetModal } from "@/components/ModifierProjetModal";
import { useToast } from "@/hooks/use-toast";
import { 
  FolderOpen, 
  Search, 
  Filter, 
  Plus,
  Calendar,
  Users,
  Clock,
  Euro,
  MapPin,
  TrendingUp,
  MoreHorizontal,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Play,
  Pause
} from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: "In Progress" | "Completed" | "On hold" | "Suspended" | "Planned";
  priority: "High" | "Average" | "Low";
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

export default function Projets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFiltresProjetsOpen, setIsFiltresProjetsOpen] = useState(false);
  const [isNouveauProjetOpen, setIsNouveauProjetOpen] = useState(false);
  const [isVoirProjetOpen, setIsVoirProjetOpen] = useState(false);
  const [isModifierProjetOpen, setIsModifierProjetOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Transformation Digitale Banque",
      description: "Complete migration of banking systems to the cloud with advanced security",
      client: "Credit Agricole",
      status: "In Progress",
      priority: "High",
      progress: 75,
      budget: 250000,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      location: "Paris, France",
      consultants: [
        { id: "1", name: "Sophie Chen", role: "Expert Cybersecurity" },
        { id: "2", name: "Marc Durand", role: "Cloud Architect" }
      ],
      technologies: ["AWS", "Kubernetes", "Cybersecurity", "Microservices"],
      category: " Digital Transformation",
      estimatedHours: 1200,
      completedHours: 900
    },
    {
      id: "2",
      name: "E-commerce Data Strategy",
      description: "Implementation of a data analysis platform to optimize sales",
      client: "Societe Generale",
      status: "Completed",
      priority: "Average",
      progress: 100,
      budget: 180000,
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      location: "Lyon, France",
      consultants: [
        { id: "3", name: "Ahmed Benali", role: "Data strategist" },
        { id: "4", name: "Lisa Wang", role: "Data Scientist" }
      ],
      technologies: ["Python", "Machine Learning", "BigQuery", "Tableau"],
      category: "Data & Analytics",
      estimatedHours: 800,
      completedHours: 800
    },
    {
      id: "3",
      name: "Migration Cloud Healthcare",
      description: "Secure migration of patient data to a GDPR-compliant cloud infrastructure",
      client: "Hôpital Saint-Louis",
      status: "On hold",
      priority: "High",
      progress: 25,
      budget: 320000,
      startDate: "2024-03-01",
      endDate: "2024-09-30",
      location: "Marseille, France",
      consultants: [
        { id: "5", name: "Marie Dubois", role: "Architecte Cloud" }
      ],
      technologies: ["Azure", "Healthcare APIs", "GDPR", "DevSecOps"],
      category: "Healthcare",
      estimatedHours: 1500,
      completedHours: 375
    },
    {
      id: "4",
      name: "Application Mobile Startup",
      description: "Development of a mobile application for a fintech startup",
      client: "FinTech Innov",
      status: "Planned",
      priority: "Low",
      progress: 0,
      budget: 95000,
      startDate: "2024-04-15",
      endDate: "2024-08-15",
      location: "Toulouse, France",
      consultants: [
        { id: "6", name: "Laurent Martin", role: "Mobile Developer" }
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
      category: "Mobile",
      estimatedHours: 600,
      completedHours: 0
    }
  ]);

  const stats = [
    {
      title: "Active Projects",
      value: projects.filter(p => p.status === "In Progress").length.toString(),
      change: "+5",
      icon: FolderOpen,
      color: "text-blue-600"
    },
    {
      title: "Success rate",
      value: "94%",
      change: "+3%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Total Budget",
      value: formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0)),
      change: "+12%",
      icon: Euro,
      color: "text-purple-600"
    },
    {
      title: "Assigned Consultants",
      value: new Set(projects.flatMap(p => p.consultants.map(c => c.id))).size.toString(),
      change: "+8",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    toast({
      title: "Filters applied",
      description: "Advanced filters have been successfully applied.",
    });
  };

  const handleSaveProject = (project: any) => {
    setProjects(prev => [...prev, project]);
    toast({
      title: "Project created",
      description: `${project.name} was successfully created.`,
    });
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
    toast({
      title: "Modified project",
      description: `${updatedProject.name} has been successfully modified.`,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast({
      title: "Project deleted",
      description: `${project?.name} has been successfully deleted.`,
      variant: "destructive"
    });
  };

  const handleVoirProject = (project: Project) => {
    setSelectedProject(project);
    setIsVoirProjetOpen(true);
  };

  const handleModifierProject = (project: Project) => {
    setSelectedProject(project);
    setIsModifierProjetOpen(true);
  };

  const handleEditFromView = () => {
    setIsVoirProjetOpen(false);
    setIsModifierProjetOpen(true);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return CheckCircle;
      case "In Progress": return Play;
      case "On hold": return Pause;
      case "Suspended": return AlertCircle;
      case "Planned": return Calendar;
      default: return FolderOpen;
    }
  };

  // Appliquer tous les filtres
  const filteredProjects = projects.filter(project => {
    // Filtres de base
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

    // Filtres avancés
    let matchesAdvanced = true;
    if (Object.keys(activeFilters).length > 0) {
      if (activeFilters.status?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.status.includes(project.status);
      }
      if (activeFilters.priority?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.priority.includes(project.priority);
      }
      if (activeFilters.category?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.category.includes(project.category);
      }
      if (activeFilters.progress) {
        matchesAdvanced = matchesAdvanced && 
          project.progress >= activeFilters.progress[0] && 
          project.progress <= activeFilters.progress[1];
      }
      if (activeFilters.budget) {
        matchesAdvanced = matchesAdvanced && 
          project.budget >= activeFilters.budget[0] && 
          project.budget <= activeFilters.budget[1];
      }
      if (activeFilters.client) {
        matchesAdvanced = matchesAdvanced && 
          project.client.toLowerCase().includes(activeFilters.client.toLowerCase());
      }
      if (activeFilters.location) {
        matchesAdvanced = matchesAdvanced && 
          project.location.toLowerCase().includes(activeFilters.location.toLowerCase());
      }
      if (activeFilters.technologies?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.technologies.some((tech: string) =>
          project.technologies.some(projectTech => projectTech.toLowerCase().includes(tech.toLowerCase()))
        );
      }
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesAdvanced;
  });

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
            Management and monitoring of client projects
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFiltresProjetsOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced filters
            </Button>
            <Button 
              size="sm"
              onClick={() => setIsNouveauProjetOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, customer or description..."
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
                <option value="All">Tous les statuts</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On hold">On hold</option>
                <option value="Suspended">Suspended</option>
                <option value="Planned">Planned</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                <option value="All">All categories</option>
                <option value="Digital Transformation">Digital Transformation</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            {Object.keys(activeFilters).length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">
                  Advanced filters active
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveFilters({})}
                    className="text-blue-600"
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const StatusIcon = getStatusIcon(project.status);
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <StatusIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Status and Priority */}
                  <div className="flex gap-2 mb-4">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge className={getPriorityColor(project.priority)}>
                      Priority {project.priority}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Euro className="h-4 w-4" />
                      {formatCurrency(project.budget)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {project.completedHours}h / {project.estimatedHours}h
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(project.startDate)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                  </div>

                  {/* Consultants */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                    Consultants assigned ({project.consultants.length})
                    </p>
                    <div className="flex items-center gap-2">
                      {project.consultants.slice(0, 3).map((consultant) => (
                        <div key={consultant.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={consultant.avatar} />
                            <AvatarFallback className="text-xs">
                              {consultant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {consultant.name}
                          </span>
                        </div>
                      ))}
                      {project.consultants.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.consultants.length - 3} others
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Technology</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleVoirProject(project)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleModifierProject(project)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">
              No projects match the current search criteria.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <FiltresProjetsModal
          open={isFiltresProjetsOpen}
          onOpenChange={setIsFiltresProjetsOpen}
          onApplyFilters={handleApplyFilters}
        />

        <NouveauProjetModal
          open={isNouveauProjetOpen}
          onOpenChange={setIsNouveauProjetOpen}
          onSave={handleSaveProject}
        />

        <VoirProjetModal
          open={isVoirProjetOpen}
          onOpenChange={setIsVoirProjetOpen}
          onEdit={handleEditFromView}
          project={selectedProject}
        />

        <ModifierProjetModal
          open={isModifierProjetOpen}
          onOpenChange={setIsModifierProjetOpen}
          onSave={handleUpdateProject}
          onDelete={handleDeleteProject}
          project={selectedProject}
        />
      </div>
    </Layout>
  );
}
