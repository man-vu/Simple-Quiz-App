import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Paragraph {
  id: string;
  text: string;
  letter: string;
}

interface Statement {
  id: string;
  text: string;
  correctParagraphId: string;
}

interface MatchingParagraphProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  paragraphs: Paragraph[];
  statements: Statement[];
  marks?: number;
}

export function MatchingParagraph({
  id,
  questionNumber,
  instruction,
  paragraphs,
  statements,
  marks = statements.length
}: MatchingParagraphProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (statementId: string, paragraphId: string) => {
    setAnswers((prev) => ({ ...prev, [statementId]: paragraphId }));
  };

  return (
    <QuestionBase
      id={id}
      type="Matching Paragraph"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
        {/* Statements Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-slate-700">Statements</h3>
          {statements.map((statement, index) => (
            <div key={statement.id} className="flex gap-4 p-4 rounded-md bg-white border border-slate-200">
              <span className="font-medium text-slate-700">{index + 1}</span>
              <div className="flex-1 space-y-3">
                <p>{statement.text}</p>
                <Select 
                  value={answers[statement.id] || ""} 
                  onValueChange={(value) => handleSelect(statement.id, value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Paragraph" />
                  </SelectTrigger>
                  <SelectContent>
                    {paragraphs.map((para) => (
                      <SelectItem key={para.id} value={para.id}>
                        Paragraph {para.letter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        {/* Paragraphs Section */}
        <div className="space-y-6 p-4 bg-slate-50 rounded-md">
          <h3 className="font-semibold text-lg text-slate-700">Paragraphs</h3>
          {paragraphs.map((paragraph) => (
            <div key={paragraph.id} className="mb-6 p-4 bg-white rounded-md border border-slate-200">
              <h4 className="font-semibold mb-2 text-slate-800">Paragraph {paragraph.letter}</h4>
              <p className="text-slate-700">{paragraph.text}</p>
            </div>
          ))}
        </div>
      </div>
    </QuestionBase>
  );
}