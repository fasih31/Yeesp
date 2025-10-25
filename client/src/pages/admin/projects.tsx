
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminProjects() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Project Management</h1>
        <p className="text-muted-foreground">Monitor platform projects</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>E-commerce Development</CardTitle>
                  <p className="text-sm text-muted-foreground">Posted by TechCorp Inc.</p>
                </div>
                <Badge>Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Flag</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
