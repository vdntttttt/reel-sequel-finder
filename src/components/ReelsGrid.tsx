
import React from 'react';
import ReelCard from './ReelCard';
import { Reel } from '@/types/reel';

interface ReelsGridProps {
  reels: Reel[];
  predictedSequelIndex: number | null;
}

const ReelsGrid: React.FC<ReelsGridProps> = ({ reels, predictedSequelIndex }) => {
  if (!reels.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {reels.map((reel, index) => (
        <ReelCard
          key={reel.id}
          thumbnail={reel.thumbnail}
          username={reel.username}
          isPredictedSequel={index === predictedSequelIndex}
          reelUrl={reel.url}
          index={index}
        />
      ))}
    </div>
  );
};

export default ReelsGrid;
