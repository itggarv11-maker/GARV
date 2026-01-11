
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
    
    // Setup State
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
                if (!customTopic || !subject) throw new Error("Please provide a topic and subject.");
                textToProcess = await geminiService.fetchChapterContent(classLevel, subject, customTopic, '');
            }
            
            if (!textToProcess) throw new Error("No content found to summarize.");

            const scenes = await geminiService.generateFullChapterSummaryVideo(textToProcess, language, classLevel);
            setVideoScenes(scenes);
        } catch (err: any) {
            setError(err.message.includes("tokens") 
                ? <span>Out of tokens! <Link to="/premium" className="underline">Upgrade to Premium</Link></span> 
                : err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const renderSetup = () => (
        <Card variant="light" className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <VideoCameraIcon className="w-16 h-16 mx-auto text-violet-600" />
                <h1 className="text-3xl font-bold text-slate-800 mt-4">AI Chapter Demo Video</h1>
                <p className="mt-2 text-slate-600">Create a high-quality 3-4 minute summary video of your chapter.</p>
            </div>
            
            <div className="flex space-x-1 rounded-lg bg-slate-100 p-1 mb-6">
                <button 
                    disabled={!globalExtractedText} 
                    onClick={() => setSetupMode('content')} 
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${setupMode === 'content' ? 'bg-white text-violet-600 shadow' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    Use My Notes
                </button>
                <button 
                    onClick={() => setSetupMode('topic')} 
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${setupMode === 'topic' ? 'bg-white text-violet-600 shadow' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    Search New Topic
                </button>
            </div>

            <div className="space-y-4">
                {setupMode === 'topic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Topic Name</label>
                            <input type="text" value={customTopic} onChange={e => setCustomTopic(e.target.value)} placeholder="e.g. Quantum Physics" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                            <select value={subject || ''} onChange={e => setSubject(e.target.value as Subject)} className="w-full p-2 border border-slate-300 rounded-md">
                                <option value="">Select Subject</option>
                                {SUBJECTS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                        <select value={classLevel} onChange={e => setClassLevel(e.target.value as ClassLevel)} className="w-full p-2 border border-slate-300 rounded-md">
                            {CLASS_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                        <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                            <option value="en-IN">English (India)</option>
                            <option value="hi">Hinglish</option>
                        </select>
                    </div>
                </div>
                {error && <p className="text-red-500 text-center text-sm font-semibold">{error}</p>}
                <div className="pt-4">
                    <Button onClick={handleStartGeneration} className="w-full py-4 text-lg" disabled={isGenerating}>
                        {isGenerating ? <><Spinner colorClass="bg-white" /> Generating Demo...</> : 'Generate Summary Video'}
                    </Button>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="container mx-auto">
            {!videoScenes && !isGenerating ? renderSetup() : (
                <div className="space-y-6">
                    {isGenerating ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur rounded-2xl border border-white/30 shadow-xl">
                            <Spinner className="w-16 h-16 mb-4" colorClass="bg-violet-600" />
                            <h2 className="text-2xl font-bold text-slate-800">Generating Demo Video...</h2>
                            <p className="text-slate-600 mt-2">I'm creating custom illustrations and deep narration for your chapter.</p>
                            <p className="text-xs text-slate-400 mt-1 italic">This may take 1-2 minutes.</p>
                        </div>
                    ) : videoScenes && (
                        <div className="max-w-5xl mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-slate-800">Chapter Summary Demo</h1>
                                <Button variant="outline" size="sm" onClick={() => setVideoScenes(null)}>Create Another</Button>
                            </div>
                            <VisualPlayer scenes={videoScenes} language={language} />
                            <Card variant="light" className="mt-8 !bg-violet-50 border-violet-200">
                                <h3 className="font-bold text-violet-800 mb-2">💡 Study Tip</h3>
                                <p className="text-violet-700 text-sm">This video summarizes the core pillars of the chapter. Use the playback controls to pause and take notes on the detailed narrations provided in each scene.</p>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VisualExplanationPage;
