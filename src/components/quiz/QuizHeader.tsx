import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hash, RotateCcw } from 'lucide-react';

interface QuizHeaderProps {
  currentModule: string;
  currentCourse: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  onReset: () => void;
  onBackToSelection?: () => void;
  isMobile?: boolean;
}

export function QuizHeader({ 
  currentModule, 
  currentCourse, 
  currentQuestionIndex, 
  totalQuestions, 
  onReset, 
  onBackToSelection,
  isMobile = false 
}: QuizHeaderProps) {
  if (isMobile) {
    return (
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-foreground">{currentModule.split('|')[0].trim()}</h1>
            <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToSelection || onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-primary" />
              {currentModule}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <Badge variant="outline">{currentCourse}</Badge>
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onReset}
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Quiz
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress info without bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 