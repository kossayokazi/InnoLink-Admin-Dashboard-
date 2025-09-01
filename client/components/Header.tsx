import { Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserStat {
  id: string;
  name: string;
  role: string;
  company: string;
  score: number;
  status: "Valid" | "Revision";
  color: "blue" | "yellow";
}

const userStats: UserStat[] = [
  {
    id: "SC",
    name: "Sophie Chen",
    role: "Audit Cybersecurity",
    company: "Credit Agricole",
    score: 91,
    status: "Valid",
    color: "blue",
  },
  {
    id: "AB",
    name: "Ahmed Benali",
    role: "Data Strategy",
    company: "Societe Generale", 
    score: 89,
    status: "Revision",
    color: "yellow",
  },
];

export function Header() {
  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>17 Projects</span>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {userStats.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                {user.id}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{user.name}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{user.score}%</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{user.role}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {user.company}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-16 rounded-full",
                    user.color === "blue" ? "bg-blue-500" : "bg-yellow-500"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded",
                    user.status === "Valid"
                      ? "text-green-700 bg-green-100"
                      : "text-orange-700 bg-orange-100"
                  )}
                >
                  {user.status}
                </span>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
