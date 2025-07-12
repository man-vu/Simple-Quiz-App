import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Heading {
  id: string;
  text: string;
}

interface Paragraph {
  id: string;
  number: number;
  text: string;
  correctHeadingId: string;
}

interface MatchingHeadingProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  headings: Heading[];
  paragraphs: Paragraph[];
  marks?: number;
}

export function MatchingHeading({
  id,
  questionNumber,
  instruction,
  headings,
  paragraphs,
  marks = paragraphs.length
}: MatchingHeadingProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <QuestionBase
      id={id}
      type="Matching Headings"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-6">
        {/* Headings Display */}
        <div className="p-4 bg-slate-50 rounded-md">
          <h3 className="font-semibold text-lg text-slate-700 mb-4">Headings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {headings.map((heading, index) => (
              <Badge 
                key={heading.id} 
                variant="outline" 
                className="px-3 py-2 text-base bg-white flex items-center h-auto whitespace-normal text-left"
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {heading.text}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Paragraphs */}
        <div className="space-y-6">
          {paragraphs.map((paragraph) => (
            <div key={paragraph.id} className="p-4 bg-white rounded-md border border-slate-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-4/5">
                  <div className="font-semibold text-slate-700 mb-2">
                    Paragraph {paragraph.number}
                  </div>
                  <p className="text-slate-600">{paragraph.text}</p>
                </div>
                <div className="md:w-1/5 flex items-start justify-end">
                  <Select 
                    value={answers[paragraph.id] || ""} 
                    onValueChange={(value) => setAnswers({ ...answers, [paragraph.id]: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose heading" />
                    </SelectTrigger>
                    <SelectContent>
                      {headings.map((heading, index) => (
                        <SelectItem key={heading.id} value={heading.id}>
                          {String.fromCharCode(65 + index)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </QuestionBase>
  );
}