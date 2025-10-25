
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: "Alice Smith", points: 2450, badge: "gold" },
    { rank: 2, name: "Bob Johnson", points: 2100, badge: "silver" },
    { rank: 3, name: "Carol White", points: 1950, badge: "bronze" }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank among peers</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {leaders.map((leader) => (
          <Card key={leader.rank}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-muted-foreground w-12">
                  #{leader.rank}
                </div>
                {leader.rank === 1 && <Trophy className="h-8 w-8 text-yellow-500" />}
                {leader.rank === 2 && <Medal className="h-8 w-8 text-gray-400" />}
                {leader.rank === 3 && <Award className="h-8 w-8 text-orange-600" />}
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{leader.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{leader.name}</p>
                  <p className="text-sm text-muted-foreground">{leader.points} points</p>
                </div>
                <Badge>{leader.badge}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
