import React from 'react';
import {
  useQuizData,
  useQuizState,
  useMobile,
  LoadingSpinner,
  ErrorAlert,
  MobileSelectionLayout,
  MobileQuizLayout,
  DesktopLayout
} from '@/components/quiz';

export default function QuizApp() {
  // Custom hooks for state management
  const { quizData, loading, selectedCourse, setSelectedCourse } = useQuizData();
  const {
    currentCourse,
    currentModule,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    showResults,
    setShowResults,
    score,
    feedbackShown,
    calculateScore,
    handleSingleAnswer,
    handleMultipleAnswer,
    handleShowFeedback,
    handleHideFeedback,
    handleSubmit,
    handleReset,
    handleNext,
    handlePrevious,
    isQuestionAnswered,
    handleStartQuiz,
    handleBackToSelection
  } = useQuizState();
  
  const {
    isMobile,
    showMobileMenu,
    setShowMobileMenu,
    mobileMode,
    switchToQuizMode,
    switchToSelectionMode
  } = useMobile();

  // Get current questions
  const currentQuestions = quizData?.[currentCourse]?.modules[currentModule]?.questions || [];

  // Enhanced handlers that work with mobile mode
  const handleStartQuizWithMobile = (course: string, module: string) => {
    handleStartQuiz(course, module);
    switchToQuizMode();
  };

  const handleBackToSelectionWithMobile = () => {
    handleBackToSelection();
    switchToSelectionMode();
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (!quizData) {
    return <ErrorAlert />;
  }

  // Mobile Selection Mode
  if (isMobile && mobileMode === 'selection') {
    return (
      <MobileSelectionLayout
        quizData={quizData}
        selectedCourse={selectedCourse}
        showMobileMenu={showMobileMenu}
        onCourseSelect={setSelectedCourse}
        onStartQuiz={handleStartQuizWithMobile}
        onToggleMenu={() => setShowMobileMenu(!showMobileMenu)}
      />
    );
  }

  // Mobile Quiz Mode
  if (isMobile && mobileMode === 'quiz') {
    const scoreData = calculateScore(currentQuestions);
    
    return (
      <MobileQuizLayout
        currentModule={currentModule}
        currentCourse={currentCourse}
        currentQuestionIndex={currentQuestionIndex}
        currentQuestions={currentQuestions}
        userAnswers={userAnswers}
        showResults={showResults}
        score={score}
        correctAnswers={scoreData.correctAnswers}
        totalQuestions={scoreData.totalQuestions}
        isQuestionAnswered={isQuestionAnswered}
        feedbackShown={feedbackShown}
        onBackToSelection={handleBackToSelectionWithMobile}
        onReset={handleReset}
        onSingleAnswer={handleSingleAnswer}
        onMultipleAnswer={handleMultipleAnswer}
        onQuestionSelect={setCurrentQuestionIndex}
        onPrevious={handlePrevious}
        onNext={() => handleNext(currentQuestions)}
        onSubmit={() => handleSubmit(currentQuestions)}
        onCloseResults={() => setShowResults(false)}
        onShowFeedback={handleShowFeedback}
        onHideFeedback={handleHideFeedback}
      />
    );
  }

  // Desktop Layout
  const scoreData = calculateScore(currentQuestions);
  
  return (
    <DesktopLayout
      quizData={quizData}
      selectedCourse={selectedCourse}
      currentCourse={currentCourse}
      currentModule={currentModule}
      currentQuestionIndex={currentQuestionIndex}
      currentQuestions={currentQuestions}
      userAnswers={userAnswers}
      showResults={showResults}
      score={score}
      correctAnswers={scoreData.correctAnswers}
      totalQuestions={scoreData.totalQuestions}
      isQuestionAnswered={isQuestionAnswered}
      feedbackShown={feedbackShown}
      onCourseSelect={setSelectedCourse}
      onStartQuiz={handleStartQuiz}
      onReset={handleReset}
      onSingleAnswer={handleSingleAnswer}
      onMultipleAnswer={handleMultipleAnswer}
      onQuestionSelect={setCurrentQuestionIndex}
      onPrevious={handlePrevious}
      onNext={() => handleNext(currentQuestions)}
      onSubmit={() => handleSubmit(currentQuestions)}
      onCloseResults={() => setShowResults(false)}
      onShowFeedback={handleShowFeedback}
      onHideFeedback={handleHideFeedback}
    />
  );
} 