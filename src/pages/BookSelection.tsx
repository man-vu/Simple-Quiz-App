import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample book data (in a real app this would come from an API)
const books = [
  {
    id: "1",
    title: "Cambridge IELTS 17",
    coverImg: "/assets/books/ielts17.jpg",
    publisher: "Cambridge University Press",
    year: 2022,
    level: "Advanced",
    testCount: 4,
    description: "Authentic examination papers from Cambridge Assessment English",
    categories: ["IELTS", "Academic"],
    rating: 4.8
  },
  {
    id: "2",
    title: "Cambridge IELTS 16",
    coverImg: "/assets/books/ielts16.jpg",
    publisher: "Cambridge University Press",
    year: 2021,
    level: "Advanced",
    testCount: 4,
    description: "Authentic examination papers from Cambridge Assessment English",
    categories: ["IELTS", "Academic"],
    rating: 4.7
  },
  {
    id: "3",
    title: "Cambridge IELTS 15",
    coverImg: "/assets/books/ielts15.jpg",
    publisher: "Cambridge University Press",
    year: 2020,
    level: "Advanced",
    testCount: 4,
    description: "Authentic examination papers from Cambridge Assessment English",
    categories: ["IELTS", "Academic"],
    rating: 4.6
  },
  {
    id: "4",
    title: "Cambridge English Advanced 3",
    coverImg: "/assets/books/advanced3.jpg",
    publisher: "Cambridge University Press",
    year: 2021,
    level: "Advanced",
    testCount: 5,
    description: "Authentic examination papers for the Cambridge English Advanced exam",
    categories: ["CAE", "C1 Advanced"],
    rating: 4.9
  },
  {
    id: "5",
    title: "Cambridge First Certificate 6",
    coverImg: "/assets/books/fce6.jpg",
    publisher: "Cambridge University Press",
    year: 2019,
    level: "Upper-Intermediate",
    testCount: 4,
    description: "Four authentic Cambridge English Language Assessment examination papers for First/B2 First",
    categories: ["FCE", "B2 First"],
    rating: 4.5
  },
  {
    id: "6",
    title: "Official TOEFL iBT Tests Vol 1",
    coverImg: "/assets/books/toefl1.jpg",
    publisher: "ETS",
    year: 2020,
    level: "Advanced",
    testCount: 5,
    description: "Five authentic TOEFL iBT tests with all components",
    categories: ["TOEFL", "Academic"],
    rating: 4.7
  }
];

// Filter and sorting options
const categories = ["All", "IELTS", "TOEFL", "CAE", "FCE"];
const levels = ["All", "Intermediate", "Upper-Intermediate", "Advanced"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "name_asc", label: "A-Z" },
  { value: "name_desc", label: "Z-A" }
];

export default function BookSelection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

  // Filter books based on search, category, level
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || book.categories.includes(selectedCategory);
    const matchesLevel = selectedLevel === "All" || book.level === selectedLevel;
    
    // Filter by collection type (All, IELTS, TOEFL, etc.)
    if (activeTab !== "all" && !book.categories.includes(activeTab.toUpperCase())) {
      return false;
    }
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.year - a.year;
      case "oldest":
        return a.year - b.year;
      case "rating":
        return b.rating - a.rating;
      case "name_asc":
        return a.title.localeCompare(b.title);
      case "name_desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Navigate to book details page
  const handleBookSelect = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">Book Selection</h1>
        <p className="mt-2 text-lg text-slate-600">
          Choose a book to access practice tests and exercises
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search input */}
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">
                  Search
                </label>
                <Input
                  id="search"
                  placeholder="Search by title or publisher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category filter */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Level filter */}
              <div className="space-y-2">
                <label htmlFor="level" className="text-sm font-medium">
                  Level
                </label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort by */}
              <div className="space-y-2">
                <label htmlFor="sortBy" className="text-sm font-medium">
                  Sort by
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Reset button */}
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                  setSortBy("newest");
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Books grid */}
        <div className="w-full md:w-3/4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ielts">IELTS</TabsTrigger>
              <TabsTrigger value="toefl">TOEFL</TabsTrigger>
              <TabsTrigger value="cae">CAE</TabsTrigger>
              <TabsTrigger value="fce">FCE</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {sortedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                    {book.coverImg ? (
                      <div className="h-full flex items-center justify-center">
                        <img 
                          src={book.coverImg} 
                          alt={book.title} 
                          className="object-contain h-full w-full"
                          onError={(e) => {
                            // Fallback for missing images
                            (e.target as HTMLImageElement).src = "/assets/book-placeholder.png";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center bg-slate-100">
                        <div className="text-slate-400 text-xl font-medium">{book.title}</div>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <Badge variant="outline">{book.year}</Badge>
                    </div>
                    <CardDescription>{book.publisher}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-0">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {book.categories.map(cat => (
                        <Badge key={cat} variant="secondary">{cat}</Badge>
                      ))}
                      <Badge variant="outline">{book.level}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">{book.testCount} practice tests</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleBookSelect(book.id)}
                    >
                      Select Book
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-slate-600">No books found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}