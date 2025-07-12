import { useState } from "react";
import { Input } from "@/components/ui/input";
import { QuestionBase } from "./QuestionBase";

interface NoteCompletionNoHintProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  content: string;
  blanks: Array<{
    id: string;
    answer: string;
  }>;
  marks?: number;
}

export function NoteCompletionNoHint({
  id,
  questionNumber,
  instruction,
  content,
  blanks,
  marks = blanks.length
}: NoteCompletionNoHintProps) {
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
          value={answers[blankId] || ''}
          onChange={(e) => setAnswers({ ...answers, [blankId]: e.target.value })}
          className="inline-block w-auto min-w-[100px] border-b-2 border-t-0 border-x-0 rounded-none px-1 mx-1 focus:border-indigo-500 focus-visible:ring-0 text-indigo-700 font-medium placeholder:text-slate-400"
          placeholder="Type answer"
        />
      );
    });
  };

  return (
    <QuestionBase 
      id={id}
      type="Note Completion (No Hint)"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="prose max-w-none">
        {renderContent()}
      </div>
    </QuestionBase>
  );
}