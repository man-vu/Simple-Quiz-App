import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface WelcomeMessageProps {
  isMobile?: boolean;
}

export function WelcomeMessage({ isMobile = false }: WelcomeMessageProps) {
  return (
    <Card>
      <CardContent className={isMobile ? "p-6" : "p-8"}>
        <div className="text-center">
          <BookOpen className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} text-muted-foreground mx-auto mb-4`} />
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground mb-2`}>
            Welcome to CCNA Quiz App
          </h2>
          <p className="text-muted-foreground mb-6">
            {isMobile 
              ? "Tap the menu button to select a course and module to start your quiz."
              : "Select a course and module from the left sidebar to start your quiz."
            }
          </p>
          <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-4 max-w-2xl mx-auto'}`}>
            <div className="text-left p-4 border border-border rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Available Courses:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CCNA 1: Introduction to Networks</li>
                <li>• CCNA 2: Switching, Routing and Wireless</li>
              </ul>
            </div>
            <div className="text-left p-4 border border-border rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Features:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multiple choice questions</li>
                <li>• Progress tracking</li>
                <li>• Instant feedback</li>
                <li>• Score calculation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 