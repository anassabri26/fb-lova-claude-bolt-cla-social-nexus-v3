
import React from 'react';
import { Search, Users, Hash, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  onClose: () => void;
}

const SearchDropdown = ({ isOpen, query, onClose }: SearchDropdownProps) => {
  if (!isOpen) return null;

  const mockResults = [
    {
      type: 'person',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5
    },
    {
      type: 'person', 
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 2
    },
    {
      type: 'group',
      name: 'React Developers',
      members: 1250
    },
    {
      type: 'page',
      name: 'Tech News Daily',
      followers: 15600
    }
  ];

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      <div className="p-3">
        <div className="text-sm text-gray-500 mb-3">
          Search results for "{query}"
        </div>
        
        <div className="space-y-2">
          {mockResults.map((result, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={onClose}
            >
              {result.type === 'person' && (
                <>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={result.avatar} />
                    <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{result.name}</div>
                    <div className="text-xs text-gray-500">{result.mutualFriends} mutual friends</div>
                  </div>
                </>
              )}
              
              {result.type === 'group' && (
                <>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{result.name}</div>
                    <div className="text-xs text-gray-500">{result.members} members</div>
                  </div>
                </>
              )}
              
              {result.type === 'page' && (
                <>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{result.name}</div>
                    <div className="text-xs text-gray-500">{result.followers} followers</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
