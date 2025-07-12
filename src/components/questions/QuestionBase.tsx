import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QuestionBaseProps {
  id: string;
  type: string;
  instruction: string;
  children: React.ReactNode;
  className?: string;
  questionNumber?: number;
  marks?: number;
}

export function QuestionBase({
  id,
  type,
  instruction,
  children,
  className,
  questionNumber,
  marks = 1
}: QuestionBaseProps) {
  return (
    <Card className={cn("mb-8 overflow-visible border-0 shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-muted/50 to-muted p-4 border-b border-border">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-0 font-medium dark:bg-primary/20">
                {questionNumber ? `Question ${questionNumber}` : 'Question'} 
              </Badge>
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-0 dark:bg-secondary/20">
                {type}
              </Badge>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-800 border-0 dark:bg-green-900/20 dark:text-green-400">
              {marks > 1 ? `${marks} marks` : `${marks} mark`}
            </Badge>
          </div>
          {instruction && (
            <div className="text-sm text-foreground bg-card border border-border rounded-md p-3 font-medium">
              {instruction}
            </div>
          )}
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}