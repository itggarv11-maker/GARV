import React from 'react';
// Fix: Use esm.sh for react-router-dom to resolve module member errors and maintain consistency across the project
import { Link } from 'https://esm.sh/react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          StuBro AI
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/app" className="text-slate-600 hover:text-violet-600 font-medium">Dashboard</Link>
          <Link to="/premium" className="text-slate-600 hover:text-violet-600 font-medium">Premium</Link>
          <Link to="/profile" className="text-slate-600 hover:text-violet-600 font-medium">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;