import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  isQuestionAnswered: (index: number) => boolean;
  onQuestionSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isMobile?: boolean;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestionIndex,
  isQuestionAnswered,
  onQuestionSelect,
  onPrevious,
  onNext,
  onSubmit,
  isMobile = false
}: QuestionNavigationProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Question Navigation Buttons */}
          <div className={`flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
            {Array.from({ length: totalQuestions }, (_, index) => (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : isQuestionAnswered(index)
                    ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button
                onClick={onSubmit}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={onNext}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 