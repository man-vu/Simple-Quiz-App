import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Feature {
  id: string;
  name: string;
}

interface Question {
  id: string;
  text: string;
  correctFeatureId: string;
}

interface MatchingFeatureNameProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  features: Feature[];
  questions: Question[];
  marks?: number;
}

export function MatchingFeatureName({
  id,
  questionNumber,
  instruction,
  features,
  questions,
  marks = questions.length
}: MatchingFeatureNameProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, featureId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: featureId }));
  };

  return (
    <QuestionBase
      id={id}
      type="Matching Feature/Name"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-6">
        {/* Features Display */}
        <div className="p-4 bg-slate-50 rounded-md">
          <h3 className="font-semibold text-lg text-slate-700 mb-4">Features/Names</h3>
          <div className="flex flex-wrap gap-3">
            {features.map((feature) => (
              <Badge key={feature.id} variant="outline" className="px-3 py-2 text-base bg-white">
                {feature.name}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="flex gap-4 p-4 rounded-md bg-white border border-slate-200">
              <span className="font-medium text-slate-700">{index + 1}</span>
              <div className="flex-1">
                <p className="mb-3">{question.text}</p>
                <Select 
                  value={answers[question.id] || ""} 
                  onValueChange={(value) => handleSelect(question.id, value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select feature" />
                  </SelectTrigger>
                  <SelectContent>
                    {features.map((feature) => (
                      <SelectItem key={feature.id} value={feature.id}>
                        {feature.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </QuestionBase>
  );
}