import React from 'react';

interface SpinnerProps {
  className?: string;
  colorClass?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className = "w-5 h-5", colorClass = "bg-violet-600" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 rounded-full border-4 border-slate-200 opacity-25`}></div>
      <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${colorClass.replace('bg-', 'border-')}`}></div>
    </div>
  );
};

export default Spinner;