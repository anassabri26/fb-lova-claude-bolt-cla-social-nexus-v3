
import React from 'react';
import { MapPin, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';

interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  seller: {
    name: string;
    avatar: string;
  };
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  category: string;
  description: string;
}

interface MarketplaceItemCardProps {
  item: MarketplaceItem;
  onContact: (seller: any) => void;
  onSave: (item: MarketplaceItem) => void;
}

const MarketplaceItemCard = ({ item, onContact, onSave }: MarketplaceItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">${item.price}</h3>
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => onSave(item)}
              className="p-1"
            >
              <Heart className="w-4 h-4" />
            </AccessibleButton>
          </div>
          
          <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
            <MapPin className="w-3 h-3" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={item.seller.avatar} />
                <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{item.seller.name}</span>
            </div>
            
            <AccessibleButton
              variant="outline"
              size="sm"
              onClick={() => onContact(item.seller)}
              className="flex items-center space-x-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Contact</span>
            </AccessibleButton>
          </div>
          
          <div className="mt-2">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {item.condition}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceItemCard;
