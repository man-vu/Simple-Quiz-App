import { useState, useEffect } from 'react';
import { QuizData } from '../types';

export function useQuizData() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch('/ccna_questions_by_exam.json');
        const data: QuizData = await response.json();
        setQuizData(data);
        // Set first course as default selected
        const courseNames = Object.keys(data);
        if (courseNames.length > 0) {
          setSelectedCourse(courseNames[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  return {
    quizData,
    loading,
    selectedCourse,
    setSelectedCourse
  };
} 