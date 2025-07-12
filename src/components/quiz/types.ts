export interface QuizOption {
  option: string;
  correct: boolean;
}

export interface QuizQuestion {
  question: string;
  images: string[];
  options: QuizOption[];
  question_type: 'SINGLE_ANSWER' | 'MULTIPLE_ANSWER';
  explanation: string;
}

export interface QuizModule {
  module_url: string;
  questions: QuizQuestion[];
}

export interface QuizCourse {
  course_url: string;
  modules: Record<string, QuizModule>;
}

export interface QuizData {
  [courseName: string]: QuizCourse;
}

export type MobileMode = 'selection' | 'quiz'; 