
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold">YEESP</h1>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
            <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is YEESP?</AccordionTrigger>
                    <AccordionContent>
                      YEESP is a comprehensive platform that combines Learning Management System, 
                      Tutoring Marketplace, and Freelancing Platform to help youth gain education 
                      and employment opportunities.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I get started?</AccordionTrigger>
                    <AccordionContent>
                      Simply sign up for an account, choose your role (student, tutor, freelancer, 
                      or recruiter), and complete your profile to get started.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is YEESP free to use?</AccordionTrigger>
                    <AccordionContent>
                      YEESP offers both free and paid options. Many courses are free, while premium 
                      courses and tutoring services require payment.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I enroll in a course?</AccordionTrigger>
                    <AccordionContent>
                      Browse the course catalog, select a course, and click "Enroll Now". 
                      For paid courses, you'll be guided through the payment process.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I get a refund?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 30-day money-back guarantee on all paid courses.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do certificates work?</AccordionTrigger>
                    <AccordionContent>
                      Upon course completion, you'll receive a digital certificate that can be 
                      downloaded and shared. Some certificates are blockchain-verified.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutors">
            <Card>
              <CardHeader>
                <CardTitle>For Tutors</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I become a tutor?</AccordionTrigger>
                    <AccordionContent>
                      Sign up as a tutor, complete your profile with qualifications and expertise, 
                      and submit for verification. Once approved, you can start offering services.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I get paid?</AccordionTrigger>
                    <AccordionContent>
                      Payments are processed monthly through your preferred payment method. 
                      You can track your earnings in the Earnings dashboard.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freelancers">
            <Card>
              <CardHeader>
                <CardTitle>For Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I find projects?</AccordionTrigger>
                    <AccordionContent>
                      Browse the freelance marketplace, use filters to find relevant projects, 
                      and submit proposals to clients.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What fees does YEESP charge?</AccordionTrigger>
                    <AccordionContent>
                      YEESP charges a 15% commission on freelance project earnings.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
