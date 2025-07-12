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

      <div className="p-4 space-y-6">
        <WelcomeMessage isMobile={true} />
        
        {/* Course Selection - Always visible on mobile */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground text-lg">Select Course</h3>
          <div className="space-y-2">
            {Object.entries(quizData).map(([courseName, courseData]) => (
              <button
                key={courseName}
                onClick={() => onCourseSelect(courseName)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCourse === courseName
                    ? 'bg-primary/10 border-primary/20 text-primary'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <div className="font-medium">{courseName.split(' ')[0]} {courseName.split(' ')[1]}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {Object.keys(courseData.modules).length} modules
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Module Selection - Always visible when course is selected */}
        {selectedCourse && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground text-lg">Select Module</h3>
            <div className="space-y-2">
              {Object.entries(quizData[selectedCourse].modules).map(([moduleName, moduleData]) => (
                <div key={moduleName} className="border border-border rounded-lg overflow-hidden">
                  <div className="p-3 bg-muted/30">
                    <h4 className="font-medium text-sm">{moduleName.split('|')[0].trim()}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{moduleData.questions.length} questions</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-3">{moduleName}</p>
                    <button
                      onClick={() => onStartQuiz(selectedCourse, moduleName)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 