import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { 
  Edit, 
  X, 
  Plus, 
  Save, 
  Trash2,
  FolderOpen,
  Calendar,
  Euro,
  Users,
  MapPin,
  Target,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: "In progress" | "Completed" | "Pending" | "Suspended" | "Scheduled";
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

interface ModifierProjetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: Project) => void;
  onDelete: (projectId: string) => void;
  project: Project | null;
}

interface ProjectForm {
  name: string;
  description: string;
  client: string;
  budget: string;
  startDate: string;
  endDate: string;
  location: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  status: "In progress" | "Completed" | "Pending" | "Suspended" | "Scheduled";
  technologies: string[];
  consultants: string[];
  estimatedHours: string;
  completedHours: string;
  progress: number[];
  notes: string;
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export function ModifierProjetModal({ open, onOpenChange, onSave, onDelete, project }: ModifierProjetModalProps) {
  const [formData, setFormData] = useState<ProjectForm>({
    name: "",
    description: "",
    client: "",
    budget: "",
    startDate: "",
    endDate: "",
    location: "",
    priority: "Average",
    category: "",
    status: "In progress",
    technologies: [],
    consultants: [],
    estimatedHours: "",
    completedHours: "",
    progress: [0],
    notes: ""
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [selectedConsultants, setSelectedConsultants] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Consultants disponibles
  const availableConsultants: Consultant[] = [
    { id: "1", name: "Sophie Chen", role: "Expert Cybersecurity" },
    { id: "2", name: "Ahmed Benali", role: "Stratege Data" },
    { id: "3", name: "Marie Dubois", role: "Architecte Cloud" },
    { id: "4", name: "Laurent Martin", role: "Full-Stack Developer" },
    { id: "5", name: "Julie Moreau", role: "UX/UI Designer" },
    { id: "6", name: "Thomas Leroy", role: "DevOps Engineer" }
  ];

  const categoryOptions = [
    "Transformation Digitale",
    "Data & Analytics", 
    "Healthcare",
    "Mobile",
    "Web Development",
    "Cloud Migration",
    "Cybersecurity",
    "E-commerce",
    "Artificial intelligence",
    "DevOps",
    "Blockchain",
    "IoT"
  ];

  // Charger les données du projet quand le modal s'ouvre
  useEffect(() => {
    if (project && open) {
      setFormData({
        name: project.name,
        description: project.description,
        client: project.client,
        budget: project.budget.toString(),
        startDate: project.startDate,
        endDate: project.endDate,
        location: project.location,
        priority: project.priority,
        category: project.category,
        status: project.status,
        technologies: project.technologies,
        consultants: project.consultants.map(c => c.id),
        estimatedHours: project.estimatedHours.toString(),
        completedHours: project.completedHours.toString(),
        progress: [project.progress],
        notes: ""
      });
      setSelectedConsultants(project.consultants.map(c => c.id));
    }
  }, [project, open]);

  const handleInputChange = (field: keyof ProjectForm, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const toggleConsultant = (consultantId: string) => {
    setSelectedConsultants(prev => {
      if (prev.includes(consultantId)) {
        return prev.filter(id => id !== consultantId);
      } else {
        return [...prev, consultantId];
      }
    });
  };

  const handleSave = () => {
    if (!project) return;

    const selectedConsultantDetails = availableConsultants.filter(c => 
      selectedConsultants.includes(c.id)
    );

    const updatedProject: Project = {
      ...project,
      name: formData.name,
      description: formData.description,
      client: formData.client,
      budget: parseInt(formData.budget),
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      priority: formData.priority,
      category: formData.category,
      status: formData.status,
      technologies: formData.technologies,
      consultants: selectedConsultantDetails,
      estimatedHours: parseInt(formData.estimatedHours),
      completedHours: parseInt(formData.completedHours),
      progress: formData.progress[0]
    };
    
    onSave(updatedProject);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (project) {
      onDelete(project.id);
      setShowDeleteConfirm(false);
      onOpenChange(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Edit Project
          </DialogTitle>
          <DialogDescription>
          Edit the information of {project.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Actions de danger */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-sm text-red-800">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              {!showDeleteConfirm ? (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete this project
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-red-800">
                  Are you sure you want to delete this project? This action is irreversible..
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDelete}
                    >
                      Confirm deletion
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                General information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name-edit">Project Name *</Label>
                  <Input
                    id="project-name-edit"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-edit">Client *</Label>
                  <Input
                    id="client-edit"
                    value={formData.client}
                    onChange={(e) => handleInputChange("client", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description-edit">Project Description *</Label>
                <Textarea
                  id="description-edit"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category-edit">Category *</Label>
                  <select
                    id="category-edit"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority-edit">Priority</Label>
                  <select
                    id="priority-edit"
                    value={formData.priority}
                    onChange={(e) => handleInputChange("priority", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="Low">Low</option>
                    <option value="Average">Average</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status-edit">Statuts</Label>
                  <select
                    id="status-edit"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In progress">In progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progression */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label>Progress: {formData.progress[0]}%</Label>
                <Slider
                  value={formData.progress}
                  onValueChange={(value) => handleInputChange("progress", value)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget et planning */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Budget and Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget-edit">Budget (€)</Label>
                <Input
                  id="budget-edit"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated-hours-edit">Estimated hours</Label>
                <Input
                  id="estimated-hours-edit"
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completed-hours-edit">Hours worked</Label>
                <Input
                  id="completed-hours-edit"
                  type="number"
                  value={formData.completedHours}
                  onChange={(e) => handleInputChange("completedHours", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-edit">Location</Label>
                <Input
                  id="location-edit"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date-edit">Date de début</Label>
                <Input
                  id="start-date-edit"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date-edit">Estimated end date</Label>
                <Input
                  id="end-date-edit"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Technologies used</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Ajouter une technologie"
                  onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                />
                <Button onClick={addTechnology} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Équipe */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Project Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableConsultants.map((consultant) => (
                  <div
                    key={consultant.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedConsultants.includes(consultant.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted"
                    }`}
                    onClick={() => toggleConsultant(consultant.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={consultant.avatar} />
                        <AvatarFallback className="text-xs">
                          {consultant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{consultant.name}</p>
                        <p className="text-xs text-muted-foreground">{consultant.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedConsultants.length > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">
                  Selected consultants ({selectedConsultants.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultants.map(id => {
                      const consultant = availableConsultants.find(c => c.id === id);
                      return consultant ? (
                        <Badge key={id} variant="default">
                          {consultant.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Change Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add notes about the changes made..."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.name || !formData.client || !formData.description || !formData.category}
            >
              <Save className="h-4 w-4 mr-2" />
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
