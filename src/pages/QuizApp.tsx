import React, { useState, useEffect } from 'react';
import { SingleAnswer } from '@/components/questions/SingleAnswer';
import { MultipleAnswer } from '@/components/questions/MultipleAnswer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, BookOpen, Play, Clock, Hash, ChevronDown, Menu, X } from 'lucide-react';

// Types for the quiz data
interface QuizOption {
  option: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  images: string[];
  options: QuizOption[];
  question_type: 'SINGLE_ANSWER' | 'MULTIPLE_ANSWER';
  explanation: string;
}

interface QuizModule {
  module_url: string;
  questions: QuizQuestion[];
}

interface QuizCourse {
  course_url: string;
  modules: Record<string, QuizModule>;
}

interface QuizData {
  [courseName: string]: QuizCourse;
}

export default function QuizApp() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentCourse, setCurrentCourse] = useState<string>('');
  const [currentModule, setCurrentModule] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  // Mobile state management
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMode, setMobileMode] = useState<'selection' | 'quiz'>('selection');

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load quiz data
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch('/ccna_questions_by_exam.json');
        const data: QuizData = await response.json();
        setQuizData(data);
        // Set first course as default selected
        const courseNames = Object.keys(data);
        if (courseNames.length > 0) {
          setSelectedCourse(courseNames[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  const currentQuestions = quizData?.[currentCourse]?.modules[currentModule]?.questions || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleSingleAnswer = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleMultipleAnswer = (questionIndex: number, answers: string[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answers
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalQuestions = currentQuestions.length;

    currentQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (!userAnswer) return;

      if (question.question_type === 'SINGLE_ANSWER') {
        const correctOption = question.options.find(opt => opt.correct);
        if (correctOption && userAnswer === correctOption.option) {
          correctAnswers++;
        }
      } else if (question.question_type === 'MULTIPLE_ANSWER') {
        const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.option);
        const userAnswersArray = Array.isArray(userAnswer) ? userAnswer : [];
        
        if (correctOptions.length === userAnswersArray.length &&
            correctOptions.every(opt => userAnswersArray.includes(opt))) {
          correctAnswers++;
        }
      }
    });

    return { correctAnswers, totalQuestions, percentage: (correctAnswers / totalQuestions) * 100 };
  };

  const handleSubmit = () => {
    const result = calculateScore();
    setScore(result.percentage);
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isQuestionAnswered = (index: number) => {
    const answer = userAnswers[index];
    if (!answer) return false;
    return Array.isArray(answer) ? answer.length > 0 : answer !== '';
  };

  const handleStartQuiz = (course: string, module: string) => {
    setCurrentCourse(course);
    setCurrentModule(module);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
    
    // Switch to quiz mode on mobile
    if (isMobile) {
      setMobileMode('quiz');
      setShowMobileMenu(false);
    }
  };

  const handleBackToSelection = () => {
    setMobileMode('selection');
    setCurrentCourse('');
    setCurrentModule('');
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading quiz data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            No quiz data available. Please check the data file.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Mobile Selection Mode
  if (isMobile && mobileMode === 'selection') {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">CCNA Quiz App</h1>
              <p className="text-sm text-muted-foreground">Select a course and module</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Courses & Modules</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileMenu(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Course Selection */}
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Select Course</h3>
                <div className="space-y-2">
                  {Object.entries(quizData).map(([courseName, courseData]) => (
                    <button
                      key={courseName}
                      onClick={() => setSelectedCourse(courseName)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedCourse === courseName
                          ? 'bg-primary/10 border-primary/20 text-primary'
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="font-medium">{courseName.split(' ')[0]} {courseName.split(' ')[1]}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {Object.keys(courseData.modules).length} modules
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module Selection */}
              {selectedCourse && (
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">Select Module</h3>
                  <div className="space-y-2">
                    {Object.entries(quizData[selectedCourse].modules).map(([moduleName, moduleData]) => (
                      <div key={moduleName} className="border border-border rounded-lg overflow-hidden">
                        <div className="p-3 bg-muted/30">
                          <h4 className="font-medium text-sm">{moduleName.split('|')[0].trim()}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Hash className="h-3 w-3" />
                            <span>{moduleData.questions.length} questions</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-muted-foreground mb-3">{moduleName}</p>
                          <Button
                            onClick={() => handleStartQuiz(selectedCourse, moduleName)}
                            size="sm"
                            className="w-full flex items-center justify-center gap-2"
                          >
                            <Play className="h-3 w-3" />
                            Start Quiz
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Welcome Content */}
        <div className="p-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">Welcome to CCNA Quiz App</h2>
                <p className="text-muted-foreground mb-6">
                  Tap the menu button to select a course and module to start your quiz.
                </p>
                <div className="space-y-4">
                  <div className="text-left p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Available Courses:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• CCNA 1: Introduction to Networks</li>
                      <li>• CCNA 2: Switching, Routing and Wireless</li>
                    </ul>
                  </div>
                  <div className="text-left p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Features:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Multiple choice questions</li>
                      <li>• Progress tracking</li>
                      <li>• Instant feedback</li>
                      <li>• Score calculation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Mobile Quiz Mode
  if (isMobile && mobileMode === 'quiz') {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Quiz Header */}
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToSelection}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-foreground">{currentModule.split('|')[0].trim()}</h1>
              <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100)}%
              </span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / currentQuestions.length) * 100} className="h-2" />
          </div>
        </div>

        {/* Mobile Question Content */}
        <div className="p-4 space-y-4">
          {/* Question */}
          <Card>
            <CardContent className="p-4">
              {currentQuestion.question_type === 'SINGLE_ANSWER' ? (
                <SingleAnswer
                  id={`question-${currentQuestionIndex}`}
                  questionNumber={currentQuestionIndex + 1}
                  instruction="Select the best answer from the options below."
                  question={currentQuestion.question}
                  options={currentQuestion.options.map((opt, idx) => ({
                    id: `option-${idx}`,
                    text: opt.option
                  }))}
                  correctAnswer={currentQuestion.options.find(opt => opt.correct)?.option || ''}
                  imageUrl={currentQuestion.images[0]}
                  value={userAnswers[currentQuestionIndex] as string}
                  onValueChange={(value) => handleSingleAnswer(currentQuestionIndex, value)}
                  showFeedback={true}
                  explanation={currentQuestion.explanation}
                />
              ) : (
                <MultipleAnswer
                  id={`question-${currentQuestionIndex}`}
                  questionNumber={currentQuestionIndex + 1}
                  instruction="Select all correct answers from the options below."
                  question={currentQuestion.question}
                  options={currentQuestion.options.map((opt, idx) => ({
                    id: `option-${idx}`,
                    text: opt.option
                  }))}
                  correctAnswers={currentQuestion.options.filter(opt => opt.correct).map(opt => opt.option)}
                  imageUrl={currentQuestion.images[0]}
                  value={userAnswers[currentQuestionIndex] as string[]}
                  onValueChange={(value) => handleMultipleAnswer(currentQuestionIndex, value)}
                  showFeedback={true}
                  explanation={currentQuestion.explanation}
                />
              )}
            </CardContent>
          </Card>

          {/* Question Navigation */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Question Navigation Buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                        index === currentQuestionIndex
                          ? 'bg-primary text-primary-foreground'
                          : isQuestionAnswered(index)
                          ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  {currentQuestionIndex === currentQuestions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-center">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {Math.round(score)}%
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {score >= 70 ? (
                      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        Passed!
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                        <XCircle className="h-5 w-5" />
                        Try Again
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Correct Answers:</span>
                    <span className="font-medium text-foreground">{calculateScore().correctAnswers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Questions:</span>
                    <span className="font-medium text-foreground">{calculateScore().totalQuestions}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => setShowResults(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout (existing code)
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">CCNA Quiz App</h1>
        <p className="text-muted-foreground">Select a course and module to start your quiz</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Course Selection (25%) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Courses & Modules
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={selectedCourse} onValueChange={setSelectedCourse} orientation="vertical" className="w-full">
                <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent">
                  {Object.entries(quizData).map(([courseName, courseData]) => (
                    <TabsTrigger
                      key={courseName}
                      value={courseName}
                      className="w-full justify-start text-left p-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-b border-border last:border-b-0 rounded-none"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{courseName.split(' ')[0]} {courseName.split(' ')[1]}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {Object.keys(courseData.modules).length} modules
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Module Accordion */}
              {selectedCourse && (
                <div className="border-t border-border">
                  <div className="p-4">
                    <h3 className="font-medium text-foreground mb-3">Modules</h3>
                    <Accordion type="multiple" className="w-full">
                      {Object.entries(quizData[selectedCourse].modules).map(([moduleName, moduleData], index) => (
                        <AccordionItem key={moduleName} value={`module-${index}`} className="border-b border-border last:border-b-0">
                          <AccordionTrigger className="hover:no-underline py-2">
                            <div className="flex items-center justify-between w-full pr-2">
                              <div className="flex flex-col items-start text-left">
                                <h4 className="font-medium text-foreground text-sm">{moduleName.split('|')[0].trim()}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Hash className="h-3 w-3" />
                                  <span>{moduleData.questions.length} questions</span>
                                </div>
                              </div>
                              <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200" />
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2">
                            <div className="space-y-3">
                              <div className="text-xs text-muted-foreground">
                                <p>{moduleName}</p>
                              </div>
                              <Button
                                onClick={() => handleStartQuiz(selectedCourse, moduleName)}
                                size="sm"
                                className="w-full flex items-center justify-center gap-2"
                              >
                                <Play className="h-3 w-3" />
                                Start Quiz
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Quiz Area (75%) */}
        <div className="lg:col-span-3">
          {!currentCourse || !currentModule ? (
            // Selection Mode - Show welcome message
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to CCNA Quiz App</h2>
                  <p className="text-muted-foreground mb-6">
                    Select a course and module from the left sidebar to start your quiz.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="text-left p-4 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Available Courses:</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• CCNA 1: Introduction to Networks</li>
                        <li>• CCNA 2: Switching, Routing and Wireless</li>
                      </ul>
                    </div>
                    <div className="text-left p-4 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Features:</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Multiple choice questions</li>
                        <li>• Progress tracking</li>
                        <li>• Instant feedback</li>
                        <li>• Score calculation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Quiz Mode
            <div className="space-y-6">
              {/* Quiz Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        {currentModule}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <Badge variant="outline">{currentCourse}</Badge>
                        <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset Quiz
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100)}% Complete
                      </span>
                    </div>
                    <Progress value={((currentQuestionIndex + 1) / currentQuestions.length) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Question */}
              <Card>
                <CardContent className="p-6">
                  {currentQuestion.question_type === 'SINGLE_ANSWER' ? (
                    <SingleAnswer
                      id={`question-${currentQuestionIndex}`}
                      questionNumber={currentQuestionIndex + 1}
                      instruction="Select the best answer from the options below."
                      question={currentQuestion.question}
                      options={currentQuestion.options.map((opt, idx) => ({
                        id: `option-${idx}`,
                        text: opt.option
                      }))}
                      correctAnswer={currentQuestion.options.find(opt => opt.correct)?.option || ''}
                      imageUrl={currentQuestion.images[0]}
                      value={userAnswers[currentQuestionIndex] as string}
                      onValueChange={(value) => handleSingleAnswer(currentQuestionIndex, value)}
                      showFeedback={true}
                      explanation={currentQuestion.explanation}
                    />
                  ) : (
                    <MultipleAnswer
                      id={`question-${currentQuestionIndex}`}
                      questionNumber={currentQuestionIndex + 1}
                      instruction="Select all correct answers from the options below."
                      question={currentQuestion.question}
                      options={currentQuestion.options.map((opt, idx) => ({
                        id: `option-${idx}`,
                        text: opt.option
                      }))}
                      correctAnswers={currentQuestion.options.filter(opt => opt.correct).map(opt => opt.option)}
                      imageUrl={currentQuestion.images[0]}
                      value={userAnswers[currentQuestionIndex] as string[]}
                      onValueChange={(value) => handleMultipleAnswer(currentQuestionIndex, value)}
                      showFeedback={true}
                      explanation={currentQuestion.explanation}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Question Navigation */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Question Navigation Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {currentQuestions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                            index === currentQuestionIndex
                              ? 'bg-primary text-primary-foreground'
                              : isQuestionAnswered(index)
                              ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      {currentQuestionIndex === currentQuestions.length - 1 ? (
                        <Button
                          onClick={handleSubmit}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                        >
                          Submit Quiz
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="flex items-center gap-2"
                        >
                          Next
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-center">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {Math.round(score)}%
                </div>
                <div className="text-lg text-muted-foreground">
                  {score >= 70 ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      Passed!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                      <XCircle className="h-5 w-5" />
                      Try Again
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Correct Answers:</span>
                  <span className="font-medium text-foreground">{calculateScore().correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span className="font-medium text-foreground">{calculateScore().totalQuestions}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => setShowResults(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 