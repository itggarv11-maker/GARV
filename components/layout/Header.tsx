import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { 
  ArrowLeftOnRectangleIcon, 
  AcademicCapIcon, 
  UserCircleIcon, 
  ChevronDownIcon,
  SparklesIcon
} from '../icons';

const Header: React.FC = () => {
  const { currentUser, logout, loading, tokens } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[100] px-4 py-4">
      <nav className="container mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 shadow-xl shadow-slate-200/50 rounded-3xl px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
            <AcademicCapIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black font-heading tracking-tight text-slate-900">StuBro AI</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {currentUser ? (
            <>
              <NavLink to="/app" className={({ isActive }) => `font-bold text-sm uppercase tracking-wider ${isActive ? 'text-violet-600' : 'text-slate-500 hover:text-slate-900'}`}>Dashboard</NavLink>
              <Link to="/premium" className="font-bold text-sm uppercase tracking-wider text-pink-600 flex items-center gap-1.5">
                <SparklesIcon className="w-4 h-4" /> Premium
              </Link>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center gap-4">
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Your Tokens</div>
                    <div className="text-sm font-black text-slate-900 leading-none mt-1">{tokens ?? '...'}</div>
                 </div>
                 <Button onClick={handleLogout} variant="ghost" size="sm" className="text-slate-400 hover:text-red-500">
                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                 </Button>
              </div>
            </>
          ) : (
            <>
               <Link to="/login" className="font-bold text-sm uppercase tracking-wider text-slate-500 hover:text-slate-900">Login</Link>
               <Link to="/signup">
                  <Button size="md" className="rounded-xl shadow-lg shadow-violet-200">Join Now</Button>
               </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;