import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-[#E8F0FF] via-[#F0F7FF] to-[#E8F0FF] dark:from-[#1A2238] dark:via-[#0f1724] dark:to-[#1A2238] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B3A67_1px,transparent_1px),linear-gradient(to_bottom,#2B3A67_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3A86FF_1px,transparent_1px),linear-gradient(to_bottom,#3A86FF_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00AEEF]/20 dark:bg-[#3A86FF]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00C896]/20 dark:bg-[#5EF38C]/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto text-center mb-16 z-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>support@yeesp.com</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Phone</CardTitle>
              <CardDescription>+1 (555) 123-4567</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Available 9 AM - 6 PM EST</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your inquiry..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}