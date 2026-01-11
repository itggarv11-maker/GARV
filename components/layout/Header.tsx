

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'https://esm.sh/react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { ArrowLeftOnRectangleIcon } from '../icons/ArrowLeftOnRectangleIcon';
import { AcademicCapIcon } from '../icons/AcademicCapIcon';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { BrainCircuitIcon } from '../icons/BrainCircuitIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { RocketLaunchIcon } from '../icons/RocketLaunchIcon';
import { DocumentDuplicateIcon } from '../icons/DocumentDuplicateIcon';
import { ChatBubbleLeftRightIcon } from '../icons/ChatBubbleLeftRightIcon';
import { MicrophoneIcon } from '../icons/MicrophoneIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { VideoCameraIcon } from '../icons/VideoCameraIcon';
import { GavelIcon } from '../icons/GavelIcon';
import { QuestIcon } from '../icons/QuestIcon';

const Header: React.FC = () => {
  const { currentUser, logout, loading, tokens } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  const headerClasses = 'relative z-50 bg-transparent py-2';
  const linkClass = "text-slate-700 hover:text-black transition-colors duration-300 px-3 py-2 rounded-md font-semibold text-base flex items-center gap-1.5";
  const activeLinkClass = "text-black";

  const renderLogo = () => {
      return (
        <NavLink to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-600 to-pink-500 p-2 rounded-lg shadow-lg">
                <AcademicCapIcon className="h-7 w-7 text-white" />
            </div>
            <div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-violet-700">StuBro AI</span>
                <div className="text-xs text-slate-500 -mt-1 font-poppins">
                    by Garv
                </div>
            </div>
        </NavLink>
      );
  };
  
  const renderNavLinks = () => {
    if (loading) return <Spinner className="w-5 h-5" colorClass="bg-slate-800" />;

    if (currentUser) {
      return (
        <>
          <NavLink to="/app" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
            Dashboard
          </NavLink>
          
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className={`${linkClass} ${dropdownOpen ? activeLinkClass : ''}`}>
              Tools <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white/80 backdrop-blur-md ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to="/chapter-conquest" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <QuestIcon className="w-5 h-5" /> Chapter Conquest
                  </Link>
                  <Link to="/live-debate" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <GavelIcon className="w-5 h-5" /> Live Debate Arena
                  </Link>
                  <Link to="/mind-map" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <BrainCircuitIcon className="w-5 h-5" /> Mind Maps
                  </Link>
                  <Link to="/study-planner" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <CalendarIcon className="w-5 h-5" /> Study Planner
                  </Link>
                  <Link to="/question-paper" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <DocumentDuplicateIcon className="w-5 h-5" /> Question Paper
                  </Link>
                   <Link to="/career-guidance" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <RocketLaunchIcon className="w-5 h-5" /> Career Guidance
                  </Link>
                   <Link to="/viva" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <MicrophoneIcon className="w-5 h-5" /> Viva Prep
                  </Link>
                  <Link to="/gemini-live" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" /> Live Doubts
                  </Link>
                  <Link to="/visual-explanation" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-violet-600 w-full text-left" role="menuitem">
                    <VideoCameraIcon className="w-5 h-5" /> Visual Explanation
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/premium" className={`${linkClass} !text-violet-600`}>
              <SparklesIcon className="w-4 h-4"/> Premium
          </Link>
          <div className="flex items-center gap-2 bg-slate-200/50 rounded-full px-3 py-1.5 text-sm">
             <span className="font-bold text-slate-600">Tokens: {tokens ?? '...'}</span>
          </div>
          <NavLink to="/profile" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
              <UserCircleIcon className="w-4 h-4"/> Profile
          </NavLink>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
            Logout
          </Button>
        </>
      );
    }
    
    // Logged out state
    if (location.pathname === '/') {
      return (
        <>
          <a href="#features" className={linkClass}>Features</a>
          <Link to="/premium" className={`${linkClass} !text-violet-600`}>
              <SparklesIcon className="w-4 h-4"/> Premium
          </Link>
          <Link to="/signup">
            <Button variant='primary' size="md" className="font-semibold">Get Started</Button>
          </Link>
        </>
      );
    }

    // Default logged out state for other pages
    return (
      <>
        <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
          Home
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
          Contact
        </NavLink>
        <Link to="/premium" className={`${linkClass} !text-violet-600`}>
          <SparklesIcon className="w-4 h-4"/> Premium
        </Link>
        <Link to="/login">
          <Button variant='outline' size="sm" className="hidden md:flex">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant='primary' size="sm">Sign Up</Button>
        </Link>
      </>
    );
  };

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {renderLogo()}
        <div className="flex items-center space-x-1 md:space-x-4">
          {renderNavLinks()}
        </div>
      </nav>
    </header>
  );
};

export default Header;