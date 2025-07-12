import { useState } from 'react';
import { QuizQuestion } from '../types';

export function useQuizState() {
  const [currentCourse, setCurrentCourse] = useState<string>('');
  const [currentModule, setCurrentModule] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const calculateScore = (currentQuestions: QuizQuestion[]) => {
    let correctAnswers = 0;
    let totalQuestions = currentQuestions.length;

    currentQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (!userAnswer) return;

      if (question.question_type === 'SINGLE_ANSWER') {
        const correctOption = question.options.find(opt => opt.correct);
        if (correctOption && userAnswer === correctOption.option) {
          correctAnswers++;
        }
      } else if (question.question_type === 'MULTIPLE_ANSWER') {
        const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.option);
        const userAnswersArray = Array.isArray(userAnswer) ? userAnswer : [];
        
        if (correctOptions.length === userAnswersArray.length &&
            correctOptions.every(opt => userAnswersArray.includes(opt))) {
          correctAnswers++;
        }
      }
    });

    return { correctAnswers, totalQuestions, percentage: (correctAnswers / totalQuestions) * 100 };
  };

  const handleSingleAnswer = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleMultipleAnswer = (questionIndex: number, answers: string[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answers
    }));
  };

  const handleSubmit = (currentQuestions: QuizQuestion[]) => {
    const result = calculateScore(currentQuestions);
    setScore(result.percentage);
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  const handleNext = (currentQuestions: QuizQuestion[]) => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isQuestionAnswered = (index: number) => {
    const answer = userAnswers[index];
    if (!answer) return false;
    return Array.isArray(answer) ? answer.length > 0 : answer !== '';
  };

  const handleStartQuiz = (course: string, module: string) => {
    setCurrentCourse(course);
    setCurrentModule(module);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  const handleBackToSelection = () => {
    setCurrentCourse('');
    setCurrentModule('');
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  return {
    currentCourse,
    setCurrentCourse,
    currentModule,
    setCurrentModule,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    showResults,
    setShowResults,
    score,
    calculateScore,
    handleSingleAnswer,
    handleMultipleAnswer,
    handleSubmit,
    handleReset,
    handleNext,
    handlePrevious,
    isQuestionAnswered,
    handleStartQuiz,
    handleBackToSelection
  };
} 