
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Book, CreditCard, Settings, MessageCircle } from "lucide-react";

const categories = [
  { icon: Book, title: "Getting Started", count: 12 },
  { icon: CreditCard, title: "Payments & Billing", count: 8 },
  { icon: Settings, title: "Account Settings", count: 15 },
  { icon: MessageCircle, title: "Technical Support", count: 10 }
];

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "Browse courses, click on the one you want, and click the 'Enroll Now' button. You'll be guided through the payment process."
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee for all courses. Contact support to request a refund."
  },
  {
    question: "How do I become a tutor?",
    answer: "Register as a tutor, complete your profile with qualifications, and submit for verification. Once approved, you can create courses and sessions."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital wallets through our secure payment processor Stripe."
  },
  {
    question: "How do I access my certificates?",
    answer: "Go to your dashboard, navigate to 'Certificates', and download your earned certificates as PDF files."
  }
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">How can we help you?</h1>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {categories.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.count} articles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6">Our support team is here to assist you</p>
            <Button size="lg">Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
