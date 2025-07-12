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
    <>
      {/* Spacer div to prevent content from being hidden behind fixed navigation */}
      <div className="h-20" />
      
      {/* Fixed navigation at bottom */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-background shadow-lg border-t">
        <Card className="rounded-t-lg rounded-b-none border-none shadow-none bg-transparent">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Question Navigation with Fixed Previous/Next Icons */}
              <div className="flex items-center gap-2">
                {/* Previous Button - Always Visible */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onPrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex-shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                {/* Question Numbers - Scrollable */}
                <div className="flex-1 overflow-x-auto">
                  <div className="flex gap-2 min-w-max px-2">
                    {Array.from({ length: totalQuestions }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => onQuestionSelect(index)}
                        className={`w-8 h-8 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
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
                </div>

                {/* Next/Submit Button - Always Visible */}
                {currentQuestionIndex === totalQuestions - 1 ? (
                  <Button
                    size="icon"
                    onClick={onSubmit}
                    className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onNext}
                    className="flex-shrink-0"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 