
import { Reel } from '@/types/reel';

// Mock AI service that would use NLP in a real implementation
// For demo purposes, this uses a simple keyword matching algorithm

/**
 * Analyze a reel description to extract key topics and identifiers
 */
export const analyzeReelDescription = (description: string) => {
  // Convert to lowercase for case-insensitive matching
  const lowerDesc = description.toLowerCase();
  
  // Extract potential part numbers
  const partMatch = lowerDesc.match(/part\s*(\d+)/i);
  const partNumber = partMatch ? parseInt(partMatch[1], 10) : null;
  
  // Extract hashtags
  const hashtags = (lowerDesc.match(/#\w+/g) || []).map(tag => tag.slice(1));
  
  // Check for sequel indicators
  const hasSequelIndicator = 
    lowerDesc.includes('sequel') || 
    lowerDesc.includes('part') || 
    lowerDesc.includes('continued') ||
    lowerDesc.includes('continuation') ||
    lowerDesc.includes('follow up');
  
  return {
    partNumber,
    hashtags,
    hasSequelIndicator,
    originalText: description
  };
};

/**
 * Find the most likely sequel in a list of reels
 * In a real implementation, this would use more sophisticated NLP techniques
 */
export const findMostLikelySequel = (originalReel: Reel, candidateReels: Reel[]): number => {
  // Analyze the original reel
  const originalAnalysis = analyzeReelDescription(originalReel.description);
  
  // If we have a part number, look for the next part
  if (originalAnalysis.partNumber !== null) {
    const nextPartNumber = originalAnalysis.partNumber + 1;
    
    // Find reels that match the next part number
    for (let i = 0; i < candidateReels.length; i++) {
      const candidateAnalysis = analyzeReelDescription(candidateReels[i].description);
      if (candidateAnalysis.partNumber === nextPartNumber) {
        return i;
      }
    }
  }
  
  // If we didn't find by part number, check hashtags and sequel indicators
  let bestMatchIndex = 0;
  let bestMatchScore = 0;
  
  candidateReels.forEach((reel, index) => {
    const candidateAnalysis = analyzeReelDescription(reel.description);
    let score = 0;
    
    // Check for shared hashtags
    const sharedHashtags = candidateAnalysis.hashtags.filter(tag => 
      originalAnalysis.hashtags.includes(tag)
    );
    score += sharedHashtags.length * 2;
    
    // Boost score if it has sequel indicators
    if (candidateAnalysis.hasSequelIndicator) {
      score += 3;
    }
    
    // Date proximity boost (newer reels are more likely to be sequels)
    const originalDate = new Date(originalReel.createdAt);
    const candidateDate = new Date(reel.createdAt);
    if (candidateDate > originalDate) {
      // Newer reels get a boost, with diminishing returns for much older reels
      const daysDifference = Math.floor((candidateDate.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDifference < 7) {
        score += (7 - daysDifference);
      }
    }
    
    if (score > bestMatchScore) {
      bestMatchScore = score;
      bestMatchIndex = index;
    }
  });
  
  return bestMatchIndex;
};
