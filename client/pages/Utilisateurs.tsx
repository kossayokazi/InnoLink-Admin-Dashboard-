import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiltresAvancesModal } from "@/components/FiltresAvancesModal";
import { AjouterConsultantModal } from "@/components/AjouterConsultantModal";
import { VoirConsultantModal } from "@/components/VoirConsultantModal";
import { ModifierConsultantModal } from "@/components/ModifierConsultantModal";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  TrendingUp,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { useState } from "react";

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
  status: "Active" | "Inactive" | "On a mission";
  joinDate: string;
  avatar?: string;
  specialties: string[];
  availability: "Available" | "Busy" | "On vacation";
}

export default function Utilisateurs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [isFiltresAvancesOpen, setIsFiltresAvancesOpen] = useState(false);
  const [isAjouterConsultantOpen, setIsAjouterConsultantOpen] = useState(false);
  const [isVoirConsultantOpen, setIsVoirConsultantOpen] = useState(false);
  const [isModifierConsultantOpen, setIsModifierConsultantOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<User | null>(null);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Sophie Chen",
      email: "sophie.chen@dowok.com",
      role: "Expert Cybersecurity",
      company: "Credit Agricole",
      location: "Paris, France",
      phone: "+33 1 23 45 67 89",
      skills: ["Security", "Audit", "Compliance", "GDPR"],
      rating: 4.9,
      projectsCompleted: 47,
      status: "Active",
      joinDate: "2023-03-15",
      specialties: ["Security Audit", "Banking Cybersecurity"],
      availability: "Available"
    },
    {
      id: "2",
      name: "Ahmed Benali",
      email: "ahmed.benali@dowok.com",
      role: "Data Strategist",
      company: "Societe Generale",
      location: "Lyon, France",
      phone: "+33 4 56 78 90 12",
      skills: ["Data Science", "Machine Learning", "Python", "SQL"],
      rating: 4.7,
      projectsCompleted: 34,
      status: "On a mission",
      joinDate: "2023-01-20",
      specialties: ["Big Data", "Artificial Intelligence"],
      availability: "Busy"
    },
    {
      id: "3",
      name: "Marie Dubois",
      email: "marie.dubois@dowok.com",
      role: "Architecte Cloud",
      company: "BNP Paribas",
      location: "Marseille, France",
      phone: "+33 4 91 23 45 67",
      skills: ["AWS", "Azure", "DevOps", "Kubernetes"],
      rating: 4.8,
      projectsCompleted: 29,
      status: "Actif",
      joinDate: "2023-05-10",
      specialties: ["Cloud Migration", "Distributed Architecture"],
      availability: "Available"
    },
    {
      id: "4",
      name: "Laurent Martin",
      email: "laurent.martin@dowok.com",
      role: "Consultant Junior",
      company: "Startup Tech",
      location: "Toulouse, France",
      phone: "+33 5 67 89 01 23",
      skills: ["React", "Node.js", "JavaScript", "TypeScript"],
      rating: 4.2,
      projectsCompleted: 12,
      status: "Actif",
      joinDate: "2023-09-01",
      specialties: ["Web development", "Mobile applications"],
      availability: "Available"
    }
  ]);

  const stats = [
    {
      title: "Total Consultants",
      value: users.length.toString(),
      change: "+12",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active this month",
      value: users.filter(u => u.status === "Active").length.toString(),
      change: "+8",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "New registrants",
      value: "23",
      change: "+5",
      icon: Plus,
      color: "text-purple-600"
    },
    {
      title: "Average rating",
      value: (users.reduce((acc, u) => acc + u.rating, 0) / users.length).toFixed(1),
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600"
    }
  ];

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    toast({
      title: "Filters applied",
      description: "Advanced filters have been successfully applied.",
    });
  };

  const handleSaveConsultant = (consultant: any) => {
    setUsers(prev => [...prev, consultant]);
    toast({
      title: "Consultant added",
      description: `${consultant.name} has been successfully added.`,
    });
  };

  const handleUpdateConsultant = (updatedConsultant: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedConsultant.id ? updatedConsultant : user
    ));
    toast({
      title: "Consultant modified",
      description: `${updatedConsultant.name} has been successfully modified.`,
    });
  };

  const handleDeleteConsultant = (consultantId: string) => {
    const consultant = users.find(u => u.id === consultantId);
    setUsers(prev => prev.filter(user => user.id !== consultantId));
    toast({
      title: "Consultant removed",
      description: `${consultant?.name} has been successfully deleted.`,
      variant: "destructive"
    });
  };

  const handleVoirConsultant = (consultant: User) => {
    setSelectedConsultant(consultant);
    setIsVoirConsultantOpen(true);
  };

  const handleModifierConsultant = (consultant: User) => {
    setSelectedConsultant(consultant);
    setIsModifierConsultantOpen(true);
  };

  const handleEditFromView = () => {
    setIsVoirConsultantOpen(false);
    setIsModifierConsultantOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On a mission": return "bg-blue-100 text-blue-800";
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

  // Appliquer tous les filtres
  const filteredUsers = users.filter(user => {
    // Filtres de base
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "Tous" || user.status === selectedStatus;
    const matchesRole = selectedRole === "Tous" || user.role.includes(selectedRole);

    // Filtres avancés
    let matchesAdvanced = true;
    if (Object.keys(activeFilters).length > 0) {
      if (activeFilters.expertise?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.expertise.some((exp: string) => 
          user.role.toLowerCase().includes(exp.toLowerCase())
        );
      }
      if (activeFilters.availability?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.availability.includes(user.availability);
      }
      if (activeFilters.rating && activeFilters.rating[0] > 1) {
        matchesAdvanced = matchesAdvanced && user.rating >= activeFilters.rating[0];
      }
      if (activeFilters.projectsCompleted && activeFilters.projectsCompleted[0] > 0) {
        matchesAdvanced = matchesAdvanced && user.projectsCompleted >= activeFilters.projectsCompleted[0];
      }
      if (activeFilters.location) {
        matchesAdvanced = matchesAdvanced && user.location.toLowerCase().includes(activeFilters.location.toLowerCase());
      }
      if (activeFilters.company) {
        matchesAdvanced = matchesAdvanced && user.company.toLowerCase().includes(activeFilters.company.toLowerCase());
      }
      if (activeFilters.skills?.length > 0) {
        matchesAdvanced = matchesAdvanced && activeFilters.skills.some((skill: string) =>
          user.skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
        );
      }
    }

    return matchesSearch && matchesStatus && matchesRole && matchesAdvanced;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground mt-1">
            Management of consultants and user profiles
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFiltresAvancesOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced filters
            </Button>
            <Button 
              size="sm"
              onClick={() => setIsAjouterConsultantOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a consultant
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
                  placeholder="Rechercher par nom, email ou entreprise..."
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
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="On a mission">On a mission</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                <option value="All">All roles</option>
                <option value="Expert">Expert</option>
                <option value="Senior">Senior</option>
                <option value="Junior">Junior</option>
                <option value="Architecte">Architecte</option>
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

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Status Badges */}
                <div className="flex gap-2 mb-4">
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                  <Badge className={getAvailabilityColor(user.availability)}>
                    {user.availability}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{user.projectsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold text-primary">{user.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Note</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.skills.length - 3}
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
                    onClick={() => handleVoirConsultant(user)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleModifierConsultant(user)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No consultants found</h3>
              <p className="text-muted-foreground">
              No consultants match the current search criteria.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <FiltresAvancesModal
          open={isFiltresAvancesOpen}
          onOpenChange={setIsFiltresAvancesOpen}
          onApplyFilters={handleApplyFilters}
        />

        <AjouterConsultantModal
          open={isAjouterConsultantOpen}
          onOpenChange={setIsAjouterConsultantOpen}
          onSave={handleSaveConsultant}
        />

        <VoirConsultantModal
          open={isVoirConsultantOpen}
          onOpenChange={setIsVoirConsultantOpen}
          onEdit={handleEditFromView}
          consultant={selectedConsultant}
        />

        <ModifierConsultantModal
          open={isModifierConsultantOpen}
          onOpenChange={setIsModifierConsultantOpen}
          onSave={handleUpdateConsultant}
          onDelete={handleDeleteConsultant}
          consultant={selectedConsultant}
        />
      </div>
    </Layout>
  );
}
