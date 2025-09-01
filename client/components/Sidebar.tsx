import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  FolderOpen,
  Brain,
  TrendingUp,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/utilisateurs",
    icon: Users,
  },
  {
    name: "Projects",
    href: "/projets",
    icon: FolderOpen,
  },
  {
    name: "AI Matchings",
    href: "/matchings",
    icon: Brain,
  },
  {
    name: "Trends",
    href: "/tendances",
    icon: TrendingUp,
  },
  {
    name: "Settings",
    href: "/parametres",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border hidden md:block">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Dowok</h1>
            <p className="text-xs text-sidebar-foreground/60">Consulting</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/30 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              admin@dowok.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
