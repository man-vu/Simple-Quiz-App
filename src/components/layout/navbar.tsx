import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={cn(
      "fixed top-0 w-full z-40 transition-all duration-200",
      isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm border-b" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Quizverse</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/tests" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Test Library</Link>
          <Link to="/quiz" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Quiz</Link>
          <Link to="/books" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Books</Link>
          <Link to="/features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pricing</Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Get Started</Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="text-base font-medium text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/tests" className="text-base font-medium text-foreground hover:text-primary transition-colors">Test Library</Link>
              <Link to="/quiz" className="text-base font-medium text-foreground hover:text-primary transition-colors">Quiz</Link>
              <Link to="/books" className="text-base font-medium text-foreground hover:text-primary transition-colors">Books</Link>
              <Link to="/features" className="text-base font-medium text-foreground hover:text-primary transition-colors">Features</Link>
              <Link to="/pricing" className="text-base font-medium text-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/about" className="text-base font-medium text-foreground hover:text-primary transition-colors">About</Link>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-center mb-2">
                  <ThemeToggle />
                </div>
                <Link to="/login">
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Get Started</Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}