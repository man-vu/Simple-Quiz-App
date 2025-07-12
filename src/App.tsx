import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { ThemeProvider } from '@/hooks/use-theme';
import Home from './pages/Home';
import TestLibrary from './pages/TestLibrary';
import TestPage from './pages/TestPage';
import QuestionSamples from './pages/QuestionSamples';
import BookSelection from './pages/BookSelection';
import BookDetails from './pages/BookDetails';
import QuizApp from './pages/QuizApp';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="quizverse-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Home />} />
              <Route path="/tests" element={<TestLibrary />} />
              <Route path="/question-samples" element={<QuestionSamples />} />
              <Route path="/books" element={<BookSelection />} />
              <Route path="/books/:bookId" element={<BookDetails />} />
              <Route path="/pricing" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/login" element={<Home />} />
              <Route path="/signup" element={<Home />} />
              <Route path="/demo" element={<Home />} />
              <Route path="/quiz" element={<QuizApp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
