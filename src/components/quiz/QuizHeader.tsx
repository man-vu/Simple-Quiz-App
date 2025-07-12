import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Hash, RotateCcw } from 'lucide-react';

interface QuizHeaderProps {
  currentModule: string;
  currentCourse: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  onReset: () => void;
  isMobile?: boolean;
}

export function QuizHeader({ 
  currentModule, 
  currentCourse, 
  currentQuestionIndex, 
  totalQuestions, 
  onReset, 
  isMobile = false 
}: QuizHeaderProps) {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (isMobile) {
    return (
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">{currentModule.split('|')[0].trim()}</h1>
            <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
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
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
} 