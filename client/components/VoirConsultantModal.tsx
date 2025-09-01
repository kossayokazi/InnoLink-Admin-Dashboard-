import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  TrendingUp,
  Clock,
  Euro,
  Users,
  Award
} from "lucide-react";

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

interface VoirConsultantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  consultant: User | null;
}

export function VoirConsultantModal({ open, onOpenChange, onEdit, consultant }: VoirConsultantModalProps) {
  if (!consultant) return null;

  // Données simulées supplémentaires pour la démonstration
  const additionalData = {
    bio: "Cybersecurity expert with over 8 years of experience in the banking sector. Specialized in security audits, GDPR compliance, and the implementation of advanced protection solutions.",
    experience: "8 ans",
    education: [
      "Master's in Cybersecurity - ENSIMAG (2016)",
      "CISSP Certification (2018)",
      "AWS Security Certification (2020)"
    ],
    languages: ["French (Native)", "English (Fluent)", "Mandarin (Intermediate)"],
    hourlyRate: 850,
    linkedin: "https://linkedin.com/in/sophie-chen",
    portfolio: "https://sophie-chen-security.com",
    recentProjects: [
      {
        name: "BNP Paribas Security Audit",
        duration: "6 months",
        status: "Completed",
        rating: 5.0
      },
      {
        name: "Societe Generale Cloud Migration",
        duration: "4 months", 
        status: "In progress",
        rating: 4.8
      },
      {
        name: "Crédit Mutuel Cybersecurity Training",
        duration: "2 months",
        status: "Completed",
        rating: 4.9
      }
    ],
    certifications: [
      "CISSP - Certified Information Systems Security Professional", 
      "AWS Certified Security - Specialty", 
      "CISM - Certified Information Security Manager"
    ],
    achievements: [
      "Top Performer 2023",
      "Client Satisfaction Award",
      "Innovation in Security Award"
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On mission": return "bg-blue-100 text-blue-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "bg-green-100 text-green-800";
      case "Busy": return "bg-red-100 text-red-800";
      case "On vacation": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Consultant Profile
          </DialogTitle>
          <DialogDescription>
          Full profile details of{consultant.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête du profil */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={consultant.avatar} />
                  <AvatarFallback className="text-lg">
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{consultant.name}</h2>
                      <p className="text-lg text-muted-foreground">{consultant.role}</p>
                      <p className="text-muted-foreground">{consultant.company}</p>
                    </div>
                    <Button onClick={onEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Badge className={getStatusColor(consultant.status)}>
                      {consultant.status}
                    </Badge>
                    <Badge className={getAvailabilityColor(consultant.availability)}>
                      {consultant.availability}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{consultant.projectsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold text-primary">{consultant.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Note</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{additionalData.experience}</div>
                      <div className="text-xs text-muted-foreground">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{additionalData.hourlyRate}€</div>
                      <div className="text-xs text-muted-foreground">Rate/day</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations de contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consultant.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consultant.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{consultant.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined the {formatDate(consultant.joinDate)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a href={additionalData.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-blue-600 hover:underline">
                    LinkedIn profile
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={additionalData.portfolio} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-blue-600 hover:underline">
                    Portfolio
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Biographie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {additionalData.bio}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Compétences et Spécialisations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Skills and Specializations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Technical skills</h4>
                <div className="flex flex-wrap gap-2">
                  {consultant.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {consultant.specialties.map((specialty, i) => (
                    <Badge key={i} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {additionalData.languages.map((language, i) => (
                    <Badge key={i} variant="default">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formation et Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalData.education.map((education, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {education}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalData.certifications.map((cert, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Projets récents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {additionalData.recentProjects.map((project, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className="font-medium text-sm">{project.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {project.duration}
                        </span>
                        <Badge 
                          variant={project.status === "Completed"? "default" : "secondary"}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Récompenses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Awards and Recognitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {additionalData.achievements.map((achievement, i) => (
                  <Badge key={i} variant="outline" className="text-yellow-700 border-yellow-300">
                    <Award className="h-3 w-3 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Customer satisfaction</span>
                    <span className="font-medium">{(consultant.rating * 20).toFixed(0)}%</span>
                  </div>
                  <Progress value={consultant.rating * 20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Respect for deadlines</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Recommendations</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
