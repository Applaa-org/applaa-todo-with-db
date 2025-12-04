import React from 'react';
import { MadeWithApplaa } from './made-with-applaa';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-foreground">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="w-full">
        <MadeWithApplaa />
      </footer>
    </div>
  );
}