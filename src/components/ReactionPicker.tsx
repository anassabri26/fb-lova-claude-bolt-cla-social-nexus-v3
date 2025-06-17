import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ReactionPickerProps {
  onSelect: (reaction: string) => void;
  position?: 'top' | 'bottom';
  className?: string;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ 
  onSelect, 
  position = 'top',
  className = ''
}) => {
  const reactions = [
    { emoji: '👍', name: 'Like' },
    { emoji: '❤️', name: 'Love' },
    { emoji: '😆', name: 'Haha' },
    { emoji: '😮', name: 'Wow' },
    { emoji: '😢', name: 'Sad' },
    { emoji: '😡', name: 'Angry' }
  ];

  return (
    <Card className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 p-1 shadow-lg z-50 ${className}`}>
      <div className="flex space-x-1">
        {reactions.map((reaction) => (
          <Button
            key={reaction.name}
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-transform hover:scale-125"
            onClick={() => onSelect(reaction.emoji)}
            title={reaction.name}
          >
            <span className="text-xl">{reaction.emoji}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default ReactionPicker;