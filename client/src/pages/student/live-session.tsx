
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Mic, MicOff, VideoOff, Monitor, MessageSquare, Users } from "lucide-react";

export default function LiveSession() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted flex items-center justify-center rounded-t-lg">
                  <p className="text-muted-foreground">Video Stream</p>
                </div>
                <div className="p-4 flex items-center justify-between border-t">
                  <div className="flex items-center gap-2">
                    <Badge>Live</Badge>
                    <span className="text-sm">React Advanced Patterns with Dr. Johnson</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline"><Mic className="h-4 w-4" /></Button>
                    <Button size="icon" variant="outline"><Video className="h-4 w-4" /></Button>
                    <Button size="icon" variant="outline"><Monitor className="h-4 w-4" /></Button>
                    <Button variant="destructive">Leave</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">Slide Deck.pdf</Button>
                  <Button variant="outline" className="w-full justify-start">Code Examples.zip</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <p className="text-sm text-muted-foreground">Chat messages will appear here...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
