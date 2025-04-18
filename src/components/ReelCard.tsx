
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReelCardProps {
  thumbnail: string;
  username: string;
  isPredictedSequel: boolean;
  reelUrl: string;
  index: number;
}

const ReelCard: React.FC<ReelCardProps> = ({
  thumbnail,
  username,
  isPredictedSequel,
  reelUrl,
  index,
}) => {
  return (
    <a 
      href={reelUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block transition-transform hover:scale-105 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className={`overflow-hidden relative ${isPredictedSequel ? 'ring-4 ring-brand-purple' : ''}`}>
        <CardContent className="p-0">
          <div className="relative aspect-[9/16] w-full">
            <img 
              src={thumbnail} 
              alt={`Reel by ${username}`}
              className="w-full h-full object-cover"
            />
            {isPredictedSequel && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 to-brand-pink/40" />
                <div className="absolute top-2 right-2 bg-brand-purple text-white text-xs font-bold py-1 px-2 rounded-full">
                  SEQUEL
                </div>
              </>
            )}
          </div>
          <div className="p-3">
            <p className="text-sm font-medium truncate">@{username}</p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default ReelCard;
