import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  X, 
  Upload, 
  Save, 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star
} from "lucide-react";
import { useState } from "react";

interface AjouterConsultantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (consultant: any) => void;
}

interface ConsultantForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  role: string;
  bio: string;
  skills: string[];
  specialties: string[];
  experience: string;
  education: string;
  availability: "Available" | "Busy" | "On vacation";
  hourlyRate: string;
  linkedin: string;
  portfolio: string;
  languages: string[];
}

export function AjouterConsultantModal({ open, onOpenChange, onSave }: AjouterConsultantModalProps) {
  const [formData, setFormData] = useState<ConsultantForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    role: "",
    bio: "",
    skills: [],
    specialties: [],
    experience: "",
    education: "",
    availability: "Available",
    hourlyRate: "",
    linkedin: "",
    portfolio: "",
    languages: []
  });

  const [newSkill, setNewSkill] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof ConsultantForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialtyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(specialty => specialty !== specialtyToRemove)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleSave = () => {
    const newConsultant = {
      ...formData,
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      rating: 0,
      projectsCompleted: 0,
      status: "Actif",
      joinDate: new Date().toISOString().split('T')[0],
      avatar: avatarFile ? URL.createObjectURL(avatarFile) : undefined
    };
    
    onSave(newConsultant);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      company: "",
      role: "",
      bio: "",
      skills: [],
      specialties: [],
      experience: "",
      education: "",
      availability: "Available",
      hourlyRate: "",
      linkedin: "",
      portfolio: "",
      languages: []
    });
    setAvatarFile(null);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add a Consultant
          </DialogTitle>
          <DialogDescription>
          Create a new consultant profile with all the necessary information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo de profil */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Profile picture</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                {avatarFile ? (
                  <AvatarImage src={URL.createObjectURL(avatarFile)} />
                ) : (
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload a photo
                  </label>
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG until 5MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Personal information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Ex: Sophie"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">LastName *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Ex: Chen"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="sophie.chen@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Paris, France"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">availability</Label>
                <select
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleInputChange("availability", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="available">available</option>
                  <option value="Busy">Busy</option>
                  <option value="On vacation">On vacation</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Informations professionnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Professional information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Current company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Ex: Credit Agricole"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Position/Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="Ex: Expert Cybersecurity"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="Ex: 8 ans"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly rate (€)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                    placeholder="Ex: 850"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Describe the consultant's experience, achievements and personality..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Technical skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spécialisations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Specializations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add a specializations"
                  onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                />
                <Button onClick={addSpecialty} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="flex items-center gap-1">
                    {specialty}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSpecialty(specialty)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Langues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Languages spoken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder=">Add languages"
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                />
                <Button onClick={addLanguage} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language) => (
                  <Badge key={language} variant="default" className="flex items-center gap-1">
                    {language}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeLanguage(language)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Liens professionnels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Professional links</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/web Site </Label>
                <Input
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange("portfolio", e.target.value)}
                  placeholder="https://portfolio.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Formation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Training</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="education">Diplomas and training</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  placeholder="Ex: Master's Degree in Computer Science - École Polytechnique (2015)&#10;AWS Solutions Architect Certification (2020)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.role}
            >
              <Save className="h-4 w-4 mr-2" />
              Register the consultant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
