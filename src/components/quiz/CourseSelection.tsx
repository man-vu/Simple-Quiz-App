import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import { QuizData } from './types';

interface CourseSelectionProps {
  quizData: QuizData;
  selectedCourse: string;
  onCourseSelect: (course: string) => void;
  children: React.ReactNode;
}

export function CourseSelection({
  quizData,
  selectedCourse,
  onCourseSelect,
  children
}: CourseSelectionProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Courses & Modules
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={selectedCourse} onValueChange={onCourseSelect} orientation="vertical" className="w-full">
          <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent">
            {Object.entries(quizData).map(([courseName, courseData]) => (
              <TabsTrigger
                key={courseName}
                value={courseName}
                className="w-full justify-start text-left p-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-b border-border last:border-b-0 rounded-none"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{courseName.split(' ')[0]} {courseName.split(' ')[1]}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {Object.keys(courseData.modules).length} modules
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Module Selection */}
        {selectedCourse && children}
      </CardContent>
    </Card>
  );
} 