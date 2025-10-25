
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MessageSquare, ThumbsUp, Pin, TrendingUp, Plus } from "lucide-react";

export default function DiscussionForum() {
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const categories = [
    { value: "all", label: "All Discussions" },
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "python", label: "Python" },
    { value: "general", label: "General" },
  ];

  const discussions = [
    {
      id: 1,
      title: "How to implement React hooks effectively?",
      author: "John Doe",
      category: "react",
      replies: 12,
      likes: 8,
      views: 234,
      isPinned: true,
      timestamp: "2 hours ago",
      preview: "I'm having trouble understanding useEffect. Can someone explain...",
    },
    {
      id: 2,
      title: "Best practices for async/await in JavaScript",
      author: "Jane Smith",
      category: "javascript",
      replies: 24,
      likes: 15,
      views: 456,
      isPinned: false,
      timestamp: "5 hours ago",
      preview: "What are the recommended patterns for error handling with async/await?",
    },
    {
      id: 3,
      title: "Python virtual environments explained",
      author: "Mike Johnson",
      category: "python",
      replies: 8,
      likes: 5,
      views: 167,
      isPinned: false,
      timestamp: "1 day ago",
      preview: "Can someone break down the differences between venv, virtualenv, and conda?",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Discussion Forum</h1>
          <p className="text-muted-foreground">Ask questions and help others</p>
        </div>
        <Dialog open={isNewThreadOpen} onOpenChange={setIsNewThreadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>
                Ask a question or share knowledge with the community
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="What's your question or topic?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="general">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Provide details about your question..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewThreadOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsNewThreadOpen(false)}>
                Post Discussion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="unanswered">Unanswered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover-elevate cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {discussion.isPinned && (
                      <Pin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    )}
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{discussion.title}</CardTitle>
                      <CardDescription className="mb-2">
                        Posted by {discussion.author} • {discussion.timestamp}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {discussion.preview}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{discussion.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{discussion.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{discussion.views} views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="following">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Follow discussions to see them here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-posts">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't posted any discussions yet
              </p>
              <Button onClick={() => setIsNewThreadOpen(true)}>
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
