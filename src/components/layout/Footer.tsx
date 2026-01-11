import React from 'react';
// Fix: Use esm.sh for react-router-dom to resolve module member errors and maintain consistency across the project
import { Link } from 'https://esm.sh/react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">StuBro AI</h3>
            <p className="text-sm">Empowering Indian students with AI-driven personalized learning.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <p className="text-sm">Made with ❤️ for students.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} StuBro AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;