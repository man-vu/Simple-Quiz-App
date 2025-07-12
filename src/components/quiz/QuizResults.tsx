import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onTryAgain: () => void;
  onClose: () => void;
  isMobile?: boolean;
}

export function QuizResults({ 
  score, 
  correctAnswers, 
  totalQuestions, 
  onTryAgain, 
  onClose, 
  isMobile = false 
}: QuizResultsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} mx-4`}>
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="text-4xl font-bold text-primary mb-2">
              {Math.round(score)}%
            </div>
            <div className="text-lg text-muted-foreground">
              {score >= 70 ? (
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  Passed!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                  <XCircle className="h-5 w-5" />
                  Try Again
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Correct Answers:</span>
              <span className="font-medium text-foreground">{correctAnswers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Questions:</span>
              <span className="font-medium text-foreground">{totalQuestions}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onTryAgain}
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 