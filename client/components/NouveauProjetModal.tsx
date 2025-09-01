import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  X, 
  Save, 
  FolderOpen,
  Calendar,
  Euro,
  Users,
  MapPin,
  Building,
  Target,
  Clock
} from "lucide-react";
import { useState } from "react";

interface NouveauProjetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: any) => void;
}

interface ProjectForm {
  name: string;
  description: string;
  client: string;
  budget: string;
  startDate: string;
  endDate: string;
  location: string;
  priority: "High" | "Average" | "Low";
  category: string;
  status: "Planned" | "In progress" | "Pending";
  technologies: string[];
  consultants: string[];
  estimatedHours: string;
  objectives: string[];
  deliverables: string[];
  risks: string[];
  notes: string;
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export function NouveauProjetModal({ open, onOpenChange, onSave }: NouveauProjetModalProps) {
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
    status: "Planned",
    technologies: [],
    consultants: [],
    estimatedHours: "",
    objectives: [],
    deliverables: [],
    risks: [],
    notes: ""
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");
  const [newRisk, setNewRisk] = useState("");
  const [selectedConsultants, setSelectedConsultants] = useState<string[]>([]);

  // Consultants disponibles (données simulées)
  const availableConsultants: Consultant[] = [
    { id: "1", name: "Sophie Chen", role: "Expert Cybersecurity" },
    { id: "2", name: "Ahmed Benali", role: "Stratège Data" },
    { id: "3", name: "Marie Dubois", role: "Architect Cloud" },
    { id: "4", name: "Laurent Martin", role: "Full-Stack Developer" },
    { id: "5", name: "Julie Moreau", role: "UX/UI Designer" },
    { id: "6", name: "Thomas Leroy", role: "DevOps Engineer" }
  ];

  const categoryOptions = [
    "Digital Transformation",
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

  const handleInputChange = (field: keyof ProjectForm, value: string) => {
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

  const addObjective = () => {
    if (newObjective.trim() && !formData.objectives.includes(newObjective.trim())) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }));
      setNewObjective("");
    }
  };

  const removeObjective = (objToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter(obj => obj !== objToRemove)
    }));
  };

  const addDeliverable = () => {
    if (newDeliverable.trim() && !formData.deliverables.includes(newDeliverable.trim())) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()]
      }));
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (delToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(del => del !== delToRemove)
    }));
  };

  const addRisk = () => {
    if (newRisk.trim() && !formData.risks.includes(newRisk.trim())) {
      setFormData(prev => ({
        ...prev,
        risks: [...prev.risks, newRisk.trim()]
      }));
      setNewRisk("");
    }
  };

  const removeRisk = (riskToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      risks: prev.risks.filter(risk => risk !== riskToRemove)
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
    const selectedConsultantDetails = availableConsultants.filter(c => 
      selectedConsultants.includes(c.id)
    );

    const newProject = {
      ...formData,
      id: Date.now().toString(),
      progress: 0,
      consultants: selectedConsultantDetails,
      completedHours: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    onSave(newProject);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      client: "",
      budget: "",
      startDate: "",
      endDate: "",
      location: "",
      priority: "Average",
      category: "",
      status: "Planned",
      technologies: [],
      consultants: [],
      estimatedHours: "",
      objectives: [],
      deliverables: [],
      risks: [],
      notes: ""
    });
    setSelectedConsultants([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            New Project
          </DialogTitle>
          <DialogDescription>
          Create a new project with all the necessary information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
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
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input
                    id="project-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Enterprise Cloud Migration"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => handleInputChange("client", e.target.value)}
                    placeholder="Ex: Credit Agricole"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the objectives, context and challenges of the project..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="">Select a category</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
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
                  <Label htmlFor="status">Initial status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In progress">In progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
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
                <Label htmlFor="budget">Budget (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="Ex: 250000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated-hours">Estimated hours</Label>
                <Input
                  id="estimated-hours"
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                  placeholder="Ex: 1200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date">Start date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Estimated end date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Localisation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="location">Project location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Ex: Paris, France ou Remote"
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
                  placeholder="Add technology"
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

          {/* Objectifs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Project objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Add a goal"
                  onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                />
                <Button onClick={addObjective} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="text-sm flex-1">{objective}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeObjective(objective)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Livrables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Expected deliverables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="Add a deliverable"
                  onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
                />
                <Button onClick={addDeliverable} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="text-sm flex-1">{deliverable}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDeliverable(deliverable)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Identified risks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newRisk}
                  onChange={(e) => setNewRisk(e.target.value)}
                  placeholder="Add risk"
                  onKeyPress={(e) => e.key === 'Enter' && addRisk()}
                />
                <Button onClick={addRisk} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.risks.map((risk, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded">
                    <span className="text-sm flex-1">{risk}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRisk(risk)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add notes, comments or additional information..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
            CancelCancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.name || !formData.client || !formData.description || !formData.category}
            >
              <Save className="h-4 w-4 mr-2" />
              Create the project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
