import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ShortAnswerProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  question: string;
  minWords?: number;
  maxWords?: number;
  marks?: number;
  imageUrl?: string;
  sampleAnswer?: string;
}

export function ShortAnswer({
  id,
  questionNumber,
  instruction,
  question,
  minWords = 0,
  maxWords = 100,
  marks = 1,
  imageUrl,
  sampleAnswer
}: ShortAnswerProps) {
  const [answer, setAnswer] = useState<string>("");
  
  const countWords = (text: string): number => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };
  
  const wordCount = countWords(answer);
  const isUnderMinimum = minWords > 0 && wordCount < minWords;
  const isOverMaximum = maxWords > 0 && wordCount > maxWords;

  return (
    <QuestionBase
      id={id}
      type="Short Answer"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-4">
        {imageUrl && (
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt="Question visual" 
              className="rounded-md max-h-[300px] max-w-full object-contain mx-auto border border-slate-200"
            />
          </div>
        )}
        
        <div className="text-lg mb-4">{question}</div>
        
        <div className="space-y-2">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="min-h-[150px] focus-visible:ring-indigo-500"
          />
          
          <div className="flex justify-between text-sm">
            <div className={isUnderMinimum ? "text-amber-600" : isOverMaximum ? "text-red-600" : "text-slate-500"}>
              {wordCount} word{wordCount !== 1 ? "s" : ""}
              {minWords > 0 && maxWords > 0 && ` (${minWords}-${maxWords} words)`}
              {minWords > 0 && maxWords === 0 && ` (minimum ${minWords} words)`}
              {minWords === 0 && maxWords > 0 && ` (maximum ${maxWords} words)`}
            </div>
            <div className="text-slate-500">{marks} mark{marks !== 1 ? "s" : ""}</div>
          </div>
        </div>
        
        {sampleAnswer && (
          <Card className="p-4 mt-6 bg-slate-50 border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-2">Sample Answer</h4>
            <p className="text-slate-600">{sampleAnswer}</p>
          </Card>
        )}
      </div>
    </QuestionBase>
  );
}