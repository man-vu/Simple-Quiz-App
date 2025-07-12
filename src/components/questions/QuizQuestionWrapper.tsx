import { useState, useEffect } from 'react';
import { SingleAnswer } from './SingleAnswer';
import { MultipleAnswer } from './MultipleAnswer';

interface QuizOption {
  option: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  images: string[];
  options: QuizOption[];
  question_type: 'SINGLE_ANSWER' | 'MULTIPLE_ANSWER';
  explanation: string;
}

interface QuizQuestionWrapperProps {
  question: QuizQuestion;
  questionIndex: number;
  onAnswerChange: (questionIndex: number, answer: string | string[]) => void;
  userAnswer?: string | string[];
}

export function QuizQuestionWrapper({
  question,
  questionIndex,
  onAnswerChange,
  userAnswer
}: QuizQuestionWrapperProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Initialize state from userAnswer prop
  useEffect(() => {
    if (userAnswer) {
      if (question.question_type === 'SINGLE_ANSWER') {
        setSelectedOption(userAnswer as string);
      } else {
        setSelectedOptions(userAnswer as string[]);
      }
    } else {
      setSelectedOption('');
      setSelectedOptions([]);
    }
  }, [userAnswer, question.question_type]);

  const handleSingleAnswerChange = (value: string) => {
    setSelectedOption(value);
    onAnswerChange(questionIndex, value);
  };

  const handleMultipleAnswerChange = (optionId: string, checked: boolean) => {
    let newSelectedOptions: string[];
    
    if (checked) {
      newSelectedOptions = [...selectedOptions, optionId];
    } else {
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    }
    
    setSelectedOptions(newSelectedOptions);
    onAnswerChange(questionIndex, newSelectedOptions);
  };

  const options = question.options.map((opt, idx) => ({
    id: `option-${idx}`,
    text: opt.option
  }));

  if (question.question_type === 'SINGLE_ANSWER') {
    return (
      <SingleAnswer
        id={`question-${questionIndex}`}
        questionNumber={questionIndex + 1}
        instruction="Select the best answer from the options below."
        question={question.question}
        options={options}
        correctAnswer={question.options.find(opt => opt.correct)?.option || ''}
        imageUrl={question.images[0]}
      />
    );
  } else {
    return (
      <MultipleAnswer
        id={`question-${questionIndex}`}
        questionNumber={questionIndex + 1}
        instruction="Select all correct answers from the options below."
        question={question.question}
        options={options}
        correctAnswers={question.options.filter(opt => opt.correct).map(opt => opt.option)}
        imageUrl={question.images[0]}
      />
    );
  }
} 