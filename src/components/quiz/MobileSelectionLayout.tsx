import React from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileMenu } from './MobileMenu';
import { WelcomeMessage } from './WelcomeMessage';
import { QuizData } from './types';

interface MobileSelectionLayoutProps {
  quizData: QuizData;
  selectedCourse: string;
  showMobileMenu: boolean;
  onCourseSelect: (course: string) => void;
  onStartQuiz: (course: string, module: string) => void;
  onToggleMenu: () => void;
}

export function MobileSelectionLayout({
  quizData,
  selectedCourse,
  showMobileMenu,
  onCourseSelect,
  onStartQuiz,
  onToggleMenu
}: MobileSelectionLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        showMobileMenu={showMobileMenu} 
        onToggleMenu={onToggleMenu} 
      />

      {showMobileMenu && (
        <MobileMenu
          quizData={quizData}
          selectedCourse={selectedCourse}
          onCourseSelect={onCourseSelect}
          onStartQuiz={onStartQuiz}
          onClose={onToggleMenu}
        />
      )}

      <div className="p-4">
        <WelcomeMessage isMobile={true} />
      </div>
    </div>
  );
} 