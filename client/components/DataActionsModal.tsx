import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Database,
  X
} from "lucide-react";
import { useState } from "react";

interface DataActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "export" | "import" | "purge" | null;
  onConfirm: (action: string, data?: any) => void;
}

export function DataActionsModal({ open, onOpenChange, action, onConfirm }: DataActionsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [exportOptions, setExportOptions] = useState({
    includeUsers: true,
    includeProjects: true,
    includeMatchings: true,
    includeSettings: false,
    format: "json"
  });

  const handleConfirm = async () => {
    if (!action) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulation du processus
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onConfirm(action, action === "export" ? exportOptions : importFile);
          onOpenChange(false);
          setProgress(0);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getTitle = () => {
    switch (action) {
      case "export": return "Export data";
      case "import": return "Import data";
      case "purge": return "Purge data";
      default: return "Action on data";
    }
  };

  const getDescription = () => {
    switch (action) {
      case "export": return "Select the data to export and the format";
      case "import": return "Select a file to import";
      case "purge": return "Permanent deletion of all data";
      default: return "Manage application data";
    }
  };

  const getIcon = () => {
    switch (action) {
      case "export": return Download;
      case "import": return Upload;
      case "purge": return Trash2;
      default: return Database;
    }
  };

  const Icon = getIcon();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        {!isProcessing ? (
          <div className="space-y-4">
            {action === "export" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Export options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="users"
                        checked={exportOptions.includeUsers}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, includeUsers: e.target.checked }))}
                      />
                      <Label htmlFor="users" className="text-sm">Users and consultants</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="projects"
                        checked={exportOptions.includeProjects}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, includeProjects: e.target.checked }))}
                      />
                      <Label htmlFor="projects" className="text-sm">Projects</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="matchings"
                        checked={exportOptions.includeMatchings}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, includeMatchings: e.target.checked }))}
                      />
                      <Label htmlFor="matchings" className="text-sm">AI Matching</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="settings"
                        checked={exportOptions.includeSettings}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, includeSettings: e.target.checked }))}
                      />
                      <Label htmlFor="settings" className="text-sm">System Settings</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Export format</Label>
                    <select
                      id="format"
                      value={exportOptions.format}
                      onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value }))}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                    >
                      <option value="json">JSON</option>
                      <option value="csv">CSV</option>
                      <option value="xlsx">Excel (XLSX)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}

            {action === "import" && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="import-file">File to import</Label>
                      <input
                        id="import-file"
                        type="file"
                        accept=".json,.csv,.xlsx"
                        onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                        className="w-full mt-2 p-2 border border-input rounded-md text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: JSON, CSV, XLSX
                      </p>
                    </div>
                    {importFile && (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{importFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setImportFile(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {action === "purge" && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-medium text-red-800">Attention!</h4>
                      <p className="text-sm text-red-700">
                        This action will permanently delete all app data.
                        This operation is irreversible.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-red-100 rounded border">
                    <h5 className="font-medium text-red-800 mb-2">Data that will be deleted:</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• All users and consultants</li>
                      <li>• All projects and their histories</li>
                      <li>• All AI Matches</li>
                      <li>• All custom configurations</li>
                      <li>• All files and logs</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={action === "import" && !importFile}
                variant={action === "purge" ? "destructive" : "default"}
              >
                {action === "export" && "Export"}
                {action === "import" && "Import"}
                {action === "purge" && "Purge permanently"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-medium mb-2">
                {action === "export" && "Export in progress..."}
                {action === "import" && "Import in progress..."}
                {action === "purge" && "Suppression in progress..."}
              </h3>
              <p className="text-sm text-muted-foreground">
              Please wait while processing
              </p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              {progress}% finished
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
