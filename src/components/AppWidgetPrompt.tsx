
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Smartphone, Bell, Share2 } from 'lucide-react';
import { saveWidgetPreference, shareReelForNotification } from '@/services/reelService';
import { supabase } from '@/lib/supabase';

interface AppWidgetPromptProps {
  currentReelUrl?: string;
}

const AppWidgetPrompt: React.FC<AppWidgetPromptProps> = ({ currentReelUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  React.useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      
      // Subscribe to auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setIsAuthenticated(!!session);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, []);

  const handleEnableWidget = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (!isAuthenticated) {
        // For demo, we'll just show a notification
        // In a real app, we would redirect to login/signup
        toast.error("You need to be signed in to enable the widget");
        return;
      }
      
      await saveWidgetPreference(true);
      
      toast.success("App widget enabled! You'll now receive notifications for sequel reels.");
    } catch (error) {
      console.error("Error enabling widget:", error);
      toast.error("Failed to enable app widget. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleShareReel = async () => {
    if (!currentReelUrl) {
      toast.error("No reel currently selected to share");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (!isAuthenticated) {
        toast.error("You need to be signed in to share reels");
        return;
      }
      
      await shareReelForNotification(currentReelUrl);
      
      toast.success("Reel shared! We'll notify you when we find the sequel.");
    } catch (error) {
      console.error("Error sharing reel:", error);
      toast.error("Failed to share reel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Smartphone className="h-6 w-6 text-brand-purple" />
          <CardTitle>Enable App Widget</CardTitle>
        </div>
        <CardDescription>
          Turn PartTWO into a mobile widget to find sequels even faster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          With the PartTWO widget, you can share any Instagram reel directly to our app.
          We'll send you a notification with a link to the predicted sequel!
        </p>
        
        {currentReelUrl && (
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-md mb-4">
            <Share2 className="h-5 w-5 text-gray-500" />
            <div className="text-sm truncate">
              <span className="font-medium">Current reel:</span>
              <span className="ml-2 text-gray-500">{currentReelUrl.substring(0, 30)}...</span>
            </div>
          </div>
        )}
        
        {currentReelUrl && (
          <Button 
            onClick={handleShareReel}
            className="w-full mb-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800"
            disabled={isLoading}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share this reel for notification
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleEnableWidget}
          className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white"
          disabled={isLoading}
        >
          <Bell className="mr-2 h-4 w-4" />
          {isLoading ? 'Enabling...' : 'Enable Widget Notifications'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppWidgetPrompt;
