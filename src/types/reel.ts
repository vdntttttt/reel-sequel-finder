
export interface Reel {
  id: string;
  url: string;
  thumbnail: string;
  username: string;
  description: string;
  createdAt: string;
  userId?: string;  // To associate reels with users
  isNotified?: boolean; // For tracking notification status
}

export interface UserPreference {
  id: string;
  userId: string;
  enableWidgetNotifications: boolean;
  createdAt: string;
}
