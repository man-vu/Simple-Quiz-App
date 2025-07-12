import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface Option {
  id: string;
  text: string;
}

interface SingleAnswerProps {
  id: string;
  questionNumber?: number;
  instruction?: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  marks?: number;
  imageUrl?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  showFeedback?: boolean;
  explanation?: string;
}

export function SingleAnswer({
  id,
  questionNumber,
  instruction,
  question,
  options,
  correctAnswer,
  marks = 1,
  imageUrl,
  value: externalValue,
  onValueChange,
  showFeedback = false,
  explanation
}: SingleAnswerProps) {
  const [internalValue, setInternalValue] = useState<string>("");
  
  // Use external value if provided, otherwise use internal state
  const selectedOption = externalValue !== undefined ? externalValue : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // Determine if feedback should be shown
  const shouldShowFeedback = selectedOption || showFeedback === true;
  
  // Get the correct option ID
  const correctOptionId = options.find(opt => opt.text === correctAnswer)?.id;

  return (
    <QuestionBase
      id={id}
      type="Multiple Choice (Single Answer)"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-4">
        <div className="mb-6">
          {imageUrl && (
            <div className="mb-4">
              <img 
                src={imageUrl} 
                alt="Question visual" 
                className="rounded-md max-h-[400px] max-w-full object-contain mx-auto border border-border"
              />
            </div>
          )}
          <div className="text-lg font-medium text-foreground">{question}</div>
        </div>
        
        <RadioGroup
          value={selectedOption}
          onValueChange={handleValueChange}
          className="space-y-3"
        >
          {options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.id === correctOptionId;
            const showOptionFeedback = shouldShowFeedback && (isSelected || isCorrect);
            
            return (
              <div
                key={option.id}
                onClick={() => handleValueChange(option.id)}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg border transition-colors relative cursor-pointer",
                  // Default state
                  "border-border",
                  // Selected state
                  isSelected && "bg-primary/10 border-primary/20 dark:bg-primary/20",
                  // Feedback states
                  showOptionFeedback && isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                  showOptionFeedback && isSelected && !isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                  showOptionFeedback && !isSelected && isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                )}
              >
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                  // Default state
                  "border-border bg-muted text-foreground",
                  // Selected state
                  isSelected && "border-primary bg-primary text-primary-foreground",
                  // Feedback states
                  showOptionFeedback && isCorrect && "border-green-500 bg-green-500 text-white",
                  showOptionFeedback && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                )}>
                  {letters[index]}
                </div>
                <RadioGroupItem
                  value={option.id}
                  id={`option-${option.id}`}
                  className="sr-only"
                />
                <Label
                  htmlFor={`option-${option.id}`}
                  className="flex-1 text-base text-foreground"
                >
                  {option.text}
                </Label>
                
                {/* Feedback Icons */}
                {showOptionFeedback && (
                  <div className="flex items-center">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : isSelected && !isCorrect ? (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </RadioGroup>
        
        {/* Feedback Message */}
        {shouldShowFeedback && (
          <div className={cn(
            "p-4 rounded-lg border transition-colors",
            selectedOption === correctOptionId 
              ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
              : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
          )}>
            <div className="flex items-center gap-2">
              {selectedOption === correctOptionId ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">Correct!</span>
                </>
              ) : selectedOption ? (
                <>
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-800 dark:text-red-200 font-medium">Incorrect</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">Answer</span>
                </>
              )}
            </div>
            <p className={cn(
              "text-sm mt-1",
              selectedOption === correctOptionId 
                ? "text-green-700 dark:text-green-300" 
                : selectedOption
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
            )}>
              {explanation 
                ? explanation
                : selectedOption === correctOptionId 
                  ? "Great job! You selected the correct answer." 
                  : selectedOption
                    ? `The correct answer is: ${correctAnswer}`
                    : `The correct answer is: ${correctAnswer}`
              }
            </p>
          </div>
        )}
      </div>
    </QuestionBase>
  );
}