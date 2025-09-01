import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationDropdown } from "./NotificationDropdown";
import {
  Search,
  User,
  Settings,
  LogOut,
  Mail,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search launched",
        description: `Search for: "${searchQuery}"`,
      });
      console.log("Search performed for:", searchQuery);
    } else {
      setIsSearchActive(!isSearchActive);
    }
  };


  const handleProfile = (action: string) => {
    switch (action) {
      case "profile":
        toast({
          title: "Profil",
          description: "Redirect to the administrator profile",
        });
        console.log("Opening the profile");
        break;
      case "settings":
        toast({
          title: "settings",
          description: "Redirect to settings",
        });
        console.log("Opening Settings");
        break;
      case "logout":
        toast({
          title: "log out",
          description: "You have been successfully logged out",
        });
        console.log("logout");
        break;
      default:
        console.log("Unrecognized action:", action);
    }
  };

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administrator Interface</h1>
          <p className="text-sm text-muted-foreground">Dashboard - Dowok Consulting</p>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            {isSearchActive && (
              <Input
                placeholder="To research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-64"
                autoFocus
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSearch}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {!isSearchActive && "Research"}
            </Button>
          </div>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Admin Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/admin-avatar.png" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Administrator
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfile("profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>My profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfile("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfile("logout")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
