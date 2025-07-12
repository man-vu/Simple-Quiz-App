import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QuestionBaseProps {
  id: string;
  type: string;
  instruction?: string;
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
        <div className="p-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}