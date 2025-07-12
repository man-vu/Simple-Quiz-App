import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileHeaderProps {
  showMobileMenu: boolean;
  onToggleMenu: () => void;
}

export function MobileHeader({ showMobileMenu, onToggleMenu }: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">CCNA Quiz App</h1>
          <p className="text-sm text-muted-foreground">Select a course and module</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMenu}
        >
          {showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
} 