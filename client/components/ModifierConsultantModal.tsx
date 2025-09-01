import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  X, 
  Plus, 
  Upload, 
  Save, 
  User,
  Trash2
} from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  location: string;
  phone: string;
  skills: string[];
  rating: number;
  projectsCompleted: number;
  status: "Active" | "Inactive" | "On mission";
  joinDate: string;
  avatar?: string;
  specialties: string[];
  availability: "Available" | "Busy" | "On vacation";
}

interface ModifierConsultantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (consultant: User) => void;
  onDelete: (consultantId: string) => void;
  consultant: User | null;
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
  status: "Active" | "Inactive" | "On mission";
  hourlyRate: string;
  linkedin: string;
  portfolio: string;
  languages: string[];
}

export function ModifierConsultantModal({ open, onOpenChange, onSave, onDelete, consultant }: ModifierConsultantModalProps) {
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
    status: "Active",
    hourlyRate: "",
    linkedin: "",
    portfolio: "",
    languages: []
  });

  const [newSkill, setNewSkill] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Charger les données du consultant quand le modal s'ouvre
  useEffect(() => {
    if (consultant && open) {
      const [firstName, ...lastNameParts] = consultant.name.split(' ');
      setFormData({
        firstName: firstName || "",
        lastName: lastNameParts.join(' ') || "",
        email: consultant.email,
        phone: consultant.phone,
        location: consultant.location,
        company: consultant.company,
        role: consultant.role,
        bio: "Cybersecurity expert with over 8 years of experience..", // Données simulées
        skills: consultant.skills,
        specialties: consultant.specialties,
        experience: "8 ans",
        education: "Master's in Cybersecurity - ENSIMAG(2016)",
        availability: consultant.availability,
        status: consultant.status,
        hourlyRate: "850",
        linkedin: "https://linkedin.com/in/...",
        portfolio: "https://portfolio.com",
        languages: ["French", "English"]
      });
    }
  }, [consultant, open]);

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
    if (!consultant) return;

    const updatedConsultant: User = {
      ...consultant,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      company: formData.company,
      role: formData.role,
      skills: formData.skills,
      specialties: formData.specialties,
      availability: formData.availability,
      status: formData.status,
      avatar: avatarFile ? URL.createObjectURL(avatarFile) : consultant.avatar
    };
    
    onSave(updatedConsultant);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (consultant) {
      onDelete(consultant.id);
      setShowDeleteConfirm(false);
      onOpenChange(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  if (!consultant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Edit Consultant
          </DialogTitle>
          <DialogDescription>
          Edit the information of {consultant.name}
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
                  Delete this consultant
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-red-800">
                  Are you sure you want to delete this consultant? This action is irreversible.
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

          {/* Photo de profil */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Profile picture</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                {avatarFile ? (
                  <AvatarImage src={URL.createObjectURL(avatarFile)} />
                ) : consultant.avatar ? (
                  <AvatarImage src={consultant.avatar} />
                ) : (
                  <AvatarFallback>
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatar-upload-edit"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="avatar-upload-edit" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Change photo
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
                <Label htmlFor="firstName-edit">First Name *</Label>
                <Input
                  id="firstName-edit"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName-edit">Last Name *</Label>
                <Input
                  id="lastName-edit"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-edit">Email *</Label>
                <Input
                  id="email-edit"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-edit">Phone</Label>
                <Input
                  id="phone-edit"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
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
              <div className="space-y-2">
                <Label htmlFor="availability-edit">Availability</Label>
                <select
                  id="availability-edit"
                  value={formData.availability}
                  onChange={(e) => handleInputChange("availability", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="Available">Available</option>
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
                  <Label htmlFor="company-edit">Company</Label>
                  <Input
                    id="company-edit"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-edit">Position/Role *</Label>
                  <Input
                    id="role-edit"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status-edit">Status</Label>
                  <select
                    id="status-edit"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On a mission">On a mission</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate-edit">Hourly rate (€)</Label>
                  <Input
                    id="hourlyRate-edit"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                  />
                </div>
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
                  placeholder="Add a specialization"
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
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
