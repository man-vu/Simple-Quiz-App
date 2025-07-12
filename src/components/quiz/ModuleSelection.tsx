import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Hash, ChevronDown, Play } from 'lucide-react';
import { QuizData } from './types';

interface ModuleSelectionProps {
  quizData: QuizData;
  selectedCourse: string;
  onStartQuiz: (course: string, module: string) => void;
}

export function ModuleSelection({
  quizData,
  selectedCourse,
  onStartQuiz
}: ModuleSelectionProps) {
  if (!selectedCourse) return null;

  return (
    <div className="border-t border-border">
      <div className="p-4">
        <h3 className="font-medium text-foreground mb-3">Modules</h3>
        <Accordion type="multiple" className="w-full">
          {Object.entries(quizData[selectedCourse].modules).map(([moduleName, moduleData], index) => (
            <AccordionItem key={moduleName} value={`module-${index}`} className="border-b border-border last:border-b-0">
              <AccordionTrigger className="hover:no-underline py-2">
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="flex flex-col items-start text-left">
                    <h4 className="font-medium text-foreground text-sm">{moduleName.split('|')[0].trim()}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Hash className="h-3 w-3" />
                      <span>{moduleData.questions.length} questions</span>
                    </div>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    <p>{moduleName}</p>
                  </div>
                  <Button
                    onClick={() => onStartQuiz(selectedCourse, moduleName)}
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Play className="h-3 w-3" />
                    Start Quiz
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
} 