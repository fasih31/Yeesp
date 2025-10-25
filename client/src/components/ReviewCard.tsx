import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerAvatar?: string;
  createdAt: string;
}

export function ReviewCard({ rating, comment, reviewerName, reviewerAvatar, createdAt }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={reviewerAvatar} />
            <AvatarFallback>{reviewerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">{reviewerName}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed">{comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
