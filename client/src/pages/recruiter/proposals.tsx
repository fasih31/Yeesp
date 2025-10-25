
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, DollarSign, Clock } from "lucide-react";

export default function RecruiterProposals() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Proposals</h1>
        <p className="text-muted-foreground">Review freelancer proposals</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>FL</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>Freelancer Name</CardTitle>
                  <CardDescription>Full Stack Developer</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.9 (50 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">$4,500</p>
                  <p className="text-sm text-muted-foreground">Fixed price</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                I am an experienced full-stack developer with 5+ years of experience...
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>8 weeks delivery</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Accept Proposal</Button>
                <Button variant="outline">Message</Button>
                <Button variant="outline">Decline</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
