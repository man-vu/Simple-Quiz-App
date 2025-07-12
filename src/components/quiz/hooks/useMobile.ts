import { useState, useEffect } from 'react';
import { MobileMode } from '../types';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMode, setMobileMode] = useState<MobileMode>('selection');

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const switchToQuizMode = () => {
    if (isMobile) {
      setMobileMode('quiz');
      setShowMobileMenu(false);
    }
  };

  const switchToSelectionMode = () => {
    setMobileMode('selection');
  };

  return {
    isMobile,
    showMobileMenu,
    setShowMobileMenu,
    mobileMode,
    switchToQuizMode,
    switchToSelectionMode
  };
} 