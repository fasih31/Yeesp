import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, Shield, X } from "lucide-react";

export default function CertificatesManager() {
  const certificates = [
    { id: "CERT-001", student: "John Doe", course: "Web Development Bootcamp", issued: "2024-01-10", status: "verified", hash: "0x7a8b9c..." },
    { id: "CERT-002", student: "Sarah Wilson", course: "Data Science Fundamentals", issued: "2024-01-09", status: "verified", hash: "0x2c3d4e..." },
    { id: "CERT-003", student: "Mike Chen", course: "Digital Marketing", issued: "2024-01-08", status: "pending", hash: null },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Certificates Manager</h1>
        <p className="text-muted-foreground">Issue, verify, and manage digital certificates</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by certificate ID, student name, or course..." className="pl-10" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Blockchain Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1">99.8% verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{cert.id}</h3>
                    <Badge variant={cert.status === 'verified' ? 'default' : 'secondary'}>
                      {cert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{cert.student} • {cert.course}</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: {cert.issued}</p>
                  {cert.hash && (
                    <div className="flex items-center gap-1 mt-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      <p className="text-xs font-mono text-muted-foreground">{cert.hash}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  {cert.status === 'pending' && (
                    <Button size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  )}
                  <Button variant="destructive" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
