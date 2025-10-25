
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink, Heart, MessageSquare, Eye, Plus } from 'lucide-react';

export default function ProjectShowcase() {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      author: 'Alice Johnson',
      description: 'A modern admin dashboard built with React and TypeScript',
      thumbnail: null,
      tags: ['React', 'TypeScript', 'Tailwind'],
      likes: 42,
      views: 234,
      comments: 8,
    },
    {
      id: 2,
      title: 'AI Chatbot',
      author: 'Bob Smith',
      description: 'Natural language chatbot using OpenAI API',
      thumbnail: null,
      tags: ['Python', 'OpenAI', 'Flask'],
      likes: 38,
      views: 189,
      comments: 12,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Project Showcase</h1>
          <p className="text-muted-foreground">
            Share your projects and get inspired by others
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Share Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover-elevate">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {project.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{project.author}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {project.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {project.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {project.comments}
                  </span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                View Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
