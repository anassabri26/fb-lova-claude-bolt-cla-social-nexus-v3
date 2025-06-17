import React from 'react';
import { MapPin, MessageCircle, Share, Heart, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface MarketplaceItemProps {
  item: {
    id: string;
    title: string;
    price: string;
    location: string;
    seller: {
      name: string;
      avatar: string;
    };
    image: string;
    category: string;
    condition: string;
    postedDate: string;
    description: string;
    isSaved: boolean;
  };
  onItemClick: (item: any) => void;
  onSaveItem: (itemId: string) => void;
  onMessageSeller: (sellerName: string) => void;
  onShare: (itemTitle: string) => void;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  item,
  onItemClick,
  onSaveItem,
  onMessageSeller,
  onShare
}) => {
  return (
    <Card 
      key={item.id} 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
      onClick={() => onItemClick(item)}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSaveItem(item.id);
          }}
          className={`absolute top-2 right-2 rounded-full ${
            item.isSaved ? 'text-red-600 bg-white/90' : 'text-gray-600 bg-white/90'
          }`}
        >
          <Heart className={`w-4 h-4 ${item.isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
            <span className="font-bold text-blue-600">{item.price}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="secondary">{item.category}</Badge>
            <Badge variant="outline">{item.condition}</Badge>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={item.seller.avatar} />
                <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{item.seller.name}</span>
            </div>
            <span className="text-xs text-gray-500">{item.postedDate}</span>
          </div>

          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMessageSeller(item.seller.name);
              }}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onShare(item.title);
              }}
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceItem;