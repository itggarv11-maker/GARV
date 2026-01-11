import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'light' | 'outline';
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, variant = 'white', className = '' }) => {
  const baseStyles = "p-6 rounded-2xl transition-all duration-300";
  const variants = {
    white: "bg-white shadow-xl shadow-slate-200/50 border border-slate-100",
    light: "bg-slate-50 border border-slate-200",
    outline: "bg-transparent border-2 border-slate-200 border-dashed"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;