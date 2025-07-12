import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';

export function ErrorAlert() {
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