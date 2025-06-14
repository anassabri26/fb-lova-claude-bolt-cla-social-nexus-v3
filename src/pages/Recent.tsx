
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Clock, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Recent = () => {
  const recentPosts = [
    {
      id: 1,
      author: {
        name: 'Tech Insider',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      content: 'Breaking: New AI breakthrough announced at tech conference',
      timestamp: '5m',
      engagement: { likes: 234, comments: 45, shares: 12 }
    },
    {
      id: 2,
      author: {
        name: 'Design Studio',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Just launched our new design system. Check it out!',
      timestamp: '12m',
      engagement: { likes: 156, comments: 23, shares: 8 }
    }
  ];

  const handlePostInteraction = (action: string, postId: number) => {
    toast.success(`${action} on post ${postId}`);
    console.log(`${action} interaction on post:`, postId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-2 sm:px-4 py-6 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white p-6 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Most Recent</h1>
            </div>
            <p className="text-lg opacity-90">
              Latest posts and updates from your network
            </p>
          </div>

          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.author.name}</h3>
                        {post.author.verified && (
                          <Badge variant="secondary">✓</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{post.timestamp} ago</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePostInteraction('Liked', post.id)}
                    >
                      👍 {post.engagement.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePostInteraction('Commented', post.id)}
                    >
                      💬 {post.engagement.comments}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePostInteraction('Shared', post.id)}
                    >
                      🔄 {post.engagement.shares}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Recent;
