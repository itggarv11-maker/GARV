import React from 'react';
import { HashRouter, Route, Routes } from 'https://esm.sh/react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VisualExplanationPage from './pages/VisualExplanationPage';
import { ContentProvider } from './contexts/ContentContext';

const Placeholder = ({ name }: { name: string }) => (
  <div className="p-20 text-center">
    <h2 className="text-2xl font-bold">{name} Page</h2>
    <p className="text-slate-500">This module is currently being optimized.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <ContentProvider>
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
              <Route path="*" element={<Placeholder name="Coming Soon" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ContentProvider>
  );
};

export default App;