
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Award, Shield } from "lucide-react";

export default function Certificates() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Certificates</h1>
        <p className="text-muted-foreground">View and share your achievements</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full" />
          <CardHeader>
            <Award className="h-12 w-12 text-yellow-500 mb-4" />
            <CardTitle>Web Development Fundamentals</CardTitle>
            <CardDescription>Completed on Jan 15, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Verified</Badge>
                <Shield className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">Certificate ID: WD-2025-001234</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full" />
          <CardHeader>
            <Award className="h-12 w-12 text-blue-500 mb-4" />
            <CardTitle>React Mastery</CardTitle>
            <CardDescription>Completed on Dec 28, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Verified</Badge>
                <Shield className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">Certificate ID: RM-2024-005678</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
