import React from 'react';
import { CourseSelection } from './CourseSelection';
import { ModuleSelection } from './ModuleSelection';
import { WelcomeMessage } from './WelcomeMessage';
import { QuizHeader } from './QuizHeader';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionNavigation } from './QuestionNavigation';
import { QuizResults } from './QuizResults';
import { QuizData, QuizQuestion } from './types';

interface DesktopLayoutProps {
  quizData: QuizData;
  selectedCourse: string;
  currentCourse: string;
  currentModule: string;
  currentQuestionIndex: number;
  currentQuestions: QuizQuestion[];
  userAnswers: Record<number, string | string[]>;
  showResults: boolean;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  isQuestionAnswered: (index: number) => boolean;
  onCourseSelect: (course: string) => void;
  onStartQuiz: (course: string, module: string) => void;
  onReset: () => void;
  onSingleAnswer: (questionIndex: number, answer: string) => void;
  onMultipleAnswer: (questionIndex: number, answers: string[]) => void;
  onQuestionSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCloseResults: () => void;
}

export function DesktopLayout({
  quizData,
  selectedCourse,
  currentCourse,
  currentModule,
  currentQuestionIndex,
  currentQuestions,
  userAnswers,
  showResults,
  score,
  correctAnswers,
  totalQuestions,
  isQuestionAnswered,
  onCourseSelect,
  onStartQuiz,
  onReset,
  onSingleAnswer,
  onMultipleAnswer,
  onQuestionSelect,
  onPrevious,
  onNext,
  onSubmit,
  onCloseResults
}: DesktopLayoutProps) {
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex] || '';

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">CCNA Quiz App</h1>
        <p className="text-muted-foreground">Select a course and module to start your quiz</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Course Selection (25%) */}
        <div className="lg:col-span-1">
          <CourseSelection
            quizData={quizData}
            selectedCourse={selectedCourse}
            onCourseSelect={onCourseSelect}
          >
            <ModuleSelection
              quizData={quizData}
              selectedCourse={selectedCourse}
              onStartQuiz={onStartQuiz}
            />
          </CourseSelection>
        </div>

        {/* Right Content - Quiz Area (75%) */}
        <div className="lg:col-span-3">
          {!currentCourse || !currentModule ? (
            <WelcomeMessage />
          ) : (
            <div className="space-y-6">
              <QuizHeader
                currentModule={currentModule}
                currentCourse={currentCourse}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                onReset={onReset}
              />

              <QuestionDisplay
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                userAnswer={userAnswer}
                onSingleAnswer={onSingleAnswer}
                onMultipleAnswer={onMultipleAnswer}
              />

              <QuestionNavigation
                totalQuestions={totalQuestions}
                currentQuestionIndex={currentQuestionIndex}
                isQuestionAnswered={isQuestionAnswered}
                onQuestionSelect={onQuestionSelect}
                onPrevious={onPrevious}
                onNext={onNext}
                onSubmit={onSubmit}
              />
            </div>
          )}
        </div>
      </div>

      {showResults && (
        <QuizResults
          score={score}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          onTryAgain={onReset}
          onClose={onCloseResults}
        />
      )}
    </div>
  );
} 