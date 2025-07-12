import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, ArrowLeft, Play, Pause, CheckCircle } from "lucide-react";
import { QuestionSamples } from "./QuestionSamples";

// IELTS test data
const ieltsTests = {
  5: {
    id: 5,
    title: "IELTS Speaking Practice",
    category: "language",
    difficulty: "All Levels",
    questionsCount: 100,
    timeEstimate: "1.5 hours",
    description: "Interactive speaking practice for the IELTS exam with sample questions and evaluation criteria.",
    topics: ["Personal Introduction", "Topic Discussion", "Abstract Topics", "Fluency & Coherence", "Pronunciation"],
    sections: [
      {
        id: "speaking-1",
        title: "Part 1: Personal Introduction",
        description: "Answer questions about familiar topics",
        questionsCount: 30,
        timeLimit: 30,
        questionTypes: ["Short Answer", "Personal Questions"]
      },
      {
        id: "speaking-2", 
        title: "Part 2: Individual Long Turn",
        description: "Speak for 2 minutes on a given topic",
        questionsCount: 40,
        timeLimit: 45,
        questionTypes: ["Cue Card", "Extended Speaking"]
      },
      {
        id: "speaking-3",
        title: "Part 3: Two-Way Discussion",
        description: "Discuss abstract topics in depth",
        questionsCount: 30,
        timeLimit: 15,
        questionTypes: ["Discussion", "Opinion Questions"]
      }
    ]
  }
};

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const test = ieltsTests[testId as keyof typeof ieltsTests];

  useEffect(() => {
    if (test && isTestStarted) {
      const timer = setInterval(() => {
        if (!isPaused && timeRemaining > 0) {
          setTimeRemaining(prev => prev - 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTestStarted, timeRemaining, isPaused]);

  useEffect(() => {
    if (timeRemaining === 0 && isTestStarted) {
      // Auto-submit when time runs out
      handleTestComplete();
    }
  }, [timeRemaining, isTestStarted]);

  const startTest = () => {
    setIsTestStarted(true);
    setTimeRemaining(test.sections[currentSection].timeLimit * 60); // Convert to seconds
  };

  const handleTestComplete = () => {
    setIsTestStarted(false);
    // Here you would typically save results and navigate to results page
    alert("Test completed! Results would be shown here.");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!test) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Test Not Found</h1>
          <p className="text-slate-600 mb-6">The requested test could not be found.</p>
          <Button onClick={() => navigate('/tests')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Test Library
          </Button>
        </div>
      </div>
    );
  }

  if (!isTestStarted) {
    return (
      <div className="container py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/tests')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Test Library
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{test.title}</CardTitle>
                  <p className="text-slate-600 mt-2">{test.description}</p>
                </div>
                <Badge className="bg-red-100 text-red-800">IELTS</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-slate-500" />
                    <span>{test.questionsCount} questions</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-slate-500" />
                    <span>{test.timeEstimate}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline">{test.difficulty}</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Topics Covered:</h3>
                  <div className="flex flex-wrap gap-2">
                    {test.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Test Sections:</h3>
                <div className="space-y-3">
                  {test.sections.map((section, index) => (
                    <div key={section.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{section.title}</h4>
                        <p className="text-sm text-slate-600">{section.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">{section.questionsCount} questions</div>
                        <div className="text-sm text-slate-600">{section.timeLimit} minutes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg" 
                  onClick={startTest}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Test in progress
  return (
    <div className="container py-8">
      {/* Test Header */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-lg font-semibold">{test.title}</h1>
            <p className="text-sm text-slate-600">
              Section {currentSection + 1} of {test.sections.length}: {test.sections[currentSection].title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestComplete}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Submit
            </Button>
          </div>
        </div>
        <Progress 
          value={((test.sections[currentSection].timeLimit * 60 - timeRemaining) / (test.sections[currentSection].timeLimit * 60)) * 100} 
          className="h-1"
        />
      </div>

      {/* Test Content */}
      <div className="mt-6">
        <QuestionSamples />
      </div>
    </div>
  );
} 