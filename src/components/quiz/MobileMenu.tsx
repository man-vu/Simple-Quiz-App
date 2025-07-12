import React from 'react';
import { Button } from '@/components/ui/button';
import { Hash, Play, X } from 'lucide-react';
import { QuizData } from './types';

interface MobileMenuProps {
  quizData: QuizData;
  selectedCourse: string;
  onCourseSelect: (course: string) => void;
  onStartQuiz: (course: string, module: string) => void;
  onClose: () => void;
}

export function MobileMenu({
  quizData,
  selectedCourse,
  onCourseSelect,
  onStartQuiz,
  onClose
}: MobileMenuProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Courses & Modules</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
        {/* Course Selection */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Select Course</h3>
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

        {/* Module Selection */}
        {selectedCourse && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Select Module</h3>
            <div className="space-y-2">
              {Object.entries(quizData[selectedCourse].modules).map(([moduleName, moduleData]) => (
                <div key={moduleName} className="border border-border rounded-lg overflow-hidden">
                  <div className="p-3 bg-muted/30">
                    <h4 className="font-medium text-sm">{moduleName.split('|')[0].trim()}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Hash className="h-3 w-3" />
                      <span>{moduleData.questions.length} questions</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-3">{moduleName}</p>
                    <Button
                      onClick={() => onStartQuiz(selectedCourse, moduleName)}
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Play className="h-3 w-3" />
                      Start Quiz
                    </Button>
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