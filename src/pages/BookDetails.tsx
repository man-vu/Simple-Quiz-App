import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, BookOpen, Clock, BarChart2, ChevronLeft } from "lucide-react";

// Define interfaces for our data types
interface TestSection {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  estimatedTime: number;
  sections: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

interface BookData {
  id: string;
  title: string;
  coverImg: string;
  publisher: string;
  year: number;
  level: string;
  description: string;
  categories: string[];
  rating: number;
  tests: TestSection[];
}

interface TestAttempt {
  testId: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completed: boolean;
}

// Sample book data (in a real app this would come from an API)
const booksData: BookData[] = [
  {
    id: "1",
    title: "Cambridge IELTS 17",
    coverImg: "/assets/books/ielts17.jpg",
    publisher: "Cambridge University Press",
    year: 2022,
    level: "Advanced",
    description: "Authentic examination papers from Cambridge Assessment English",
    categories: ["IELTS", "Academic"],
    rating: 4.8,
    tests: [
      {
        id: "test-1-1",
        title: "Test 1",
        description: "Academic Reading",
        questionsCount: 40,
        estimatedTime: 60,
        sections: ["Reading Passage 1", "Reading Passage 2", "Reading Passage 3"],
        difficulty: "Medium"
      },
      {
        id: "test-1-2",
        title: "Test 2",
        description: "Academic Reading",
        questionsCount: 40,
        estimatedTime: 60,
        sections: ["Reading Passage 1", "Reading Passage 2", "Reading Passage 3"],
        difficulty: "Hard"
      },
      {
        id: "test-1-3",
        title: "Test 3",
        description: "Academic Reading",
        questionsCount: 40,
        estimatedTime: 60,
        sections: ["Reading Passage 1", "Reading Passage 2", "Reading Passage 3"],
        difficulty: "Medium"
      },
      {
        id: "test-1-4",
        title: "Test 4",
        description: "Academic Reading",
        questionsCount: 40,
        estimatedTime: 60,
        sections: ["Reading Passage 1", "Reading Passage 2", "Reading Passage 3"],
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "2",
    title: "Cambridge IELTS 16",
    coverImg: "/assets/books/ielts16.jpg",
    publisher: "Cambridge University Press",
    year: 2021,
    level: "Advanced",
    description: "Authentic examination papers from Cambridge Assessment English",
    categories: ["IELTS", "Academic"],
    rating: 4.7,
    tests: [
      {
        id: "test-2-1",
        title: "Test 1",
        description: "Academic Reading",
        questionsCount: 40,
        estimatedTime: 60,
        sections: ["Reading Passage 1", "Reading Passage 2", "Reading Passage 3"],
        difficulty: "Medium"
      },
      {
        id: "test-2-2",
        title: "Test 2",
        description: "Academic Reading",
        questionsCount: 40,
        estimatedTime: 60,
        sections: ["Reading Passage 1", "Reading Passage 2", "Reading Passage 3"],
        difficulty: "Medium"
      }
    ]
  }
];

// Mock user's test attempts data
const userAttempts: TestAttempt[] = [
  {
    testId: "test-1-1",
    date: "2023-11-15",
    score: 32,
    totalQuestions: 40,
    timeSpent: 55,
    completed: true
  },
  {
    testId: "test-1-2",
    date: "2023-11-10",
    score: 28,
    totalQuestions: 40,
    timeSpent: 58,
    completed: true
  },
  {
    testId: "test-2-1",
    date: "2023-10-05",
    score: 30,
    totalQuestions: 40,
    timeSpent: 62,
    completed: true
  },
  {
    testId: "test-1-3",
    date: "2023-09-28",
    score: 22,
    totalQuestions: 40,
    timeSpent: 45,
    completed: false
  }
];

export default function BookDetails() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get book details
    setLoading(true);
    
    // Find the book in our data
    const foundBook = booksData.find(b => b.id === bookId);
    
    setTimeout(() => {
      setBook(foundBook || null);
      setLoading(false);
    }, 500);
  }, [bookId]);
  
  // Function to get attempts for a specific test
  const getTestAttempts = (testId: string): TestAttempt[] => {
    return userAttempts.filter(attempt => attempt.testId === testId);
  };
  
  // Function to get the latest attempt for a test
  const getLatestAttempt = (testId: string): TestAttempt | null => {
    const attempts = getTestAttempts(testId);
    if (attempts.length === 0) return null;
    
    // Sort by date (most recent first)
    return attempts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  };
  
  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-600">Loading book details...</p>
        </div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Book Not Found</h2>
        <p className="text-slate-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/books">
          <Button>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Book Selection
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Navigation */}
      <div>
        <Link to="/books" className="inline-flex items-center text-slate-600 hover:text-indigo-600 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Book Selection
        </Link>
      </div>
      
      {/* Book Details Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="md:w-1/4">
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg border bg-slate-50">
            {book.coverImg ? (
              <img 
                src={book.coverImg} 
                alt={book.title} 
                className="object-contain h-full w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/book-placeholder.png";
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-slate-400 text-xl font-medium">{book.title}</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Book Info */}
        <div className="md:w-3/4 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{book.title}</h1>
            <p className="text-lg text-slate-600">{book.publisher}, {book.year}</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {book.categories.map((cat) => (
              <Badge key={cat} variant="secondary">{cat}</Badge>
            ))}
            <Badge variant="outline">{book.level}</Badge>
          </div>
          
          <p className="text-slate-700">{book.description}</p>
          
          <div className="pt-2">
            <h3 className="text-lg font-medium mb-2">Book Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Your Progress</span>
                <span className="font-medium">
                  {book.tests.filter(
                    (test: TestSection) => getLatestAttempt(test.id)?.completed
                  ).length} / {book.tests.length} Tests Completed
                </span>
              </div>
              <Progress 
                value={(book.tests.filter(
                  (test: TestSection) => getLatestAttempt(test.id)?.completed
                ).length / book.tests.length) * 100} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tests and History */}
      <Tabs defaultValue="tests" className="mt-8">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="tests">Available Tests</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>
        
        {/* Tests Tab */}
        <TabsContent value="tests" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {book.tests.map((test: TestSection) => {
              const latestAttempt = getLatestAttempt(test.id);
              const attemptCount = getTestAttempts(test.id).length;
              
              return (
                <Card key={test.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{test.title}</CardTitle>
                      <Badge variant={
                        test.difficulty === "Easy" ? "outline" : 
                        test.difficulty === "Medium" ? "secondary" : 
                        "destructive"
                      }>
                        {test.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-slate-500" />
                        <span>{test.questionsCount} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span>{test.estimatedTime} minutes</span>
                      </div>
                    </div>
                    
                    {latestAttempt && (
                      <div className="pt-2 border-t">
                        <div className="text-sm font-medium mb-1">Last attempt</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5 text-slate-500" />
                            <span>{formatDate(latestAttempt.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart2 className="h-3.5 w-3.5 text-slate-500" />
                            <span>{latestAttempt.score}/{latestAttempt.totalQuestions}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      {attemptCount > 0 
                        ? `${attemptCount} attempt${attemptCount > 1 ? 's' : ''}` 
                        : 'Not attempted'}
                    </span>
                    <Button>
                      {latestAttempt ? 'Retry Test' : 'Start Test'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history" className="mt-6">
          {userAttempts.filter(attempt => 
            book.tests.some((test: TestSection) => test.id === attempt.testId)
          ).length > 0 ? (
            <div className="space-y-4">
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Test</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Score</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Time Spent</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userAttempts
                      .filter(attempt => 
                        book.tests.some((test: TestSection) => test.id === attempt.testId)
                      )
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((attempt, i) => {
                        const test = book.tests.find((t: TestSection) => t.id === attempt.testId);
                        if (!test) return null;
                        
                        return (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-slate-900">{test.title}</div>
                              <div className="text-sm text-slate-500">{test.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                              {formatDate(attempt.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-slate-900">{attempt.score}/{attempt.totalQuestions}</div>
                              <div className="text-sm text-slate-500">
                                {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                              {attempt.timeSpent} min
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                attempt.completed 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {attempt.completed ? 'Completed' : 'Incomplete'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm">Review</Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-md">
              <h3 className="text-xl font-medium text-slate-600">No test history</h3>
              <p className="text-slate-500 mt-2 mb-6">You haven't attempted any tests from this book yet.</p>
              <Button>Start Your First Test</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}