import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, DollarSign, Mail, Shield, Zap } from "lucide-react";
import { AdminSidebar } from "@/components/navigation/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PlatformSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    platformFee: "10",
    minProjectBudget: "50",
    maxProjectBudget: "100000",
    commissionRate: "15",
    withdrawalMinimum: "25",
    defaultCurrency: "USD",
    maintenanceMode: false,
    registrationOpen: true,
    emailVerificationRequired: true,
    platformName: "YEESP",
    supportEmail: "support@yeesp.com",
    termsUrl: "/terms",
    privacyUrl: "/privacy",
  });

  const updateSettings = useMutation({
    mutationFn: async (data: typeof settings) => {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update settings');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Platform settings have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update platform settings.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateSettings.mutate(settings);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Settings className="h-8 w-8" />
                Platform Settings
              </h1>
              <p className="text-muted-foreground">
                Configure platform-wide settings and policies
              </p>
            </div>

            <Tabs defaultValue="pricing" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pricing">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pricing
                </TabsTrigger>
                <TabsTrigger value="platform">
                  <Zap className="h-4 w-4 mr-2" />
                  Platform
                </TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              {/* Pricing Settings */}
              <TabsContent value="pricing">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Fees</CardTitle>
                    <CardDescription>
                      Manage platform fees, commissions, and transaction limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="platformFee">Platform Fee (%)</Label>
                        <Input
                          id="platformFee"
                          type="number"
                          value={settings.platformFee}
                          onChange={(e) => setSettings({ ...settings, platformFee: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commissionRate">Tutor Commission Rate (%)</Label>
                        <Input
                          id="commissionRate"
                          type="number"
                          value={settings.commissionRate}
                          onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minBudget">Minimum Project Budget ($)</Label>
                        <Input
                          id="minBudget"
                          type="number"
                          value={settings.minProjectBudget}
                          onChange={(e) => setSettings({ ...settings, minProjectBudget: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxBudget">Maximum Project Budget ($)</Label>
                        <Input
                          id="maxBudget"
                          type="number"
                          value={settings.maxProjectBudget}
                          onChange={(e) => setSettings({ ...settings, maxProjectBudget: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="withdrawalMin">Minimum Withdrawal Amount ($)</Label>
                        <Input
                          id="withdrawalMin"
                          type="number"
                          value={settings.withdrawalMinimum}
                          onChange={(e) => setSettings({ ...settings, withdrawalMinimum: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select value={settings.defaultCurrency} onValueChange={(value) => setSettings({ ...settings, defaultCurrency: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Platform Settings */}
              <TabsContent value="platform">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>
                      General platform settings and maintenance mode
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input
                        id="platformName"
                        value={settings.platformName}
                        onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable to restrict access while performing updates
                        </p>
                      </div>
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Open Registration</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow new users to register
                        </p>
                      </div>
                      <Switch
                        checked={settings.registrationOpen}
                        onCheckedChange={(checked) => setSettings({ ...settings, registrationOpen: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Email Settings */}
              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Configuration</CardTitle>
                    <CardDescription>
                      Configure email notifications and templates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Verification Required</Label>
                        <p className="text-sm text-muted-foreground">
                          Require users to verify their email address
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailVerificationRequired}
                        onCheckedChange={(checked) => setSettings({ ...settings, emailVerificationRequired: checked })}
                      />
                    </div>

                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h3 className="font-semibold mb-2">SendGrid Status</h3>
                      <p className="text-sm text-muted-foreground">
                        Email service is configured and ready. Add SENDGRID_API_KEY to enable email notifications.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security & Privacy</CardTitle>
                    <CardDescription>
                      Manage security policies and legal links
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="termsUrl">Terms of Service URL</Label>
                      <Input
                        id="termsUrl"
                        value={settings.termsUrl}
                        onChange={(e) => setSettings({ ...settings, termsUrl: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="privacyUrl">Privacy Policy URL</Label>
                      <Input
                        id="privacyUrl"
                        value={settings.privacyUrl}
                        onChange={(e) => setSettings({ ...settings, privacyUrl: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} size="lg">
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
