import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X, Search, RotateCcw, Calendar } from "lucide-react";
import { useState } from "react";

interface FiltresProjetsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
}

interface ProjectFilterState {
  status: string[];
  priority: string[];
  progress: [number, number];
  budget: [number, number];
  category: string[];
  technologies: string[];
  client: string;
  location: string;
  duration: [number, number];
  teamSize: [number];
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function FiltresProjetsModal({ open, onOpenChange, onApplyFilters }: FiltresProjetsModalProps) {
  const [filters, setFilters] = useState<ProjectFilterState>({
    status: [],
    priority: [],
    progress: [0, 100],
    budget: [0, 500000],
    category: [],
    technologies: [],
    client: "",
    location: "",
    duration: [1, 24],
    teamSize: [1],
    dateRange: {
      startDate: "",
      endDate: ""
    }
  });

  const [newTechnology, setNewTechnology] = useState("");

  const statusOptions = [
    "In progress", "Completed", "Pending", "Suspended", "Scheduled", "Canceled"
  ];

  const priorityOptions = [
    "High", "Medium", "Low", "Critical", "Urgent"
  ];

  const categoryOptions = [
    "Transformation Digitale", "Data & Analytics", "Healthcare", "Mobile", 
    "Web Development", "Cloud Migration", "Cybersécurité", "E-commerce",
    "Intelligence Artificielle", "DevOps", "Blockchain", "IoT"
  ];

  const technologyOptions = [
    "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "AWS", "Azure",
    "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "MySQL", "Redis",
    "GraphQL", "REST API", "Machine Learning", "TensorFlow", "Django", "Flask"
  ];

  const handleStatusChange = (status: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      status: checked 
        ? [...prev.status, status]
        : prev.status.filter(s => s !== status)
    }));
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      priority: checked 
        ? [...prev.priority, priority]
        : prev.priority.filter(p => p !== priority)
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      category: checked 
        ? [...prev.category, category]
        : prev.category.filter(c => c !== category)
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !filters.technologies.includes(newTechnology.trim())) {
      setFilters(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: [],
      priority: [],
      progress: [0, 100],
      budget: [0, 500000],
      category: [],
      technologies: [],
      client: "",
      location: "",
      duration: [1, 24],
      teamSize: [1],
      dateRange: {
        startDate: "",
        endDate: ""
      }
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Advanced Filters - Projects
          </DialogTitle>
          <DialogDescription>
          Refine your project search with detailed criteria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Statut */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Project Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {statusOptions.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={filters.status.includes(status)}
                      onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                    />
                    <Label htmlFor={`status-${status}`} className="text-sm">
                      {status}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Priorité */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Priority</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorityOptions.map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${priority}`}
                      checked={filters.priority.includes(priority)}
                      onCheckedChange={(checked) => handlePriorityChange(priority, checked as boolean)}
                    />
                    <Label htmlFor={`priority-${priority}`} className="text-sm">
                      {priority}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progression */}
            <div className="space-y-3">
              <Label>Progress: {filters.progress[0]}% - {filters.progress[1]}%</Label>
              <Slider
                value={filters.progress}
                onValueChange={(value) => setFilters(prev => ({ ...prev, progress: value as [number, number] }))}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <Label>Budget: {formatCurrency(filters.budget[0])} - {formatCurrency(filters.budget[1])}</Label>
              <Slider
                value={filters.budget}
                onValueChange={(value) => setFilters(prev => ({ ...prev, budget: value as [number, number] }))}
                max={1000000}
                min={0}
                step={10000}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Durée */}
            <div className="space-y-3">
              <Label>Duration: {filters.duration[0]} - {filters.duration[1]} mois</Label>
              <Slider
                value={filters.duration}
                onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value as [number, number] }))}
                max={36}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            {/* Taille d'équipe */}
            <div className="space-y-3">
              <Label>Minimum team size: {filters.teamSize[0]} consultants</Label>
              <Slider
                value={filters.teamSize}
                onValueChange={(value) => setFilters(prev => ({ ...prev, teamSize: value as [number] }))}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client */}
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
                placeholder="Ex: Credit Agricole, BNP Paribas..."
              />
            </div>

            {/* Localisation */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ex: Paris, Lyon, Remote..."
              />
            </div>
          </div>

          {/* Plage de dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Project period
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={filters.dateRange.startDate}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, startDate: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={filters.dateRange.endDate}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, endDate: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Catégories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Project categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryOptions.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.category.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <div className="space-y-3">
            <Label>Technologies used</Label>
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
              />
              <Button onClick={addTechnology} size="sm">
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologyOptions.slice(0, 15).map((tech) => (
                <Badge
                  key={tech}
                  variant={filters.technologies.includes(tech) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (filters.technologies.includes(tech)) {
                      removeTechnology(tech);
                    } else {
                      setFilters(prev => ({ ...prev, technologies: [...prev.technologies, tech] }));
                    }
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            {filters.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm font-medium">Selected:</span>
                {filters.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
              </Button>
              <Button onClick={handleApply}>
                <Search className="h-4 w-4 mr-2" />
                Apply filters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
