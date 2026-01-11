import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { 
  SparklesIcon, 
  BrainCircuitIcon, 
  RocketLaunchIcon, 
  VideoCameraIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  DocumentTextIcon
} from '../components/icons';

const HomePage: React.FC = () => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Smartly", "Effortlessly", "Faster", "Visually"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rotateX = (clientY / innerHeight - 0.5) * 10;
      const rotateY = (clientX / innerWidth - 0.5) * -10;
      heroRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="relative">
      {/* Background Orbs */}
      <div className="orb w-[500px] h-[500px] bg-violet-400 -top-40 -left-40"></div>
      <div className="orb w-[400px] h-[400px] bg-pink-400 top-1/2 -right-20"></div>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mb-8 animate-bounce">
            <SparklesIcon className="w-4 h-4" />
            <span>AI-Powered Learning has evolved</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tight text-slate-900 mb-6 leading-tight">
            Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 text-glow">{words[activeWord]}</span><br />
            With StuBro AI
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            The intelligent study companion designed for the modern Indian student. Turn boring notes into interactive games, mind maps, and cinematic videos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-violet-200">
                Join 50,000+ Students
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-5 rounded-2xl border-slate-200">
                Explore Tools
              </Button>
            </a>
          </div>

          {/* Interactive 3D Mockup */}
          <div className="relative max-w-5xl mx-auto" ref={heroRef}>
             <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-[2.5rem] blur-2xl opacity-20"></div>
             <div className="relative bg-white/80 backdrop-blur-xl border border-white p-2 rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="aspect-[16/9] bg-slate-900 rounded-[1.5rem] flex items-center justify-center overflow-hidden">
                    <div className="text-left p-8 w-full h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-4 w-1/3 bg-slate-700 rounded animate-pulse"></div>
                            <div className="h-8 w-2/3 bg-violet-500/20 border border-violet-500/30 rounded flex items-center px-4">
                                <span className="text-violet-400 text-sm font-mono">Analyzing chapter: "Quantum Mechanics"...</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="h-32 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2">
                                    <BrainCircuitIcon className="w-8 h-8 text-violet-400" />
                                    <span className="text-[10px] text-slate-400">MIND MAP</span>
                                </div>
                                <div className="h-32 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2">
                                    <VideoCameraIcon className="w-8 h-8 text-pink-400" />
                                    <span className="text-[10px] text-slate-400">VISUAL AI</span>
                                </div>
                                <div className="h-32 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2">
                                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-400" />
                                    <span className="text-[10px] text-slate-400">LIVE CHAT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <StatItem number="10x" label="Faster Revision" />
                <StatItem number="100%" label="Concept Clarity" />
                <StatItem number="50k+" label="Active Learners" />
                <StatItem number="1M+" label="Doubts Solved" />
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">Study Like a Superhuman</h2>
            <p className="text-slate-600 text-lg">One dashboard. Every tool you need to top your class.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<VideoCameraIcon className="w-8 h-8" />}
              title="Visual Explanations"
              desc="Don't just read, watch! AI turns your text into a narrated video summary automatically."
              color="from-violet-500 to-purple-600"
            />
            <FeatureCard 
              icon={<BrainCircuitIcon className="w-8 h-8" />}
              title="Interactive Mind Maps"
              desc="Visualize the connections between complex topics with dynamic, clickable maps."
              color="from-indigo-500 to-blue-600"
            />
            <FeatureCard 
              icon={<AcademicCapIcon className="w-8 h-8" />}
              title="Chapter Conquest"
              desc="The ultimate study game. Move through a 2D world and solve chapter doubts to win."
              color="from-pink-500 to-rose-600"
            />
             <FeatureCard 
              icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
              title="Talk to AI Tutor"
              desc="Real voice conversations. Speak your doubts and hear the AI explain them back."
              color="from-amber-500 to-orange-600"
            />
             <FeatureCard 
              icon={<CalendarIcon className="w-8 h-8" />}
              title="Smart Study Plans"
              desc="Tell us your goal, and we'll generate a personalized, day-by-day roadmap."
              color="from-emerald-500 to-teal-600"
            />
             <FeatureCard 
              icon={<DocumentTextIcon className="w-8 h-8" />}
              title="Exam Paper Tool"
              desc="Generate board-style papers and get them graded with detailed feedback instantly."
              color="from-sky-500 to-cyan-600"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="orb w-80 h-80 bg-white/20 -top-20 -right-20"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black font-heading mb-8">Ready to transform your grades?</h2>
                    <p className="text-xl text-violet-100 mb-12 max-w-2xl mx-auto">
                        Join thousands of students who are leaving old study methods behind. Start your smart journey today.
                    </p>
                    <Link to="/signup">
                        <Button variant="secondary" size="lg" className="!bg-white !text-violet-700 !rounded-2xl px-12 py-6 text-xl font-bold hover:scale-105 transition-transform">
                            Create Free Account
                        </Button>
                    </Link>
                    <p className="mt-6 text-violet-200 text-sm">No credit card required. 100 Free Tokens on signup.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-medium">
      {desc}
    </p>
  </div>
);

const StatItem = ({ number, label }: { number: string, label: string }) => (
  <div className="space-y-2">
    <div className="text-4xl md:text-6xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
      {number}
    </div>
    <div className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
      {label}
    </div>
  </div>
);

export default HomePage;