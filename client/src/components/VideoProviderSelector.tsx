import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Video, Wifi } from "lucide-react";

type VideoProvider = "dyte" | "zoom";

interface VideoProviderSelectorProps {
  value: VideoProvider;
  onChange: (provider: VideoProvider) => void;
  disabled?: boolean;
}

export function VideoProviderSelector({ value, onChange, disabled }: VideoProviderSelectorProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="video-provider">Video Conferencing Provider</Label>
      <RadioGroup
        id="video-provider"
        value={value}
        onValueChange={(val) => onChange(val as VideoProvider)}
        disabled={disabled}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className={`relative p-4 cursor-pointer transition-all border-2 ${
          value === "dyte" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
          <label htmlFor="provider-dyte" className="flex items-start gap-3 cursor-pointer">
            <RadioGroupItem value="dyte" id="provider-dyte" className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Video className="h-5 w-5 text-primary" />
                <span className="font-semibold">Dyte</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built-in video platform with seamless integration and automatic attendance tracking
              </p>
            </div>
          </label>
        </Card>

        <Card className={`relative p-4 cursor-pointer transition-all border-2 ${
          value === "zoom" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
          <label htmlFor="provider-zoom" className="flex items-start gap-3 cursor-pointer">
            <RadioGroupItem value="zoom" id="provider-zoom" className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Zoom</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Industry-standard video conferencing with advanced features and reliability
              </p>
            </div>
          </label>
        </Card>
      </RadioGroup>
    </div>
  );
}
