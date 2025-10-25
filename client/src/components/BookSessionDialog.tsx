import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VideoProviderSelector } from "./VideoProviderSelector";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@shared/schema";

interface BookSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutor: User;
}

export function BookSessionDialog({ open, onOpenChange, tutor }: BookSessionDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("60");
  const [videoProvider, setVideoProvider] = useState<"dyte" | "zoom">("dyte");
  const [notes, setNotes] = useState("");

  const bookSessionMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/sessions", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Session Booked!",
        description: "Your tutoring session has been scheduled successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/my"] });
      onOpenChange(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book session. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
    setDuration("60");
    setVideoProvider("dyte");
    setNotes("");
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your session.",
        variant: "destructive",
      });
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const scheduledAt = new Date(selectedDate);
    scheduledAt.setHours(hours, minutes, 0, 0);

    bookSessionMutation.mutate({
      tutorId: tutor.id,
      title: `Tutoring Session with ${tutor.fullName}`,
      scheduledAt: scheduledAt.toISOString(),
      duration: parseInt(duration),
      videoProvider,
      notes,
      price: tutor.hourlyRate || 50,
      status: "scheduled",
    });
  };

  const totalPrice = ((tutor.hourlyRate || 50) * (parseInt(duration) / 60)).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Session with {tutor.fullName}</DialogTitle>
          <DialogDescription>
            Schedule a one-on-one tutoring session. Rate: ${tutor.hourlyRate || 50}/hour
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Video Provider Selection */}
          <VideoProviderSelector
            value={videoProvider}
            onChange={setVideoProvider}
          />

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="What topics would you like to cover in this session?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Price:</span>
              <span className="text-2xl font-bold">${totalPrice}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {parseInt(duration)} minutes at ${tutor.hourlyRate || 50}/hour
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={bookSessionMutation.isPending}
          >
            {bookSessionMutation.isPending ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
