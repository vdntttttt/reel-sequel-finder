
import { Reel } from '@/types/reel';

// This is a mock service that simulates fetching data from Instagram
// In a real implementation, this would be replaced with actual API calls

// Function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for testing
const mockReels: Reel[] = [
  {
    id: '1',
    url: 'https://www.instagram.com/reel/mock1/',
    thumbnail: 'https://source.unsplash.com/random/720x1280?sig=1',
    username: 'creator1',
    description: 'Check out this amazing tutorial! Part 1 #tutorial #part1',
    createdAt: '2023-04-15T12:00:00Z',
  },
  {
    id: '2',
    url: 'https://www.instagram.com/reel/mock2/',
    thumbnail: 'https://source.unsplash.com/random/720x1280?sig=2',
    username: 'creator1',
    description: 'Tutorial Part 2 - continuing where we left off! #tutorial #part2 #continuation',
    createdAt: '2023-04-16T12:00:00Z',
  },
  {
    id: '3',
    url: 'https://www.instagram.com/reel/mock3/',
    thumbnail: 'https://source.unsplash.com/random/720x1280?sig=3',
    username: 'creator1',
    description: 'Random reel about my day #dailyvlog',
    createdAt: '2023-04-17T12:00:00Z',
  },
  {
    id: '4',
    url: 'https://www.instagram.com/reel/mock4/',
    thumbnail: 'https://source.unsplash.com/random/720x1280?sig=4',
    username: 'creator1',
    description: 'Check out my new product! #promotion',
    createdAt: '2023-04-18T12:00:00Z',
  },
  {
    id: '5',
    url: 'https://www.instagram.com/reel/mock5/',
    thumbnail: 'https://source.unsplash.com/random/720x1280?sig=5',
    username: 'creator1',
    description: 'Part 3 of the tutorial series! #tutorial #part3',
    createdAt: '2023-04-19T12:00:00Z',
  },
  {
    id: '6',
    url: 'https://www.instagram.com/reel/mock6/',
    thumbnail: 'https://source.unsplash.com/random/720x1280?sig=6',
    username: 'creator1',
    description: 'Behind the scenes of my day #behindthescenes',
    createdAt: '2023-04-20T12:00:00Z',
  },
];

/**
 * Fetch creator's recent reels based on a reel URL
 * This is a mock implementation
 */
export const fetchCreatorReels = async (reelUrl: string): Promise<Reel[]> => {
  console.log('Fetching reels for URL:', reelUrl);
  // Simulate API delay
  await delay(2000);
  return mockReels;
};

/**
 * Use AI to predict which reel is the sequel to the given reel
 * This is a mock implementation that simulates AI prediction
 */
export const predictSequelReel = async (reelUrl: string, reels: Reel[]): Promise<number> => {
  console.log('Predicting sequel for URL:', reelUrl);
  // Simulate AI processing delay
  await delay(1500);
  
  // This is a mock implementation that returns index 1 as the predicted sequel
  // In a real implementation, this would use NLP to analyze descriptions
  // and determine which reel is most likely to be a sequel
  return 1;
};
