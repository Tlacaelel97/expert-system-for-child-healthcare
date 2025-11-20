import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);
