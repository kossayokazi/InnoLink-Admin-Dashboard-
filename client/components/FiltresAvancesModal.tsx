import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X, Search, RotateCcw } from "lucide-react";
import { useState } from "react";

interface FiltresAvancesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
}

interface FilterState {
  expertise: string[];
  availability: string[];
  rating: [number];
  experience: [number];
  location: string;
  skills: string[];
  projectsCompleted: [number];
  company: string;
  languages: string[];
}

export function FiltresAvancesModal({ open, onOpenChange, onApplyFilters }: FiltresAvancesModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    expertise: [],
    availability: [],
    rating: [4.0],
    experience: [2],
    location: "",
    skills: [],
    projectsCompleted: [10],
    company: "",
    languages: []
  });

  const [newSkill, setNewSkill] = useState("");

  const expertiseOptions = [
    "Expert", "Senior", "Intermediate", "Junior", "Architect", "Lead", "Consultant", "Manager"
  ];

  const availabilityOptions = [
    "Available", "Busy", "On vacation", "Partially available"
  ];

  const skillOptions = [
    "React", "Node.js", "Python", "Java", "AWS", "Azure", "Docker", "Kubernetes",
    "Machine Learning", "Data Science", "Cybersécurité", "DevOps", "TypeScript",
    "MongoDB", "PostgreSQL", "GraphQL", "Microservices", "CI/CD"
  ];

  const languageOptions = [
    "French", "English", "Spanish", "German", "Italian", "Arabic", "Mandarin"
  ];

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      expertise: checked 
        ? [...prev.expertise, expertise]
        : prev.expertise.filter(e => e !== expertise)
    }));
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      availability: checked 
        ? [...prev.availability, availability]
        : prev.availability.filter(a => a !== availability)
    }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !filters.skills.includes(newSkill.trim())) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const resetFilters = () => {
    setFilters({
      expertise: [],
      availability: [],
      rating: [4.0],
      experience: [2],
      location: "",
      skills: [],
      projectsCompleted: [10],
      company: "",
      languages: []
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Advanced Filters - Users
          </DialogTitle>
          <DialogDescription>
          Refine your search with detailed criteria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Niveau d'expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Level of expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {expertiseOptions.map((expertise) => (
                  <div key={expertise} className="flex items-center space-x-2">
                    <Checkbox
                      id={`expertise-${expertise}`}
                      checked={filters.expertise.includes(expertise)}
                      onCheckedChange={(checked) => handleExpertiseChange(expertise, checked as boolean)}
                    />
                    <Label htmlFor={`expertise-${expertise}`} className="text-sm">
                      {expertise}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Disponibilité */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availabilityOptions.map((availability) => (
                  <div key={availability} className="flex items-center space-x-2">
                    <Checkbox
                      id={`availability-${availability}`}
                      checked={filters.availability.includes(availability)}
                      onCheckedChange={(checked) => handleAvailabilityChange(availability, checked as boolean)}
                    />
                    <Label htmlFor={`availability-${availability}`} className="text-sm">
                      {availability}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Note minimum */}
            <div className="space-y-3">
              <Label>Minimum score: {filters.rating[0].toFixed(1)}/5</Label>
              <Slider
                value={filters.rating}
                onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value as [number] }))}
                max={5}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Expérience minimum */}
            <div className="space-y-3">
              <Label>Minimum experience: {filters.experience[0]} years</Label>
              <Slider
                value={filters.experience}
                onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value as [number] }))}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            {/* Entreprise */}
            <div className="space-y-2">
              <Label htmlFor="company">company</Label>
              <Input
                id="company"
                value={filters.company}
                onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Ex: Credit Agricole, BNP..."
              />
            </div>
          </div>

          {/* Compétences */}
          <div className="space-y-3">
            <Label>Required skills</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skills"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} size="sm">
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillOptions.slice(0, 12).map((skill) => (
                <Badge
                  key={skill}
                  variant={filters.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (filters.skills.includes(skill)) {
                      removeSkill(skill);
                    } else {
                      setFilters(prev => ({ ...prev, skills: [...prev.skills, skill] }));
                    }
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {filters.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm font-medium">Selected:</span>
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Projets complétés minimum */}
          <div className="space-y-3">
            <Label>Minimum completed projects: {filters.projectsCompleted[0]}</Label>
            <Slider
              value={filters.projectsCompleted}
              onValueChange={(value) => setFilters(prev => ({ ...prev, projectsCompleted: value as [number] }))}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Langues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Languages ​​spoken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languageOptions.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={`language-${language}`}
                      checked={filters.languages.includes(language)}
                      onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    />
                    <Label htmlFor={`language-${language}`} className="text-sm">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
