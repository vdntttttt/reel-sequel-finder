import { Reel } from '@/types/reel';
import { supabase } from '@/lib/supabase';
import { findMostLikelySequel } from './aiService';

// Function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Extract username from Instagram reel URL
 */
const extractUsername = (reelUrl: string): string | null => {
  try {
    const url = new URL(reelUrl);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    // Instagram URLs typically have format: instagram.com/username/reel/reelId
    if (pathSegments.length >= 1) {
      return pathSegments[0];
    }
    return null;
  } catch (error) {
    console.error('Error extracting username:', error);
    return null;
  }
}

/**
 * Fetch creator's recent reels based on a reel URL
 * In a production app, this would be implemented as a Supabase Edge Function
 * to securely handle API keys for Instagram scraping
 */
export const fetchCreatorReels = async (reelUrl: string): Promise<Reel[]> => {
  console.log('Fetching reels for URL:', reelUrl);
  
  // In a real implementation, this would fetch data from Instagram API
  // via a Supabase Edge Function to keep API keys secure
  // For demo purposes, we're using mock data
  
  // Here we would normally send the request to our Supabase Edge Function
  // const { data, error } = await supabase.functions.invoke('fetch-creator-reels', {
  //   body: { reelUrl }
  // });
  
  // if (error) throw new Error(`Error fetching reels: ${error.message}`);
  // return data;
  
  // For demo purposes, we'll use mock data with a delay
  await delay(2000);
  
  // Extract username from URL (in a real app, this would be done server-side)
  const username = extractUsername(reelUrl) || 'creator1';
  
  // Mock data for testing
  const mockReels: Reel[] = [
    {
      id: '1',
      url: reelUrl, // This is the original reel
      thumbnail: 'https://source.unsplash.com/random/720x1280?sig=1',
      username,
      description: 'Check out this amazing tutorial! Part 1 #tutorial #part1',
      createdAt: '2023-04-15T12:00:00Z',
    },
    {
      id: '2',
      url: 'https://www.instagram.com/reel/mock2/',
      thumbnail: 'https://source.unsplash.com/random/720x1280?sig=2',
      username,
      description: 'Tutorial Part 2 - continuing where we left off! #tutorial #part2 #continuation',
      createdAt: '2023-04-16T12:00:00Z',
    },
    {
      id: '3',
      url: 'https://www.instagram.com/reel/mock3/',
      thumbnail: 'https://source.unsplash.com/random/720x1280?sig=3',
      username,
      description: 'Random reel about my day #dailyvlog',
      createdAt: '2023-04-17T12:00:00Z',
    },
    {
      id: '4',
      url: 'https://www.instagram.com/reel/mock4/',
      thumbnail: 'https://source.unsplash.com/random/720x1280?sig=4',
      username,
      description: 'Check out my new product! #promotion',
      createdAt: '2023-04-18T12:00:00Z',
    },
    {
      id: '5',
      url: 'https://www.instagram.com/reel/mock5/',
      thumbnail: 'https://source.unsplash.com/random/720x1280?sig=5',
      username,
      description: 'Part 3 of the tutorial series! #tutorial #part3',
      createdAt: '2023-04-19T12:00:00Z',
    },
    {
      id: '6',
      url: 'https://www.instagram.com/reel/mock6/',
      thumbnail: 'https://source.unsplash.com/random/720x1280?sig=6',
      username,
      description: 'Behind the scenes of my day #behindthescenes',
      createdAt: '2023-04-20T12:00:00Z',
    },
  ];
  
  // Store the search in history table for the user (if authenticated)
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('search_history').insert({
        user_id: user.id,
        reel_url: reelUrl,
        created_at: new Date().toISOString()
      });
    }
  } catch (err) {
    console.log('Not saving search history:', err);
  }
  
  return mockReels;
};

/**
 * Use AI to predict which reel is the sequel to the given reel
 */
export const predictSequelReel = async (reelUrl: string, reels: Reel[]): Promise<number> => {
  console.log('Predicting sequel for URL:', reelUrl);
  
  if (reels.length < 2) {
    return 0; // No sequels available
  }
  
  // Find the original reel in the array
  const originalReelIndex = reels.findIndex(reel => reel.url === reelUrl);
  
  if (originalReelIndex === -1) {
    // If original reel not found in array (unusual case), just return the next reel
    return 0;
  }
  
  const originalReel = reels[originalReelIndex];
  
  // Remove the original reel from candidates (can't be a sequel to itself)
  const candidateReels = reels.filter((_, index) => index !== originalReelIndex);
  
  // Use our AI service to find the most likely sequel
  const predictedIndex = findMostLikelySequel(originalReel, candidateReels);
  
  // Convert the predicted index in candidates back to the index in the original array
  // This is a bit complex since we removed the original reel from candidates
  let originalArrayIndex = predictedIndex;
  if (predictedIndex >= originalReelIndex) {
    originalArrayIndex = predictedIndex + 1;
  }
  
  return originalArrayIndex;
};

/**
 * Save a widget notification subscription
 */
export const saveWidgetPreference = async (enable: boolean): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to enable widget notifications');
  }
  
  const { error } = await supabase.from('user_preferences').upsert({
    user_id: user.id,
    enable_widget_notifications: enable,
    updated_at: new Date().toISOString()
  });
  
  if (error) {
    throw new Error(`Failed to save preferences: ${error.message}`);
  }
};

/**
 * Share a reel to get sequel notification
 */
export const shareReelForNotification = async (reelUrl: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to share reels for notifications');
  }
  
  // In a real app, we would trigger a background process here
  // For demo purposes, we'll just insert the request
  const { error } = await supabase.from('notification_requests').insert({
    user_id: user.id,
    reel_url: reelUrl,
    status: 'pending',
    created_at: new Date().toISOString()
  });
  
  if (error) {
    throw new Error(`Failed to save notification request: ${error.message}`);
  }
};
