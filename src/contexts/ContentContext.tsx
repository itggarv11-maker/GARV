import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, ClassLevel } from '../types';

interface ContentContextType {
  extractedText: string;
  setExtractedText: (text: string) => void;
  classLevel: ClassLevel;
  setClassLevel: (level: ClassLevel) => void;
  subject: Subject | null;
  setSubject: (subject: Subject | null) => void;
  hasSessionStarted: boolean;
  setHasSessionStarted: (started: boolean) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [extractedText, setExtractedText] = useState('');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class 10');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [hasSessionStarted, setHasSessionStarted] = useState(false);

  return (
    <ContentContext.Provider value={{
      extractedText, setExtractedText,
      classLevel, setClassLevel,
      subject, setSubject,
      hasSessionStarted, setHasSessionStarted
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
