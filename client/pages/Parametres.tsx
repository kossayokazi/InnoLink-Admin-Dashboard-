import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { DataActionsModal } from "@/components/DataActionsModal";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Mail,
  Globe,
  Palette,
  Download,
  Upload,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Key,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";

export default function Parametres() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [currentDataAction, setCurrentDataAction] = useState<"export" | "import" | "purge" | null>(null);
  const { toast } = useToast();
  // États initiaux pour la réinitialisation
  const initialSettings = {
    // Profil utilisateur
    companyName: "Dowok Consulting",
    adminEmail: "admin@dowok.com",
    adminName: "Administrator",
    companyAddress: "123 Rue Borguiba, Tunis",
    companyPhone: "+216 12 123 456",

    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    instantAlerts: true,

    // Sécurité
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,

    // Système
    dataRetention: 365,
    backupFrequency: "Daily",
    maintenanceMode: false,
    debugMode: false,

    // API & Intégrations
    apiKey: "sk_live_abc123...",
    webhookUrl: "https://dowok.com/webhook",

    // Apparence
    theme: "light",
    language: "en",
    timezone: "Sousse/Tunis",
    dateFormat: "DD/MM/YYYY"
  };

  const [settings, setSettings] = useState(initialSettings);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Fonctions de gestion
  const handleReset = () => {
    setSettings(initialSettings);
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Saved settings",
      description: "The settings were saved successfully.",
    });
  };

  const handleDataAction = (action: "export" | "import" | "purge") => {
    setCurrentDataAction(action);
    setIsDataModalOpen(true);
  };

  const handleDataActionConfirm = (action: string, data?: any) => {
    switch (action) {
      case "export":
        toast({
          title: "Export completed",
          description: "The data has been exported successfully..",
        });
        break;
      case "import":
        toast({
          title: "Import completed",
          description: `The file "${data?.name}" has been successfully imported.`,
        });
        break;
      case "purge":
        toast({
          title: "Purge complete",
          description: "All data has been permanently deleted.",
          variant: "destructive"
        });
        break;
    }
    setCurrentDataAction(null);
  };

  const systemStatus = [
    { name: "DataBase", status: "Operational", color: "text-green-600" },
    { name: "API Services", status: "Operational", color: "text-green-600" },
    { name: "Storage", status: "85% used", color: "text-yellow-600" },
    { name: "Backup", status: "Last: 2 hours ago", color: "text-green-600" }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">
            General Application Configuration
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStatus.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${item.color}`} />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-sm ${item.color}`}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Company Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={settings.companyName}
                  onChange={(e) => updateSetting("companyName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Administrator email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => updateSetting("adminEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-name">Administrator Name</Label>
                <Input
                  id="admin-name"
                  value={settings.adminName}
                  onChange={(e) => updateSetting("adminName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Adresse</Label>
                <Textarea
                  id="company-address"
                  value={settings.companyAddress}
                  onChange={(e) => updateSetting("companyAddress", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Phone</Label>
                <Input
                  id="company-phone"
                  value={settings.companyPhone}
                  onChange={(e) => updateSetting("companyPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email alerts
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Notifications Push</Label>
                  <p className="text-sm text-muted-foreground">
                  Real-time notifications
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly activity summary
                  </p>
                </div>
                <Switch
                  id="weekly-reports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="instant-alerts">Instant Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Immediate critical alerts
                  </p>
                </div>
                <Switch
                  id="instant-alerts"
                  checked={settings.instantAlerts}
                  onCheckedChange={(checked) => updateSetting("instantAlerts", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">2FA Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Two-factor authentication required
                  </p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout session (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => updateSetting("sessionTimeout", parseInt(e.target.value))}
                  min={5}
                  max={120}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiration(days)</Label>
                <Input
                  id="password-expiry"
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => updateSetting("passwordExpiry", parseInt(e.target.value))}
                  min={30}
                  max={365}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max login attempts</Label>
                <Input
                  id="login-attempts"
                  type="number"
                  value={settings.loginAttempts}
                  onChange={(e) => updateSetting("loginAttempts", parseInt(e.target.value))}
                  min={3}
                  max={10}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-600" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data retention (days)</Label>
                <Input
                  id="data-retention"
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => updateSetting("dataRetention", parseInt(e.target.value))}
                  min={30}
                  max={2555}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup frequency</Label>
                <select
                  id="backup-frequency"
                  value={settings.backupFrequency}
                  onChange={(e) => updateSetting("backupFrequency", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Suspend user access
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logs
                  </p>
                </div>
                <Switch
                  id="debug-mode"
                  checked={settings.debugMode}
                  onCheckedChange={(checked) => updateSetting("debugMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API & Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-orange-600" />
              API & Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={settings.apiKey}
                    onChange={(e) => updateSetting("apiKey", e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL Webhook</Label>
                <Input
                  id="webhook-url"
                  value={settings.webhookUrl}
                  onChange={(e) => updateSetting("webhookUrl", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-pink-600" />
              Apparence & Localisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <select
                  id="theme"
                  value={settings.theme}
                  onChange={(e) => updateSetting("theme", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => updateSetting("language", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="fr">French</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time zone</Label>
                <select
                  id="timezone"
                  value={settings.timezone}
                  onChange={(e) => updateSetting("timezone", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date format</Label>
                <select
                  id="date-format"
                  value={settings.dateFormat}
                  onChange={(e) => updateSetting("dateFormat", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleDataAction("export")}
              >
                <Download className="h-4 w-4" />
                Export data
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleDataAction("import")}
              >
                <Upload className="h-4 w-4" />
                Import data
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                onClick={() => handleDataAction("purge")}
              >
                <AlertTriangle className="h-4 w-4" />
                Purge data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Warning Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800">Important</h4>
                <p className="text-sm text-orange-700">
                  Some changes require a system restart. 
                  Make sure to save before making critical changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal de gestion des données */}
        <DataActionsModal
          open={isDataModalOpen}
          onOpenChange={setIsDataModalOpen}
          action={currentDataAction}
          onConfirm={handleDataActionConfirm}
        />
      </div>
    </Layout>
  );
}
