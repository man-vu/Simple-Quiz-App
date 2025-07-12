import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Blank {
  id: string;
  options: string[];
  correctAnswer: string;
}

interface Sentence {
  id: string;
  prefix: string;
  blank: Blank;
  suffix: string;
  number: number;
}

interface SentenceCompletionProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  sentences: Sentence[];
  marks?: number;
}

export function SentenceCompletion({
  id,
  questionNumber,
  instruction,
  sentences,
  marks = sentences.length
}: SentenceCompletionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <QuestionBase
      id={id}
      type="Sentence Completion"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-6">
        {sentences.map((sentence) => (
          <div key={sentence.id} className="p-4 bg-white rounded-md border border-slate-200">
            <div className="flex items-start gap-3">
              <span className="font-medium text-slate-700">{sentence.number}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-1 text-base">
                  {sentence.prefix}
                  <Select
                    value={answers[sentence.id] || ""}
                    onValueChange={(value) => setAnswers({ ...answers, [sentence.id]: value })}
                  >
                    <SelectTrigger className="h-8 min-w-[120px] bg-slate-50 border-b-2 border-t-0 border-x-0 rounded-none px-2 focus:ring-0">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sentence.blank.options.map((option) => (
                        <SelectItem key={`${sentence.id}-${option}`} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {sentence.suffix}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </QuestionBase>
  );
}