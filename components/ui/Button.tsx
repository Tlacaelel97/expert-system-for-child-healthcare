import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Button = ({ children, variant = 'primary', onClick, className = "", icon: Icon }: ButtonProps) => {
  const baseStyle = "flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 transform active:scale-95";
  const variants = {
    primary: "bg-teal-500 hover:bg-teal-400 text-slate-900 shadow-lg shadow-teal-500/20",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600",
    outline: "bg-transparent border border-slate-600 text-slate-300 hover:border-teal-500 hover:text-teal-400"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon className="ml-2 w-5 h-5" />}
    </button>
  );
};
