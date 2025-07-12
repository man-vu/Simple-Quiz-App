import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Statement {
  id: string;
  text: string;
  correctAnswer: 'TRUE' | 'FALSE' | 'NOT_GIVEN';
}

interface TrueFalseNotGivenProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  passageText?: string;
  statements: Statement[];
  marks?: number;
}

export function TrueFalseNotGiven({
  id,
  questionNumber,
  instruction,
  passageText,
  statements,
  marks = statements.length
}: TrueFalseNotGivenProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <QuestionBase
      id={id}
      type="True / False / Not Given"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      {passageText && (
        <div className="mb-6 p-4 bg-slate-50 rounded-md prose max-w-none text-slate-800">
          {passageText}
        </div>
      )}

      <div className="space-y-6">
        {statements.map((statement, index) => (
          <div key={statement.id} className="bg-white rounded-md p-4 border border-slate-200">
            <div className="flex items-start gap-4">
              <span className="font-medium text-slate-600">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="mb-3">{statement.text}</p>
                
                <RadioGroup
                  value={answers[statement.id]}
                  onValueChange={(value) => setAnswers({ ...answers, [statement.id]: value })}
                  className="flex flex-wrap gap-4"
                >
                  {['TRUE', 'FALSE', 'NOT_GIVEN'].map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <RadioGroupItem 
                        value={option} 
                        id={`${statement.id}-${option}`} 
                        className={cn(
                          option === 'TRUE' && "text-green-600 border-green-600 focus:ring-green-600",
                          option === 'FALSE' && "text-red-600 border-red-600 focus:ring-red-600",
                          option === 'NOT_GIVEN' && "text-amber-600 border-amber-600 focus:ring-amber-600"
                        )}
                      />
                      <Label 
                        htmlFor={`${statement.id}-${option}`}
                        className={cn(
                          "font-medium cursor-pointer",
                          option === 'TRUE' && "text-green-600",
                          option === 'FALSE' && "text-red-600",
                          option === 'NOT_GIVEN' && "text-amber-600"
                        )}
                      >
                        {option === 'TRUE' ? 'True' : option === 'FALSE' ? 'False' : 'Not Given'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </QuestionBase>
  );
}