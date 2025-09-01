import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Search, 
  Plus, 
  Brain, 
  Users, 
  Target,
  Clock,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

interface NouveauMatchingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  skills: string[];
  rating: number;
  availability: "Available" | "Busy" | "On vacation";
  matchScore?: number;
}

interface ProjectForm {
  name: string;
  description: string;
  client: string;
  budget: string;
  duration: string;
  location: string;
  requiredSkills: string[];
  priority: "High" | "Medium" | "Low";
}

export function NouveauMatchingModal({ open, onOpenChange }: NouveauMatchingModalProps) {
  const [step, setStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    name: "",
    description: "",
    client: "",
    budget: "",
    duration: "",
    location: "",
    requiredSkills: [],
    priority: "Average"
  });

  const [suggestedConsultants, setSuggestedConsultants] = useState<Consultant[]>([]);

  const availableConsultants: Consultant[] = [
    {
      id: "1",
      name: "Sophie Chen",
      role: "Expert Cybersecurity",
      skills: ["Cybersecurity", "Audit", "GDPR", "Compliance"],
      rating: 4.9,
      availability: "Available",
      matchScore: 96
    },
    {
      id: "2",
      name: "Ahmed Benali",
      role: "Stratege Data",
      skills: ["Data Science", "Machine Learning", "Python", "SQL"],
      rating: 4.7,
      availability: "Available",
      matchScore: 91
    },
    {
      id: "3",
      name: "Marie Dubois",
      role: "Architecte Cloud",
      skills: ["AWS", "Azure", "DevOps", "Kubernetes"],
      rating: 4.8,
      availability: "Available",
      matchScore: 88
    },
    {
      id: "4",
      name: "Laurent Martin",
      role: "Full-Stack Developer ",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      rating: 4.2,
      availability: "Busy",
      matchScore: 72
    }
  ];

  const handleProjectFormChange = (field: keyof ProjectForm, value: string) => {
    setProjectForm(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !projectForm.requiredSkills.includes(newSkill.trim())) {
      setProjectForm(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProjectForm(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulation de la recherche IA
    setTimeout(() => {
      const matches = availableConsultants
        .map(consultant => ({
          ...consultant,
          matchScore: Math.floor(Math.random() * 40 + 60) // Score entre 60-100
        }))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
      setSuggestedConsultants(matches);
      setIsSearching(false);
      setStep(2);
    }, 2000);
  };

  const handleCreateMatching = () => {
    // Logique de création du matching
    console.log("Creation of matching:", { projectForm, suggestedConsultants });
    onOpenChange(false);
    setStep(1);
    setProjectForm({
      name: "",
      description: "",
      client: "",
      budget: "",
      duration: "",
      location: "",
      requiredSkills: [],
      priority: "Average"
    });
    setSuggestedConsultants([]);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "bg-green-100 text-green-800";
      case "Busy": return "bg-red-100 text-red-800";
      case "On leave": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            New AI Matching
          </DialogTitle>
          <DialogDescription>
          Create a new match between a project and consultants using our AI
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>
              1
            </div>
            <span>Project</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>
              2
            </div>
            <span>Matching</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project name *</Label>
                <Input
                  id="project-name"
                  value={projectForm.name}
                  onChange={(e) => handleProjectFormChange("name", e.target.value)}
                  placeholder="Ex: Migration Cloud Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Input
                  id="client"
                  value={projectForm.client}
                  onChange={(e) => handleProjectFormChange("client", e.target.value)}
                  placeholder="Ex: Societe Generale"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={projectForm.description}
                onChange={(e) => handleProjectFormChange("description", e.target.value)}
                placeholder="Describe the objectives, context and challenges of the project..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (€)</Label>
                <Input
                  id="budget"
                  value={projectForm.budget}
                  onChange={(e) => handleProjectFormChange("budget", e.target.value)}
                  placeholder="Ex: 250000"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (mois)</Label>
                <Input
                  id="duration"
                  value={projectForm.duration}
                  onChange={(e) => handleProjectFormChange("duration", e.target.value)}
                  placeholder="Ex: 6"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={projectForm.priority}
                  onChange={(e) => handleProjectFormChange("priority", e.target.value as any)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="Bass">Bass</option>
                  <option value="Average">Average</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={projectForm.location}
                onChange={(e) => handleProjectFormChange("location", e.target.value)}
                placeholder="Ex: Paris, France"
              />
            </div>

            <div className="space-y-2">
              <Label>Required skills*</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {projectForm.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button 
                onClick={handleSearch}
                disabled={!projectForm.name || !projectForm.client || !projectForm.description || projectForm.requiredSkills.length === 0}
              >
                <Search className="h-4 w-4 mr-2" />
                Search for consultants
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {isSearching ? (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 mx-auto text-primary animate-pulse mb-4" />
                <h3 className="text-lg font-medium mb-2">Research in progress...</h3>
                <p className="text-muted-foreground mb-4">
                Our AI analyzes profiles to find the best matches
                </p>
                <Progress value={60} className="w-64 mx-auto" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Suggested Consultants</h3>
                    <p className="text-muted-foreground">
                      {suggestedConsultants.length} consultants found for "{projectForm.name}"
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setStep(1)}>
                  Edit the project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedConsultants.map((consultant) => (
                    <Card key={consultant.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{consultant.name}</h4>
                            <p className="text-sm text-muted-foreground">{consultant.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              {consultant.matchScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getAvailabilityColor(consultant.availability)}>
                            {consultant.availability}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{consultant.rating}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {consultant.skills.slice(0, 3).map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {consultant.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{consultant.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Progress value={consultant.matchScore} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                  </Button>
                  <Button onClick={handleCreateMatching}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create the matching
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
