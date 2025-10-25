
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 mt-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Latest from YEESP</h1>
          <p className="text-lg text-muted-foreground">News, updates, and educational content</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover-elevate cursor-pointer">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardHeader>
                <Badge className="w-fit mb-2">Technology</Badge>
                <CardTitle>10 Tips for Learning Web Development</CardTitle>
                <CardDescription>Published on Jan 20, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover the best practices and strategies for becoming a successful web developer...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
