import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, CheckCircle, Clock, BarChart3, Star, StarHalf, ChevronDown, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

// Test categories and test data
const categories = [
  { id: "business", name: "Business", icon: "💼", color: "bg-blue-100 text-blue-800" },
  { id: "it", name: "IT & Programming", icon: "💻", color: "bg-purple-100 text-purple-800" },
  { id: "medicine", name: "Medicine", icon: "🩺", color: "bg-green-100 text-green-800" },
  { id: "psychology", name: "Psychology", icon: "🧠", color: "bg-amber-100 text-amber-800" },
  { id: "language", name: "Language", icon: "🌐", color: "bg-red-100 text-red-800" },
  { id: "law", name: "Law", icon: "⚖️", color: "bg-indigo-100 text-indigo-800" },
  { id: "education", name: "Education", icon: "📚", color: "bg-teal-100 text-teal-800" },
  { id: "engineering", name: "Engineering", icon: "🔧", color: "bg-orange-100 text-orange-800" }
];

const testData = [
  {
    id: 1,
    title: "PMP Certification Practice Test",
    category: "business",
    difficulty: "Advanced",
    questionsCount: 200,
    timeEstimate: "3 hours",
    rating: 4.8,
    reviews: 356,
    description: "Comprehensive practice test for the Project Management Professional (PMP) certification exam. Covers all knowledge areas from the PMBOK Guide.",
    topics: ["Project Integration", "Scope Management", "Time Management", "Cost Management", "Quality Management", "Resource Management"],
    popular: true
  },
  {
    id: 2,
    title: "AWS Solutions Architect Associate",
    category: "it",
    difficulty: "Intermediate",
    questionsCount: 180,
    timeEstimate: "2.5 hours",
    rating: 4.9,
    reviews: 423,
    description: "Prepare for the AWS Solutions Architect Associate certification with practice questions covering all exam domains.",
    topics: ["EC2 & Compute", "S3 & Storage", "VPC Networking", "Security & IAM", "Databases", "Serverless"],
    popular: true
  },
  {
    id: 3,
    title: "MCAT Biology Section",
    category: "medicine",
    difficulty: "Advanced",
    questionsCount: 150,
    timeEstimate: "2 hours",
    rating: 4.7,
    reviews: 289,
    description: "Focused practice for the biology section of the Medical College Admission Test (MCAT).",
    topics: ["Cell Biology", "Genetics", "Evolution", "Physiology", "Biochemistry"],
    popular: true
  },
  {
    id: 4,
    title: "Clinical Psychology Concepts",
    category: "psychology",
    difficulty: "Intermediate",
    questionsCount: 120,
    timeEstimate: "1.5 hours",
    rating: 4.6,
    reviews: 217,
    description: "Review key concepts in clinical psychology with application questions and case studies.",
    topics: ["Diagnostic Criteria", "Therapy Approaches", "Ethics", "Assessment Methods", "Psychopathology"],
    popular: false
  },
  {
    id: 5,
    title: "IELTS Speaking Practice",
    category: "language",
    difficulty: "All Levels",
    questionsCount: 100,
    timeEstimate: "1.5 hours",
    rating: 4.9,
    reviews: 512,
    description: "Interactive speaking practice for the IELTS exam with sample questions and evaluation criteria.",
    topics: ["Personal Introduction", "Topic Discussion", "Abstract Topics", "Fluency & Coherence", "Pronunciation"],
    popular: true
  },
  {
    id: 6,
    title: "Bar Exam Practice - Constitutional Law",
    category: "law",
    difficulty: "Advanced",
    questionsCount: 175,
    timeEstimate: "2 hours",
    rating: 4.8,
    reviews: 198,
    description: "Constitutional law questions in the style of the bar examination with detailed explanations.",
    topics: ["Due Process", "Equal Protection", "First Amendment", "Commerce Clause", "Separation of Powers"],
    popular: false
  },
  {
    id: 7,
    title: "Machine Learning Fundamentals",
    category: "it",
    difficulty: "Intermediate",
    questionsCount: 120,
    timeEstimate: "2 hours",
    rating: 4.7,
    reviews: 327,
    description: "Test your understanding of machine learning concepts, algorithms, and implementations.",
    topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Model Evaluation", "Data Preprocessing"],
    popular: false
  },
  {
    id: 8,
    title: "Financial Accounting Principles",
    category: "business",
    difficulty: "Beginner",
    questionsCount: 150,
    timeEstimate: "1.5 hours",
    rating: 4.6,
    reviews: 275,
    description: "Comprehensive review of financial accounting concepts and principles with practice problems.",
    topics: ["Balance Sheet", "Income Statement", "Cash Flow", "GAAP Principles", "Financial Analysis"],
    popular: false
  },
  {
    id: 9,
    title: "NCLEX-RN Practice Test",
    category: "medicine",
    difficulty: "Advanced",
    questionsCount: 265,
    timeEstimate: "3 hours",
    rating: 4.9,
    reviews: 468,
    description: "Full-length practice test for the NCLEX-RN examination with questions across all nursing categories.",
    topics: ["Patient Care", "Pharmacology", "Health Promotion", "Physiological Adaptation", "Management of Care"],
    popular: true
  },
  {
    id: 10,
    title: "Early Childhood Education Assessment",
    category: "education",
    difficulty: "Intermediate",
    questionsCount: 110,
    timeEstimate: "1.5 hours",
    rating: 4.7,
    reviews: 189,
    description: "Comprehensive assessment covering principles and practices in early childhood education.",
    topics: ["Child Development", "Curriculum Planning", "Learning Environments", "Assessment", "Family Engagement"],
    popular: false
  },
  {
    id: 11,
    title: "Civil Engineering Fundamentals",
    category: "engineering",
    difficulty: "Intermediate",
    questionsCount: 140,
    timeEstimate: "2 hours",
    rating: 4.8,
    reviews: 203,
    description: "Practice questions covering fundamental concepts in civil engineering.",
    topics: ["Structural Analysis", "Fluid Mechanics", "Soil Mechanics", "Construction Materials", "Engineering Ethics"],
    popular: false
  },
  {
    id: 12,
    title: "TOEFL Listening Test",
    category: "language",
    difficulty: "Intermediate",
    questionsCount: 80,
    timeEstimate: "1 hour",
    rating: 4.8,
    reviews: 356,
    description: "Practice tests for the listening section of the TOEFL exam with authentic audio samples.",
    topics: ["Academic Lectures", "Campus Conversations", "Note-taking", "Main Ideas & Details", "Making Inferences"],
    popular: true
  },
];

export default function TestLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortOption, setSortOption] = useState("popular");

  // Filter and sort tests
  const filteredTests = testData.filter(test => {
    // Category filter
    if (activeCategory !== "all" && test.category !== activeCategory) {
      return false;
    }
    
    // Search query
    if (searchQuery && !test.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !test.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Difficulty filter
    if (difficultyFilter !== "all" && test.difficulty !== difficultyFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortOption === "popular") {
      return b.reviews - a.reviews;
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    } else if (sortOption === "newest") {
      return b.id - a.id;
    }
    return 0;
  });

  // Function to display difficulty badge with color
  const getDifficultyBadge = (difficulty: string) => {
    let color = "";
    switch(difficulty) {
      case "Beginner":
        color = "bg-green-100 text-green-800";
        break;
      case "Intermediate":
        color = "bg-amber-100 text-amber-800";
        break;
      case "Advanced":
        color = "bg-red-100 text-red-800";
        break;
      default:
        color = "bg-blue-100 text-blue-800";
    }
    return <Badge variant="outline" className={`${color} border-0`}>{difficulty}</Badge>;
  };

  return (
    <div className="py-16 md:py-24 container">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Test Library</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of tests, quizzes, and practice exams across various fields and subjects.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            placeholder="Search tests by name or description..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="All Levels">All Levels</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4 flex flex-wrap h-auto gap-2 bg-transparent">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800"
            >
              All Categories
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className={`data-[state=active]:${category.color}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {/* All tests will be shown here */}
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              {/* Category-specific tests will be shown here */}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => {
            const category = categories.find(cat => cat.id === test.category);
            
            return (
              <Card key={test.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                {test.popular && (
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs py-1 px-3 text-center">
                    Popular Test
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <Badge className={`${category?.color} border-0`}>
                      <span className="mr-1">{category?.icon}</span> {category?.name}
                    </Badge>
                    {getDifficultyBadge(test.difficulty)}
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-3">{test.title}</h3>
                  
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">{test.description}</p>
                  
                  <div className="flex items-center mt-4 text-sm text-slate-500">
                    <div className="flex items-center mr-4">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{test.questionsCount} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{test.timeEstimate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm">
                    <div className="flex items-center text-amber-500">
                      {Array(Math.floor(test.rating)).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      {test.rating % 1 > 0 && <StarHalf className="h-4 w-4 fill-current" />}
                    </div>
                    <span className="ml-1 text-slate-600">
                      {test.rating} ({test.reviews} reviews)
                    </span>
                  </div>
                  
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="topics" className="border-b-0">
                      <AccordionTrigger className="py-2 text-sm font-medium text-slate-700">
                        Topics Covered
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {test.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="bg-slate-100">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-5 flex justify-between items-center">
                    <Link to={`/test/${test.id}`}>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        Start Test <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center py-12 text-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <Search className="h-6 w-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold">No tests found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setDifficultyFilter("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
        <p className="text-slate-700 max-w-2xl mx-auto mb-6">
          We're constantly adding new tests to our library. Let us know what subject or certification you need help with.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Request a New Test
          </Button>
          <Button variant="outline">
            Browse Popular Requests
          </Button>
        </div>
      </div>
    </div>
  );
}