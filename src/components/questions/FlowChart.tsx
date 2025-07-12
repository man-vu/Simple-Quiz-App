import { useState } from "react";
import { QuestionBase } from "./QuestionBase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FlowChartItem {
  id: string;
  type: "process" | "decision" | "start" | "end";
  text: string;
  position: { x: number; y: number };
  connections: string[];
  correctText?: string;
  isBlank?: boolean;
}

interface FlowChartProps {
  id: string;
  questionNumber?: number;
  instruction: string;
  chartItems: FlowChartItem[];
  imageUrl?: string;
  marks?: number;
}

export function FlowChart({
  id,
  questionNumber,
  instruction,
  chartItems,
  imageUrl,
  marks = chartItems.filter(item => item.isBlank).length || 1
}: FlowChartProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<FlowChartItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBoxClick = (item: FlowChartItem) => {
    if (item.isBlank) {
      setSelectedItem(item);
      setDialogOpen(true);
    }
  };

  const handleSaveAnswer = (itemId: string, value: string) => {
    setAnswers({
      ...answers,
      [itemId]: value
    });
    setDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <QuestionBase
      id={id}
      type="Flow Chart Completion"
      instruction={instruction}
      questionNumber={questionNumber}
      marks={marks}
    >
      <div className="space-y-6">
        {imageUrl ? (
          <div className="border rounded-md p-4 bg-white">
            <img src={imageUrl} alt="Flow chart" className="mx-auto max-h-[500px] object-contain" />
          </div>
        ) : (
          <div className="border rounded-md p-6 bg-white relative min-h-[400px]">
            <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none">
              {/* Render connections as SVG lines */}
              {chartItems.map(item =>
                item.connections.map(targetId => {
                  const target = chartItems.find(t => t.id === targetId);
                  if (!target) return null;

                  // Calculate line coordinates
                  const fromX = item.position.x + 75;
                  const fromY = item.position.y + 25;
                  const toX = target.position.x - 5;
                  const toY = target.position.y + 25;
                  
                  return (
                    <g key={`${item.id}-${targetId}`}>
                      <line 
                        x1={fromX} 
                        y1={fromY} 
                        x2={toX} 
                        y2={toY}
                        stroke="black" 
                        strokeWidth="1.5"
                      />
                      <polygon 
                        points={`${toX},${toY} ${toX-10},${toY-5} ${toX-10},${toY+5}`} 
                        fill="black" 
                      />
                    </g>
                  );
                })
              )}
            </svg>
            
            {/* Render boxes */}
            {chartItems.map(item => {
              let shapeClass = "rounded-md border-2 p-3 text-center absolute cursor-pointer transition-all";
              
              switch (item.type) {
                case "process":
                  shapeClass += " bg-white border-slate-300";
                  break;
                case "decision":
                  shapeClass += " bg-white border-slate-300 transform rotate-45";
                  break;
                case "start":
                case "end":
                  shapeClass += " bg-white border-slate-300 rounded-full";
                  break;
                default:
                  shapeClass += " bg-white border-slate-300";
              }
              
              if (item.isBlank) {
                shapeClass += " border-dashed border-indigo-500 hover:border-indigo-700";
                
                if (answers[item.id]) {
                  shapeClass += " bg-indigo-50";
                }
              }
              
              // Add specific styling for decision diamond
              const innerClass = item.type === "decision" ? "transform -rotate-45" : "";
              
              return (
                <div 
                  key={item.id}
                  className={shapeClass}
                  style={{
                    width: "150px",
                    height: "50px", 
                    left: `${item.position.x}px`,
                    top: `${item.position.y}px`
                  }}
                  onClick={() => handleBoxClick(item)}
                >
                  <div className={innerClass}>
                    {item.isBlank ? (
                      answers[item.id] || "?"
                    ) : (
                      item.text
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Display answers status */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-600">
            {Object.keys(answers).length} of {chartItems.filter(item => item.isBlank).length} boxes completed
          </div>
          <div className="text-sm text-slate-600">{marks} {marks === 1 ? 'mark' : 'marks'}</div>
        </div>
      </div>
      
      {/* Dialog for entering answers */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fill in the missing step</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input 
              placeholder="Enter your answer" 
              value={answers[selectedItem?.id || ""] || ""}
              onChange={(e) => {
                if (selectedItem) {
                  setAnswers({
                    ...answers,
                    [selectedItem.id]: e.target.value
                  });
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => selectedItem && handleSaveAnswer(selectedItem.id, answers[selectedItem.id] || "")}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </QuestionBase>
  );
}