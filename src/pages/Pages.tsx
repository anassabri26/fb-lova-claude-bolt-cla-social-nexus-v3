
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Flag, Users, Star, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Pages = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const pages = [
    {
      id: 1,
      name: 'Tech News Daily',
      category: 'News & Media',
      followers: '2.5M',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      verified: true,
      isFollowing: true
    },
    {
      id: 2,
      name: 'Design Inspiration',
      category: 'Art & Design',
      followers: '1.8M',
      avatar: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      verified: true,
      isFollowing: false
    },
    {
      id: 3,
      name: 'Startup Central',
      category: 'Business',
      followers: '950K',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      verified: false,
      isFollowing: true
    }
  ];

  const handlePageAction = (action: string, pageId: number) => {
    toast.success(`${action} page ${pageId}`);
    console.log(`${action} action on page:`, pageId);
  };

  const handleCreatePage = () => {
    toast.success('Create page modal opened');
    console.log('Create page clicked');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching pages for: ${searchQuery}`);
      console.log('Page search:', searchQuery);
    }
  };

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-2 sm:px-4 py-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white p-6 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Flag className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Pages</h1>
            </div>
            <p className="text-lg opacity-90">
              Discover and follow your favorite pages
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            <Button onClick={handleCreatePage} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Page</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPages.map((page) => (
              <Card key={page.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={page.avatar} />
                      <AvatarFallback>{page.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{page.name}</h3>
                        {page.verified && (
                          <Badge variant="secondary">✓</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{page.category}</p>
                      <p className="text-sm text-gray-400">{page.followers} followers</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button
                      variant={page.isFollowing ? "outline" : "default"}
                      size="sm"
                      onClick={() => handlePageAction(page.isFollowing ? 'Unfollowed' : 'Followed', page.id)}
                      className="flex-1"
                    >
                      {page.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageAction('Visited', page.id)}
                    >
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'No pages available at the moment'}
              </p>
            </div>
          )}
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Pages;
