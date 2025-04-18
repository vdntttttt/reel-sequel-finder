
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Smartphone } from 'lucide-react';

const AppWidgetPrompt = () => {
  const handleEnableWidget = () => {
    // In a real implementation, this would initiate the process of adding the app widget
    // For now, we'll just show a toast notification
    toast.info("App widget functionality coming soon!");
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
        <p className="text-sm text-gray-600">
          With the PartTWO widget, you can share any Instagram reel directly to our app.
          We'll send you a notification with a link to the predicted sequel!
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleEnableWidget}
          className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white"
        >
          Enable Widget
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppWidgetPrompt;
