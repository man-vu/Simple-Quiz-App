import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Blank {
  id: string;
  correctAnswer: string;
}

interface NoteCompletionWithHintProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  content: string;
  blanks: Blank[];
  options: string[];
  marks?: number;
}

export function NoteCompletionWithHint({
  id,
  questionNumber,
  instruction,
  content,
  blanks,
  options,
  marks = blanks.length
}: NoteCompletionWithHintProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Replace blank placeholders with select fields
  const renderContent = () => {
    let currentContent = content;
    
    blanks.forEach((blank) => {
      const placeholder = `[BLANK_${blank.id}]`;
      const selectComponent = `<select id="${blank.id}" />`;
      
      currentContent = currentContent.replace(placeholder, selectComponent);
    });
    
    const parts = currentContent.split(/<select id="([^"]+)" \/>/g);
    
    return parts.map((part, index) => {
      // Text part
      if (index % 2 === 0) {
        return <span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />;
      }
      
      // Select part - part is the blank id from the regex capture group
      const blankId = part;
      return (
        <Select
          key={`select-${blankId}`}
          value={answers[blankId] || ""}
          onValueChange={(value) => setAnswers({ ...answers, [blankId]: value })}
        >
          <SelectTrigger className="inline-block w-[150px] mx-1 border-b-2 border-t-0 border-x-0 rounded-none px-2 shadow-none focus:ring-0 focus:border-indigo-500 bg-slate-50">
            <SelectValue placeholder="Select word" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={`${blankId}-${option}`} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    });
  };

  return (
    <QuestionBase
      id={id}
      type="Note Completion (With Hint)"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-md mb-4">
          <h3 className="font-semibold text-lg text-slate-700 mb-3">Word Options</h3>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <Badge 
                key={option} 
                variant="outline" 
                className="px-3 py-1 bg-white text-slate-800"
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="prose max-w-none p-4 bg-white rounded-md border border-slate-200 leading-relaxed">
          {renderContent()}
        </div>
      </div>
    </QuestionBase>
  );
}