
import React, { useState } from 'react';
import { Heart, ThumbsUp, Laugh, Angry, Frown, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';

export type ReactionType = 'like' | 'love' | 'laugh' | 'angry' | 'sad' | 'wow';

interface Reaction {
  type: ReactionType;
  icon: React.ComponentType<any>;
  color: string;
  label: string;
}

const reactions: Reaction[] = [
  { type: 'like', icon: ThumbsUp, color: 'text-blue-600', label: 'Like' },
  { type: 'love', icon: Heart, color: 'text-red-600', label: 'Love' },
  { type: 'laugh', icon: Laugh, color: 'text-yellow-600', label: 'Haha' },
  { type: 'wow', icon: Zap, color: 'text-orange-600', label: 'Wow' },
  { type: 'sad', icon: Frown, color: 'text-gray-600', label: 'Sad' },
  { type: 'angry', icon: Angry, color: 'text-red-700', label: 'Angry' },
];

interface ReactionPickerProps {
  onReactionSelect: (reaction: ReactionType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ReactionPicker = ({ onReactionSelect, isOpen, onClose }: ReactionPickerProps) => {
  if (!isOpen) return null;

  return (
    <Card className="absolute bottom-full left-0 mb-2 z-50 shadow-lg">
      <CardContent className="p-2">
        <div className="flex space-x-1">
          {reactions.map((reaction) => {
            const Icon = reaction.icon;
            return (
              <AccessibleButton
                key={reaction.type}
                variant="ghost"
                size="sm"
                className={`p-2 hover:scale-110 transition-transform ${reaction.color}`}
                onClick={() => {
                  onReactionSelect(reaction.type);
                  onClose();
                }}
                aria-label={reaction.label}
              >
                <Icon className="w-6 h-6" />
              </AccessibleButton>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReactionPicker;
export { reactions };
