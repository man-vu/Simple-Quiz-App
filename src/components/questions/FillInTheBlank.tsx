import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Blank {
  id: string;
  correctAnswer: string;
}

interface FillInTheBlankProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  content: string;
  blanks: Blank[];
  wordBank?: string[];
  marks?: number;
}

export function FillInTheBlank({
  id,
  questionNumber,
  instruction,
  content,
  blanks,
  wordBank,
  marks = blanks.length
}: FillInTheBlankProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Replace blank placeholders with input fields
  const renderContent = () => {
    let currentContent = content;
    
    blanks.forEach((blank) => {
      const placeholder = `[BLANK_${blank.id}]`;
      const inputComponent = `<input id="${blank.id}" />`;
      
      currentContent = currentContent.replace(placeholder, inputComponent);
    });
    
    const parts = currentContent.split(/<input id="([^"]+)" \/>/g);
    
    return parts.map((part, index) => {
      // Text part
      if (index % 2 === 0) {
        return <span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />;
      }
      
      // Input part - part is the blank id from the regex capture group
      const blankId = part;
      return (
        <Input
          key={`input-${blankId}`}
          value={answers[blankId] || ""}
          onChange={(e) => setAnswers({ ...answers, [blankId]: e.target.value })}
          className="inline-block w-[150px] mx-1 border-b-2 border-t-0 border-x-0 rounded-none px-2 shadow-none focus:ring-0 focus:border-indigo-500 bg-slate-50"
          placeholder="Type answer..."
        />
      );
    });
  };

  return (
    <QuestionBase
      id={id}
      type="Fill in the Blank"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-6">
        {wordBank && wordBank.length > 0 && (
          <div className="p-4 bg-slate-50 rounded-md">
            <h3 className="font-semibold text-lg text-slate-700 mb-3">Word Bank</h3>
            <div className="flex flex-wrap gap-2">
              {wordBank.map((word) => (
                <Badge key={word} variant="outline" className="px-3 py-1 bg-white text-slate-800">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="prose max-w-none p-4 bg-white rounded-md border border-slate-200 leading-relaxed">
          {renderContent()}
        </div>
      </div>
    </QuestionBase>
  );
}