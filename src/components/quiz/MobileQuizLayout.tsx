import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QuizHeader } from './QuizHeader';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionNavigation } from './QuestionNavigation';
import { QuizResults } from './QuizResults';
import { QuizQuestion } from './types';

interface MobileQuizLayoutProps {
  currentModule: string;
  currentCourse: string;
  currentQuestionIndex: number;
  currentQuestions: QuizQuestion[];
  userAnswers: Record<number, string | string[]>;
  showResults: boolean;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  isQuestionAnswered: (index: number) => boolean;
  onBackToSelection: () => void;
  onReset: () => void;
  onSingleAnswer: (questionIndex: number, answer: string) => void;
  onMultipleAnswer: (questionIndex: number, answers: string[]) => void;
  onQuestionSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCloseResults: () => void;
}

export function MobileQuizLayout({
  currentModule,
  currentCourse,
  currentQuestionIndex,
  currentQuestions,
  userAnswers,
  showResults,
  score,
  correctAnswers,
  totalQuestions,
  isQuestionAnswered,
  onBackToSelection,
  onReset,
  onSingleAnswer,
  onMultipleAnswer,
  onQuestionSelect,
  onPrevious,
  onNext,
  onSubmit,
  onCloseResults
}: MobileQuizLayoutProps) {
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex] || '';

  return (
    <div className="min-h-screen bg-background">
      <QuizHeader
        currentModule={currentModule}
        currentCourse={currentCourse}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onReset={onReset}
        onBackToSelection={onBackToSelection}
        isMobile={true}
      />

      <div className="p-4 space-y-4">
        <QuestionDisplay
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          userAnswer={userAnswer}
          onSingleAnswer={onSingleAnswer}
          onMultipleAnswer={onMultipleAnswer}
          isMobile={true}
        />

        <QuestionNavigation
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          isQuestionAnswered={isQuestionAnswered}
          onQuestionSelect={onQuestionSelect}
          onPrevious={onPrevious}
          onNext={onNext}
          onSubmit={onSubmit}
          isMobile={true}
        />
      </div>

      {showResults && (
        <QuizResults
          score={score}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          onTryAgain={onReset}
          onClose={onCloseResults}
          isMobile={true}
        />
      )}
    </div>
  );
} 