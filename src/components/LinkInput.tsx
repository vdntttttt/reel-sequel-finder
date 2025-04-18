
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LinkInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const LinkInput: React.FC<LinkInputProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      toast.error('Please enter an Instagram reel link');
      return;
    }
    
    if (!isValidInstagramUrl(inputValue)) {
      toast.error('Please enter a valid Instagram reel link');
      return;
    }
    
    onSubmit(inputValue.trim());
  };
  
  const isValidInstagramUrl = (url: string): boolean => {
    // Basic validation for Instagram URLs
    return url.includes('instagram.com') && 
           (url.includes('/reel/') || url.includes('/p/'));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste Instagram reel link here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white"
        >
          {isLoading ? 'Processing...' : 'Find Sequel'}
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Example: https://www.instagram.com/reel/C123456789/
      </p>
    </form>
  );
};

export default LinkInput;
