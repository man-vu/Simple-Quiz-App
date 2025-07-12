import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SingleAnswer } from '@/components/questions/SingleAnswer';
import { MultipleAnswer } from '@/components/questions/MultipleAnswer';
import { QuizQuestion } from './types';

interface QuestionDisplayProps {
  question: QuizQuestion;
  questionIndex: number;
  userAnswer: string | string[];
  onSingleAnswer: (questionIndex: number, answer: string) => void;
  onMultipleAnswer: (questionIndex: number, answers: string[]) => void;
  isMobile?: boolean;
  showFeedback?: boolean;
}

export function QuestionDisplay({
  question,
  questionIndex,
  userAnswer,
  onSingleAnswer,
  onMultipleAnswer,
  isMobile = false,
  showFeedback = false
}: QuestionDisplayProps) {
  return (
    <Card>
      <CardContent className={isMobile ? "p-4" : "p-6"}>
        {question.question_type === 'SINGLE_ANSWER' ? (
          <SingleAnswer
            id={`question-${questionIndex}`}
            questionNumber={questionIndex + 1}
            instruction="Select the best answer from the options below."
            question={question.question}
            options={question.options.map((opt, idx) => ({
              id: `option-${idx}`,
              text: opt.option
            }))}
            correctAnswer={question.options.find(opt => opt.correct)?.option || ''}
            imageUrl={question.images[0]}
            value={userAnswer as string}
            onValueChange={(value) => onSingleAnswer(questionIndex, value)}
            showFeedback={showFeedback}
            explanation={question.explanation}
          />
        ) : (
          <MultipleAnswer
            id={`question-${questionIndex}`}
            questionNumber={questionIndex + 1}
            instruction="Select all correct answers from the options below."
            question={question.question}
            options={question.options.map((opt, idx) => ({
              id: `option-${idx}`,
              text: opt.option
            }))}
            correctAnswers={question.options.filter(opt => opt.correct).map(opt => opt.option)}
            imageUrl={question.images[0]}
            value={userAnswer as string[]}
            onValueChange={(value) => onMultipleAnswer(questionIndex, value)}
            showFeedback={showFeedback}
            explanation={question.explanation}
          />
        )}
      </CardContent>
    </Card>
  );
} 