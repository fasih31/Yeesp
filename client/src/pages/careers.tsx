
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build scalable education platform features"
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Hybrid",
    type: "Full-time",
    description: "Lead product strategy and roadmap"
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive learning experiences"
  },
  {
    id: 4,
    title: "Content Strategist",
    department: "Marketing",
    location: "Remote",
    type: "Part-time",
    description: "Create engaging educational content"
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">
            Help us revolutionize education and empower learners worldwide
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto mb-16">
          {jobOpenings.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <CardDescription>{job.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                </div>
                <Button>
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🌍 Remote First</h3>
              <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📚 Learning Budget</h3>
              <p className="text-sm text-muted-foreground">Continuous learning opportunities</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 Growth</h3>
              <p className="text-sm text-muted-foreground">Career advancement paths</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
