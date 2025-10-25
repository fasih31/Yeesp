import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Message, User } from "@shared/schema";

type ConversationPreview = {
  user: User;
  lastMessage: Message;
  unreadCount: number;
};

export default function StudentMessages() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // TODO: Get current user from auth context
  const currentUserId = "student-id";

  // Fetch conversations
  const { data: conversations } = useQuery<ConversationPreview[]>({
    queryKey: ["/api/messages/conversations", currentUserId],
    queryFn: async () => {
      // This endpoint would return conversation previews
      return [];
    },
  });

  // Fetch messages for selected conversation
  const { data: messages } = useQuery<Message[]>({
    queryKey: ["/api/messages/conversation", currentUserId, selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return [];
      return apiRequest(`/messages/conversation/${currentUserId}/${selectedUserId}`);
    },
    enabled: !!selectedUserId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("/messages", {
        method: "POST",
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: selectedUserId,
          content,
        }),
      });
    },
    onSuccess: () => {
      setMessageText("");
      queryClient.invalidateQueries({ 
        queryKey: ["/api/messages/conversation", currentUserId, selectedUserId] 
      });
    },
  });

  // WebSocket setup
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log("WebSocket connected");
      // Authenticate
      websocket.send(JSON.stringify({ 
        type: "auth", 
        userId: currentUserId 
      }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "message") {
        // Invalidate messages to refetch
        queryClient.invalidateQueries({ 
          queryKey: ["/api/messages/conversation"] 
        });
        
        // Show notification if not in active conversation
        if (data.senderId !== selectedUserId) {
          toast({
            title: "New Message",
            description: data.content,
          });
        }
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [currentUserId, selectedUserId, queryClient, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUserId) return;
    
    // Send via WebSocket for real-time delivery
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "message",
        senderId: currentUserId,
        receiverId: selectedUserId,
        content: messageText,
      }));
    }
    
    // Also save to database
    sendMessageMutation.mutate(messageText);
  };

  // Mock conversations for demo
  const mockConversations = [
    { id: "1", name: "Dr. Sarah Johnson", lastMessage: "Your assignment looks good!", time: "2m ago" },
    { id: "2", name: "Prof. Michael Chen", lastMessage: "Let's schedule a tutoring session", time: "1h ago" },
    { id: "3", name: "Support Team", lastMessage: "How can we help you?", time: "2d ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockConversations.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedUserId(chat.id)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                      selectedUserId === chat.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between">
                          <p className="font-medium truncate">{chat.name}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedUserId ? (
              <>
                <CardHeader className="border-b">
                  <CardTitle>
                    {mockConversations.find(c => c.id === selectedUserId)?.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    Online
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages && messages.length > 0 ? (
                      messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex gap-3 ${msg.senderId === currentUserId ? 'flex-row-reverse' : ''}`}
                        >
                          <Avatar>
                            <AvatarFallback>{msg.senderId === currentUserId ? 'Y' : 'T'}</AvatarFallback>
                          </Avatar>
                          <div 
                            className={`rounded-lg p-3 max-w-[70%] ${
                              msg.senderId === currentUserId 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        No messages yet. Start the conversation!
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
