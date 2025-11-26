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
    primary: "bg-purple-400 hover:bg-purple-300 text-black shadow-lg shadow-purple-500/20 font-semibold",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-purple-400/30",
    outline: "bg-transparent border border-purple-400 text-purple-300 hover:border-purple-300 hover:text-purple-200"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon className="ml-2 w-5 h-5" />}
    </button>
  );
};
