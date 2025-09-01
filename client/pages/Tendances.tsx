import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Target, Calendar, Activity } from "lucide-react";

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ComponentType<any>;
  color: string;
}

interface TrendData {
  label: string;
  value: number;
  max: number;
  color: string;
}

export default function Tendances() {
  const metrics: MetricCard[] = [
    {
      title: "New users",
      value: "+127",
      change: 12.5,
      changeType: "increase",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Completed projects",
      value: "89",
      change: 8.2,
      changeType: "increase",
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Successful Matches",
      value: "234",
      change: 15.3,
      changeType: "increase",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Customer satisfaction",
      value: "4.8/5",
      change: -2.1,
      changeType: "decrease",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const activityData: TrendData[] = [
    { label: "New users", value: 127, max: 150, color: "bg-blue-500" },
    { label: "Completed projects", value: 89, max: 100, color: "bg-blue-500" },
    { label: "Successful Matches", value: 234, max: 250, color: "bg-blue-500" },
    { label: "Customer satisfaction", value: 96, max: 100, color: "bg-blue-500" },
  ];

  const projectsData = [
    { status: "Completed", value: 89, color: "text-green-600" },
    { status: "In Progress", value: 156, color: "text-blue-600" },
    { status: "On hold", value: 23, color: "text-orange-600" },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trends</h1>
          <p className="text-muted-foreground mt-1">
          Trend tracking and platform performance analysis
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {metric.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {metric.changeType === "increase" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm ml-1 ${
                          metric.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {metric.changeType === "increase" ? "+" : ""}
                        {metric.change}%
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${metric.color}`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Platform Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Key metrics for the last 30 days
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{item.label}</span>
                    <span className="font-medium">
                      {item.value}
                      {item.label === "Customer satisfaction" && "%"}
                    </span>
                  </div>
                  <Progress
                    value={(item.value / item.max) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Project Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Project Status
              </CardTitle>
              <p className="text-sm text-muted-foreground">
              Current distribution of projects
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectsData.map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-500"
                          : project.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    />
                    <span className="text-sm text-foreground">{project.status}</span>
                  </div>
                  <span className={`text-lg font-bold ${project.color}`}>
                    {project.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">+24%</div>
                <p className="text-sm text-muted-foreground">
                Growth in active users this month
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                <p className="text-sm text-muted-foreground">
                AI Matching Success Rates
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3.2x</div>
                <p className="text-sm text-muted-foreground">
                Improvement of average productivity
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
