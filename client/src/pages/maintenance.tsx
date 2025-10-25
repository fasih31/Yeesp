
import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-12 pb-12 text-center">
          <Wrench className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Under Maintenance</h1>
          <p className="text-muted-foreground mb-6">
            We're currently performing scheduled maintenance. We'll be back soon!
          </p>
          <p className="text-sm text-muted-foreground">
            Expected downtime: 2 hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
