import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TableCell {
  id: string;
  isBlank: boolean;
  content: string;
  options?: string[];
  hasDropdown?: boolean;
}

interface TableRow {
  id: string;
  cells: TableCell[];
}

interface TableCompletionProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  headers: string[];
  rows: TableRow[];
  marks?: number;
  wordBank?: string[];
}

export function TableCompletion({
  id,
  questionNumber,
  instruction,
  headers,
  rows,
  marks,
  wordBank
}: TableCompletionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const totalBlanks = rows.reduce((total, row) => {
    return total + row.cells.filter(cell => cell.isBlank).length;
  }, 0);

  const finalMarks = marks || totalBlanks;

  return (
    <QuestionBase
      id={id}
      type="Table Completion"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={finalMarks}
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="border border-slate-300 p-3 text-left font-semibold text-slate-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, cellIndex) => (
                    <td 
                      key={`${row.id}-${cellIndex}`} 
                      className={cn(
                        "border border-slate-300 p-3",
                        cell.isBlank ? "bg-slate-50" : ""
                      )}
                    >
                      {!cell.isBlank ? (
                        <span>{cell.content}</span>
                      ) : cell.hasDropdown ? (
                        <Select
                          value={answers[cell.id] || ""}
                          onValueChange={(value) => setAnswers({ ...answers, [cell.id]: value })}
                        >
                          <SelectTrigger className="border-slate-300 bg-white">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {(cell.options || wordBank || []).map((option) => (
                              <SelectItem key={`${cell.id}-${option}`} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={answers[cell.id] || ""}
                          onChange={(e) => setAnswers({ ...answers, [cell.id]: e.target.value })}
                          className="border-slate-300 focus-visible:ring-1 focus-visible:ring-slate-400"
                          placeholder="Type answer..."
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </QuestionBase>
  );
}