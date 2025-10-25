
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Upload, Plus, X } from "lucide-react";

export default function FreelanceOnboarding() {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Become a Freelancer</h1>
        <p className="text-muted-foreground">Set up your freelancer profile</p>
      </div>

      <div className="mb-8">
        <Progress value={(step / 4) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">Step {step} of 4</p>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Tell us about your professional background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" placeholder="e.g., Full Stack Developer" />
            </div>
            <div>
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Describe your experience, expertise, and what makes you unique..."
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
              <Input id="hourly-rate" type="number" placeholder="50" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setStep(2)} className="ml-auto">Next Step</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
            <CardDescription>Add your technical and professional skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="skill">Add Skills</Label>
              <div className="flex gap-2">
                <Input 
                  id="skill" 
                  placeholder="e.g., React, Node.js, Python"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="pl-3 pr-1">
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:bg-muted rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Next Step</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Showcase your best work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload project images, documents, or links
              </p>
              <Button variant="outline">Choose Files</Button>
            </div>
            <div>
              <Label htmlFor="portfolio-url">Portfolio Website (Optional)</Label>
              <Input id="portfolio-url" type="url" placeholder="https://yourportfolio.com" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={() => setStep(4)}>Next Step</Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Submit</CardTitle>
            <CardDescription>Review your profile before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Profile Summary</h3>
              <p className="text-sm text-muted-foreground">
                Your freelancer profile is ready for review. Once approved, you'll be able to bid on projects.
              </p>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Briefcase className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Ready to start freelancing?</p>
                <p className="text-sm text-muted-foreground">
                  Submit your profile for approval
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
            <Button>Submit for Approval</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
