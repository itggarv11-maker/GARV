import React from 'react';
// Fix: Use esm.sh for react-router-dom to resolve module member errors and maintain consistency across the project
import { HashRouter, Route, Routes } from 'https://esm.sh/react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VisualExplanationPage from './pages/VisualExplanationPage';

// Placeholder components for routes missing in the provided files
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-20 text-center">
    <h2 className="text-2xl font-bold">{name} Page</h2>
    <p className="text-slate-500">This module is currently being optimized.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Placeholder name="Home" />} />
            <Route path="/app" element={<Placeholder name="Dashboard" />} />
            <Route path="/visual-explanation" element={<VisualExplanationPage />} />
            <Route path="/profile" element={<Placeholder name="Profile" />} />
            <Route path="/premium" element={<Placeholder name="Premium" />} />
            {/* Catch-all route */}
            <Route path="*" element={<Placeholder name="Coming Soon" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;