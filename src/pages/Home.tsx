import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, BriefcaseBusiness, CheckCircle2, Laptop, Monitor, Stethoscope } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-background to-purple-50 dark:from-indigo-950/20 dark:via-background dark:to-purple-950/20 -z-10"></div>
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="max-w-2xl lg:max-w-xl space-y-8">
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
                <span className="animate-pulse mr-1">•</span> Next-generation learning platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block">Your All-in-One</span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Platform for Smarter Test Prep</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Quizverse brings interactive, AI-powered practice and analytics to every stage of your learning journey across Business, IT, Psychology, Medicine, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    Get Started for Free
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="outline">
                    See Live Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full max-w-xl">
              <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Project Management Quiz</h3>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Question 3 of 10</span>
                        <span>Time Remaining: 02:45</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div className="p-5 bg-muted/50 rounded-lg">
                      <p className="font-medium">Which of the following best describes the purpose of a project kickoff meeting?</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg transition-colors hover:bg-accent hover:border-accent-foreground/20 cursor-pointer">
                        <div className="w-5 h-5 border rounded-full"></div>
                        <span>To delegate all project tasks</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                        <div className="w-5 h-5 bg-indigo-600 border-indigo-600 flex items-center justify-center rounded-full">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">To align team members on project objectives and expectations</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg transition-colors hover:bg-accent hover:border-accent-foreground/20 cursor-pointer">
                        <div className="w-5 h-5 border rounded-full"></div>
                        <span>To create a detailed project timeline</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg transition-colors hover:bg-accent hover:border-accent-foreground/20 cursor-pointer">
                        <div className="w-5 h-5 border rounded-full"></div>
                        <span>To review completed deliverables</span>
                      </div>
                    </div>
                    <div className="p-5 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-800/30 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-200 flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Correct!
                      </h4>
                      <p className="mt-2 text-sm text-green-800 dark:text-green-200">
                        A project kickoff meeting brings together the project team and stakeholders to establish a shared understanding of the project's goals, scope, timeline, and individual responsibilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating icons */}
              <div className="absolute -top-8 -left-8 p-3 bg-card rounded-lg shadow-lg animate-bounce-slow border">
                <BriefcaseBusiness className="h-8 w-8 text-blue-500" />
              </div>
              <div className="absolute top-1/4 -right-6 p-3 bg-card rounded-lg shadow-lg animate-bounce-slow animation-delay-500 border">
                <Laptop className="h-8 w-8 text-purple-500" />
              </div>
              <div className="absolute bottom-0 -left-10 p-3 bg-card rounded-lg shadow-lg animate-bounce-slow animation-delay-1000 border">
                <Brain className="h-8 w-8 text-amber-500" />
              </div>
              <div className="absolute -bottom-5 right-16 p-3 bg-card rounded-lg shadow-lg animate-bounce-slow animation-delay-1500 border">
                <Stethoscope className="h-8 w-8 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diverse Test Support */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Diverse Test Support</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Prepare for standardized exams, industry certifications, university midterms, workplace assessments, and more—all in one place.
            </p>
          </div>
          
          <Carousel className="mt-12">
            <CarouselContent>
              {[
                { name: 'IELTS', icon: '🌐', color: 'bg-blue-500' },
                { name: 'TOEFL', icon: '🎓', color: 'bg-indigo-500' },
                { name: 'PMP', icon: '📊', color: 'bg-purple-500' },
                { name: 'AWS', icon: '☁️', color: 'bg-orange-500' },
                { name: 'Azure', icon: '⚡', color: 'bg-blue-400' },
                { name: 'CPA', icon: '💼', color: 'bg-green-500' },
                { name: 'MCAT', icon: '🩺', color: 'bg-red-500' },
                { name: 'LSAT', icon: '⚖️', color: 'bg-amber-500' },
              ].map((exam, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <Card className="border-0 shadow-md transition-all hover:shadow-lg cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-full ${exam.color} flex items-center justify-center text-2xl mb-4`}>
                        {exam.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{exam.name}</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Comprehensive practice tests with AI-powered feedback
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="mt-10 text-center">
            <Link to="/tests">
              <Button variant="outline" className="group">
                Explore Test Library
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Key Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Unlock your potential with our intelligent learning tools and personalized experiences.
            </p>
          </div>

          <Tabs defaultValue="feedback" className="mt-12 max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
              <TabsTrigger value="quizzes">Interactive Quizzes</TabsTrigger>
              <TabsTrigger value="paths">Learning Paths</TabsTrigger>
              <TabsTrigger value="insights">Progress Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="feedback" className="mt-6">
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Smart AI Feedback</h3>
                    <p className="mt-2 text-muted-foreground">
                      Get instant, personalized feedback on every question, including detailed explanations and skill analytics to help you understand your strengths and weaknesses.
                    </p>
                    <ul className="mt-6 space-y-2">
                      {['Detailed explanations for each answer', 'Concept breakdowns', 'Skill gap analysis', 'Personalized improvement recommendations'].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-muted p-4 rounded-lg">
                    <div className="bg-card border rounded-lg p-4">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Your answer was partially correct.</p>
                          <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-100 dark:border-amber-800/30 text-sm">
                            <p>The primary storage mechanism in NoSQL databases is key-value pairs, which allows for flexible schema design.</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-indigo-700 dark:text-indigo-300">AI Feedback:</p>
                          <div className="mt-2 space-y-2 text-sm">
                            <p>You're right about the key-value storage mechanism, but that's only one type of NoSQL database. NoSQL encompasses several types:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Key-value stores (Redis, DynamoDB)</li>
                              <li>Document databases (MongoDB, CouchDB)</li>
                              <li>Column-family stores (Cassandra, HBase)</li>
                              <li>Graph databases (Neo4j, JanusGraph)</li>
                            </ul>
                            <p className="mt-2 font-medium">Recommendation: Review the different types of NoSQL databases and their use cases.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="quizzes" className="mt-6">
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Interactive & Adaptive Quizzes</h3>
                    <p className="mt-2 text-muted-foreground">
                      Experience realistic test simulations with dynamic question types—multiple choice, matching, case studies, coding challenges, and clinical vignettes.
                    </p>
                    <ul className="mt-6 space-y-2">
                      {['Realistic exam simulation', 'Variety of question formats', 'Adaptive difficulty levels', 'Timed practice sessions'].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-muted p-4 rounded-lg">
                    <div className="bg-card border rounded-lg p-4">
                      <div className="space-y-3">
                        <p className="font-medium">Match the following psychological disorders with their primary symptoms:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-800/30">Major Depression</div>
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-between">
                            <span>Persistent low mood, anhedonia</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-800/30">General Anxiety</div>
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-between">
                            <span>Excessive worry, restlessness</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-800/30">ADHD</div>
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-between">
                            <span>Inattention, hyperactivity</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="paths" className="mt-6">
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Bespoke Learning Paths</h3>
                    <p className="mt-2 text-muted-foreground">
                      AI-generated study plans and recommendations tailored to your strengths and goals to optimize your learning journey.
                    </p>
                    <ul className="mt-6 space-y-2">
                      {['Personalized study schedules', 'Focus on weak areas', 'Spaced repetition learning', 'Goal-oriented roadmaps'].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-muted p-4 rounded-lg">
                    <div className="bg-card border rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Your PMP Certification Path</h4>
                          <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full">8 weeks</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">1</div>
                            <div className="h-1 w-8 bg-green-200"></div>
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">2</div>
                            <div className="h-1 w-8 bg-green-200"></div>
                            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">3</div>
                            <div className="h-1 w-8 bg-muted"></div>
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">4</div>
                            <div className="h-1 w-8 bg-muted"></div>
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">5</div>
                          </div>
                          <div>
                            <h5 className="font-medium">Current Focus: Process Groups</h5>
                            <p className="text-sm text-muted-foreground">Master the 5 process groups and their interactions</p>
                            <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                              Recommended: 3 practice tests this week
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="insights" className="mt-6">
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Progress Tracking & Insights</h3>
                    <p className="mt-2 text-muted-foreground">
                      Visualize your performance trends with intuitive dashboards and actionable insights to monitor your growth over time.
                    </p>
                    <ul className="mt-6 space-y-2">
                      {['Performance analytics', 'Study time tracking', 'Strength and weakness reports', 'Long-term progress visualization'].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-muted p-4 rounded-lg">
                    <div className="bg-card border rounded-lg p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Your Performance Analytics</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/30">
                            <div className="text-xs text-muted-foreground">Overall Score</div>
                            <div className="text-xl font-bold text-blue-700 dark:text-blue-300">78%</div>
                            <div className="text-xs text-green-600 dark:text-green-400">+12% this month</div>
                          </div>
                          <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30">
                            <div className="text-xs text-muted-foreground">Questions Completed</div>
                            <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">342</div>
                            <div className="text-xs">Past 30 days</div>
                          </div>
                        </div>
                        <div className="p-2 pt-3">
                          <div className="text-xs text-muted-foreground mb-1">Subject Performance</div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Project Planning</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <div className="w-full h-1.5 bg-muted rounded-full mt-1">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Risk Management</span>
                                <span className="font-medium">67%</span>
                              </div>
                              <div className="w-full h-1.5 bg-muted rounded-full mt-1">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Procurement</span>
                                <span className="font-medium">54%</span>
                              </div>
                              <div className="w-full h-1.5 bg-muted rounded-full mt-1">
                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '54%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Users Say</h2>
            <p className="mt-4 text-lg text-slate-600">
              Join thousands of successful test-takers who've transformed their study habits with Quizverse.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Quizverse's AI feedback completely changed how I study. I passed my PMP certification on the first try!",
                name: "Sarah Johnson",
                title: "Project Manager",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
              },
              {
                quote: "The personalized learning paths helped me focus on exactly what I needed to learn for my AWS certification.",
                name: "Michael Chen",
                title: "Cloud Solutions Architect",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
              },
              {
                quote: "As a medical student, I love how Quizverse adapts to my learning style. The clinical vignettes are incredibly realistic.",
                name: "Aisha Patel",
                title: "Medical Student",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-amber-400">★</span>
                      ))}
                    </div>
                    <p className="italic text-slate-600 flex-grow">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-slate-500">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Conquer Your Next Exam?</h2>
            <p className="mt-4 text-lg text-indigo-200">
              Join thousands of successful students and professionals. Start your learning journey today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-100">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/tests">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Test Library
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  See Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}