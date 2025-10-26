
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { Eye, Keyboard, Volume2, Monitor } from "lucide-react";

export default function AccessibilitySettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings } = useQuery({
    queryKey: ["/api/accessibility"],
    queryFn: () => apiRequest("/accessibility"),
  });

  const updateMutation = useMutation({
    mutationFn: (newSettings: any) =>
      apiRequest("/accessibility", { method: "PATCH", body: JSON.stringify(newSettings) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accessibility"] });
      toast({ title: "Accessibility settings updated" });
    },
  });

  const handleChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    updateMutation.mutate(newSettings);
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Accessibility Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      <div className="space-y-6">
        {/* Visual Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visual Settings
            </CardTitle>
            <CardDescription>Adjust display and readability options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Font Size</Label>
                <p className="text-sm text-muted-foreground">Adjust text size throughout the platform</p>
              </div>
              <Select
                value={settings?.fontSize || "medium"}
                onValueChange={(value) => handleChange("fontSize", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="x-large">X-Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <Switch
                checked={settings?.highContrast || false}
                onCheckedChange={(checked) => handleChange("highContrast", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
              </div>
              <Switch
                checked={settings?.reducedMotion || false}
                onCheckedChange={(checked) => handleChange("reducedMotion", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Screen Reader Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Screen Reader
            </CardTitle>
            <CardDescription>Optimize for screen reader compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Screen Reader Optimizations</Label>
                <p className="text-sm text-muted-foreground">Enable enhanced screen reader support</p>
              </div>
              <Switch
                checked={settings?.screenReader || false}
                onCheckedChange={(checked) => handleChange("screenReader", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Navigation
            </CardTitle>
            <CardDescription>Enhanced keyboard shortcuts and navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enhanced Keyboard Navigation</Label>
                <p className="text-sm text-muted-foreground">Show keyboard shortcuts and focus indicators</p>
              </div>
              <Switch
                checked={settings?.keyboardNavigation || true}
                onCheckedChange={(checked) => handleChange("keyboardNavigation", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Keyboard Shortcuts</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><kbd className="px-2 py-1 bg-background rounded">Alt + H</kbd> - Go to Dashboard</li>
                <li><kbd className="px-2 py-1 bg-background rounded">Alt + C</kbd> - View Courses</li>
                <li><kbd className="px-2 py-1 bg-background rounded">Alt + N</kbd> - Notifications</li>
                <li><kbd className="px-2 py-1 bg-background rounded">Alt + S</kbd> - Search</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
