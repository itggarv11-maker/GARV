
import React, { useState } from 'react';
import { useNavigate, Link } from 'https://esm.sh/react-router-dom';
import * as geminiService from '../services/geminiService';
import { useContent } from '../contexts/ContentContext';
import { VisualExplanationScene, ClassLevel, Subject } from '../types';
import { CLASS_LEVELS, SUBJECTS } from '../constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import VisualPlayer from '../components/app/VisualPlayer';
import { VideoCameraIcon } from '../components/icons/VideoCameraIcon';

const VisualExplanationPage: React.FC = () => {
    const { extractedText: globalExtractedText, classLevel: globalClassLevel, subject: globalSubject, hasSessionStarted } = useContent();
    const navigate = useNavigate();

    const [isGenerating, setIsGenerating] = useState(false);
    const [videoScenes, setVideoScenes] = useState<VisualExplanationScene[] | null>(null);
    const [error, setError] = useState<React.ReactNode | null>(null);
    
    const [setupMode, setSetupMode] = useState<'content' | 'topic'>(hasSessionStarted && globalExtractedText ? 'content' : 'topic');
    const [customTopic, setCustomTopic] = useState('');
    const [classLevel, setClassLevel] = useState<ClassLevel>(globalClassLevel || 'Class 10');
    const [subject, setSubject] = useState<Subject | null>(globalSubject);
    const [language, setLanguage] = useState('en-IN');

    const handleStartGeneration = async () => {
        setIsGenerating(true);
        setError(null);
        setVideoScenes(null);
        
        let textToProcess = globalExtractedText;

        try {
            if (setupMode === 'topic') {
                if (!customTopic || !subject) throw new Error("Please enter a topic and select a subject.");
                textToProcess = await geminiService.fetchChapterContent(classLevel, subject, customTopic, '');
            }
            
            if (!textToProcess) throw new Error("No chapter content found.");

            const scenes = await geminiService.generateSingleDemoVideo(textToProcess, language, classLevel);
            setVideoScenes(scenes);
        } catch (err: any) {
            setError(err.message.includes("tokens") 
                ? <span>Out of tokens! <Link to="/premium" className="underline">Upgrade to Premium</Link></span> 
                : err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    if (videoScenes) {
        return (
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-800">Chapter Demo Summary (3-4 Mins)</h1>
                    <Button variant="outline" size="sm" onClick={() => setVideoScenes(null)}>Create New Video</Button>
                </div>
                <VisualPlayer scenes={videoScenes} language={language} />
                <Card variant="light" className="!bg-violet-50 border-violet-200">
                    <h3 className="font-bold text-violet-800 mb-1">📽️ About this Video</h3>
                    <p className="text-violet-700 text-sm">
                        This is a comprehensive, deep-dive summary. It uses minimal, high-impact visuals combined with thorough AI narration to mimic a real 4-minute classroom demo.
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card variant="light">
                <div className="text-center mb-8">
                    <VideoCameraIcon className="w-16 h-16 mx-auto text-violet-600" />
                    <h1 className="text-3xl font-bold text-slate-800 mt-4">AI Demo Video</h1>
                    <p className="mt-2 text-slate-600">Generate a high-quality 4-minute summary demo.</p>
                </div>
                
                <div className="flex space-x-1 rounded-lg bg-slate-100 p-1 mb-6">
                    <button 
                        disabled={!globalExtractedText} 
                        onClick={() => setSetupMode('content')} 
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${setupMode === 'content' ? 'bg-white text-violet-600 shadow' : 'text-slate-500'}`}
                    >
                        Use Current Notes
                    </button>
                    <button 
                        onClick={() => setSetupMode('topic')} 
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${setupMode === 'topic' ? 'bg-white text-violet-600 shadow' : 'text-slate-500'}`}
                    >
                        Search New Topic
                    </button>
                </div>

                <div className="space-y-4">
                    {setupMode === 'topic' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={customTopic} onChange={e => setCustomTopic(e.target.value)} placeholder="Topic Name" className="w-full p-2 border rounded-md"/>
                            <select value={subject || ''} onChange={e => setSubject(e.target.value as Subject)} className="w-full p-2 border rounded-md">
                                <option value="">Select Subject</option>
                                {SUBJECTS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <select value={classLevel} onChange={e => setClassLevel(e.target.value as ClassLevel)} className="w-full p-2 border rounded-md">
                            {CLASS_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full p-2 border rounded-md">
                            <option value="en-IN">English (India)</option>
                            <option value="hi">Hinglish</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-center text-sm font-bold">{error}</p>}
                    
                    <Button onClick={handleStartGeneration} className="w-full py-4 text-lg" disabled={isGenerating}>
                        {isGenerating ? <><Spinner colorClass="bg-white" /> Building 4-Min Demo...</> : 'Generate Chapter Demo'}
                    </Button>
                </div>
            </Card>
            
            {isGenerating && (
                <div className="mt-8 flex flex-col items-center justify-center p-8 bg-white/50 rounded-2xl border border-dashed border-violet-300">
                    <Spinner className="w-12 h-12" colorClass="bg-violet-600" />
                    <p className="mt-4 text-violet-700 font-bold">Creating high-depth narration...</p>
                    <p className="text-xs text-slate-500 text-center mt-2 italic">Generating 4K illustrations and preparing a 4-minute demo. Please wait, this takes about 1-2 minutes.</p>
                </div>
            )}
        </div>
    );
};

export default VisualExplanationPage;
