
import React from 'react';

const LoadingState = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-brand-purple border-r-brand-pink border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      <div className="flex flex-col items-center mt-6 space-y-2">
        <h3 className="text-xl font-medium">Finding the sequel</h3>
        <p className="text-gray-500 text-center max-w-md">
          We're analyzing the creator's recent reels to predict the sequel...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
