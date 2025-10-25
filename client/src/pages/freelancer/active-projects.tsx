
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, DollarSign } from "lucide-react";

export default function FreelancerActiveProjects() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Active Projects</h1>
        <p className="text-muted-foreground">Manage your ongoing work</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Website Development</CardTitle>
                <CardDescription>for TechCorp Inc.</CardDescription>
              </div>
              <Badge>In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span>Progress</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>$4,500</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Due in 15 days</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>Submit Deliverable</Button>
              <Button variant="outline">Message Client</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
