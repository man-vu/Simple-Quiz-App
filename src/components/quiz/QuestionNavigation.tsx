import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  isQuestionAnswered: (index: number) => boolean;
  onQuestionSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isMobile?: boolean;
  feedbackShown: Record<number, boolean>;
  onShowFeedback: (questionIndex: number) => void;
  onHideFeedback: (questionIndex: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestionIndex,
  isQuestionAnswered,
  onQuestionSelect,
  onPrevious,
  onNext,
  onSubmit,
  isMobile = false,
  feedbackShown,
  onShowFeedback,
  onHideFeedback
}: QuestionNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to center the current question on mobile
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const questionButtons = container.querySelectorAll('button');
      const currentButton = questionButtons[currentQuestionIndex];
      
      if (currentButton) {
        const containerWidth = container.offsetWidth;
        const buttonWidth = currentButton.offsetWidth;
        const buttonLeft = currentButton.offsetLeft;
        // Move the selected question more to the left by subtracting an offset
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2) - (containerWidth * 0.25);
        
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [currentQuestionIndex, isMobile]);

  const handleNextClick = () => {
    if (!feedbackShown[currentQuestionIndex]) {
      // First click: Show feedback
      onShowFeedback(currentQuestionIndex);
    } else {
      // Second click: Move to next question
      onHideFeedback(currentQuestionIndex);
      onNext();
    }
  };

  const isCurrentQuestionFeedbackShown = feedbackShown[currentQuestionIndex];

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
                <div 
                  ref={scrollContainerRef}
                  className="flex-1 overflow-x-auto scrollbar-hide"
                >
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
                    variant={isCurrentQuestionFeedbackShown ? "default" : "outline"}
                    size="icon"
                    onClick={handleNextClick}
                    className="flex-shrink-0"
                  >
                    {isCurrentQuestionFeedbackShown ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
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