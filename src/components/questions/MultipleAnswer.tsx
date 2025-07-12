import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface Option {
  id: string;
  text: string;
}

interface MultipleAnswerProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  question: string;
  options: Option[];
  correctAnswers: string[];
  marks?: number;
  imageUrl?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  showFeedback?: boolean;
  explanation?: string;
}

export function MultipleAnswer({
  id,
  questionNumber,
  instruction,
  question,
  options,
  correctAnswers,
  marks = Math.max(1, correctAnswers.length),
  imageUrl,
  value: externalValue,
  onValueChange,
  showFeedback = true,
  explanation
}: MultipleAnswerProps) {
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<string[]>([]);
  
  // Use external value if provided, otherwise use internal state
  const selectedOptions = externalValue !== undefined ? externalValue : internalSelectedOptions;

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    let newSelectedOptions: string[];
    
    if (checked) {
      newSelectedOptions = [...selectedOptions, optionId];
    } else {
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    }
    
    if (onValueChange) {
      onValueChange(newSelectedOptions);
    } else {
      setInternalSelectedOptions(newSelectedOptions);
    }
  };

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // Get the correct option IDs
  const correctOptionIds = options
    .filter(opt => correctAnswers.includes(opt.text))
    .map(opt => opt.id);

  // Determine if feedback should be shown (when all correct answers are selected)
  const allCorrectSelected = correctOptionIds.every(id => selectedOptions.includes(id));
  const shouldShowFeedback = showFeedback && allCorrectSelected && selectedOptions.length > 0;
  
  // Check if the answer is completely correct
  const isCompletelyCorrect = allCorrectSelected && selectedOptions.length === correctOptionIds.length;

  return (
    <QuestionBase
      id={id}
      type="Multiple Choice (Multiple Answer)"
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
        
        <div className="text-sm text-muted-foreground italic mb-2">Select all that apply.</div>
        
        <div className="space-y-3">
          {options.map((option, index) => {
            const isChecked = selectedOptions.includes(option.id);
            const isCorrect = correctOptionIds.includes(option.id);
            const showOptionFeedback = shouldShowFeedback && (isChecked || isCorrect);
            
            return (
              <div
                key={option.id}
                onClick={() => handleCheckboxChange(option.id, !isChecked)}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer",
                  // Default state
                  "border-border",
                  // Selected state
                  isChecked && "bg-primary/10 border-primary/20 dark:bg-primary/20",
                  // Feedback states
                  showOptionFeedback && isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                  showOptionFeedback && isChecked && !isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                  showOptionFeedback && !isChecked && isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                )}
              >
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                  // Default state
                  "border-border bg-muted text-foreground",
                  // Selected state
                  isChecked && "border-primary bg-primary text-primary-foreground",
                  // Feedback states
                  showOptionFeedback && isCorrect && "border-green-500 bg-green-500 text-white",
                  showOptionFeedback && isChecked && !isCorrect && "border-red-500 bg-red-500 text-white"
                )}>
                  {letters[index]}
                </div>
                <Checkbox
                  id={`option-${option.id}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
                    ) : isChecked && !isCorrect ? (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Feedback Message */}
        {shouldShowFeedback && (
          <div className={cn(
            "p-4 rounded-lg border transition-colors",
            isCompletelyCorrect 
              ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
              : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
          )}>
            <div className="flex items-center gap-2">
              {isCompletelyCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-yellow-800 dark:text-yellow-200 font-medium">Partially Correct</span>
                </>
              )}
            </div>
            <p className={cn(
              "text-sm mt-1",
              isCompletelyCorrect 
                ? "text-green-700 dark:text-green-300" 
                : "text-yellow-700 dark:text-yellow-300"
            )}>
              {explanation 
                ? explanation
                : isCompletelyCorrect 
                  ? "Great job! You selected all the correct answers." 
                  : `You selected ${selectedOptions.length} out of ${correctOptionIds.length} correct answers. The correct answers are: ${correctAnswers.join(', ')}`
              }
            </p>
          </div>
        )}
      </div>
    </QuestionBase>
  );
}