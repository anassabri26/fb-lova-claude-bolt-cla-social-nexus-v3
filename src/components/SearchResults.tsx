
import React from 'react';
import { Users, Hash, MapPin, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const mockResults = {
    people: [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        mutualFriends: 5,
        location: 'San Francisco, CA'
      },
      {
        id: '2',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        mutualFriends: 2,
        location: 'Los Angeles, CA'
      }
    ],
    groups: [
      {
        id: '1',
        name: 'React Developers',
        members: 1250,
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
      }
    ],
    pages: [
      {
        id: '1',
        name: 'Tech News Daily',
        followers: 15600,
        category: 'Media/News Company'
      }
    ],
    posts: [
      {
        id: '1',
        content: 'Just finished building an amazing React application!',
        author: 'Sarah Johnson',
        timestamp: '2h ago'
      }
    ]
  };

  const handleAddFriend = (person: any) => {
    toast.success(`Friend request sent to ${person.name}`);
    console.log('Add friend:', person);
  };

  const handleJoinGroup = (group: any) => {
    toast.success(`Joined ${group.name}`);
    console.log('Join group:', group);
  };

  const handleFollowPage = (page: any) => {
    toast.success(`Following ${page.name}`);
    console.log('Follow page:', page);
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Search results for "{query}"</h3>
          <AccessibleButton variant="ghost" size="sm" onClick={onClose}>
            ✕
          </AccessibleButton>
        </div>

        {/* People */}
        {mockResults.people.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              People
            </h4>
            <div className="space-y-2">
              {mockResults.people.map(person => (
                <div key={person.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{person.name}</div>
                      <div className="text-xs text-gray-500">{person.mutualFriends} mutual friends</div>
                    </div>
                  </div>
                  <AccessibleButton 
                    size="sm" 
                    onClick={() => handleAddFriend(person)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Friend
                  </AccessibleButton>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groups */}
        {mockResults.groups.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Groups
            </h4>
            <div className="space-y-2">
              {mockResults.groups.map(group => (
                <div key={group.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm">{group.name}</div>
                      <div className="text-xs text-gray-500">{group.members} members</div>
                    </div>
                  </div>
                  <AccessibleButton 
                    size="sm" 
                    onClick={() => handleJoinGroup(group)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Join
                  </AccessibleButton>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        {mockResults.posts.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Hash className="w-4 h-4 mr-1" />
              Posts
            </h4>
            <div className="space-y-2">
              {mockResults.posts.map(post => (
                <div key={post.id} className="p-2 hover:bg-gray-50 rounded">
                  <div className="text-sm text-gray-900 mb-1">{post.content}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.author} • {post.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
