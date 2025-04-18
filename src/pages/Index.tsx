
import React, { useState } from 'react';
import Header from '@/components/Header';
import LinkInput from '@/components/LinkInput';
import ReelsGrid from '@/components/ReelsGrid';
import LoadingState from '@/components/LoadingState';
import AppWidgetPrompt from '@/components/AppWidgetPrompt';
import { Separator } from '@/components/ui/separator';
import { fetchCreatorReels, predictSequelReel } from '@/services/reelService';
import { Reel } from '@/types/reel';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reels, setReels] = useState<Reel[]>([]);
  const [predictedSequelIndex, setPredictedSequelIndex] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (url: string) => {
    try {
      setIsLoading(true);
      setHasSearched(true);
      
      // Fetch creator's recent reels
      const fetchedReels = await fetchCreatorReels(url);
      setReels(fetchedReels);
      
      // Predict which reel is the sequel
      const sequelIndex = await predictSequelReel(url, fetchedReels);
      setPredictedSequelIndex(sequelIndex);
      
      // Show success toast
      toast.success("We found the sequel! Check out the highlighted reel.");
    } catch (error) {
      console.error("Error processing request:", error);
      toast.error("Failed to process the Instagram reel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
            Find the Sequel to Any Instagram Reel
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tired of searching through a creator's profile to find part 2? 
            Just paste the reel link below, and we'll use AI to find the sequel for you.
          </p>
        </section>
        
        <section className="mb-10">
          <LinkInput onSubmit={handleSubmit} isLoading={isLoading} />
        </section>
        
        {isLoading ? (
          <LoadingState />
        ) : (
          hasSearched && (
            <section className="mb-10 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">
                {predictedSequelIndex !== null 
                  ? "We found the sequel!" 
                  : "Creator's recent reels"}
              </h2>
              <ReelsGrid 
                reels={reels} 
                predictedSequelIndex={predictedSequelIndex} 
              />
            </section>
          )
        )}
        
        {hasSearched && !isLoading && (
          <>
            <Separator className="my-10" />
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Want to find sequels even faster?
              </h2>
              <AppWidgetPrompt />
            </section>
          </>
        )}
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} PartTWO - Find Instagram Reel Sequels Instantly</p>
        <p className="mt-1">This is a concept app and not affiliated with Instagram</p>
      </footer>
    </div>
  );
};

export default Index;
