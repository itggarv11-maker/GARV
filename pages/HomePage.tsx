import React, { useRef, useEffect } from 'react';
import { Link } from 'https://esm.sh/react-router-dom';
import Button from '../components/common/Button';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { LightBulbIcon } from '../components/icons/LightBulbIcon';
import { DocumentTextIcon } from '../components/icons/DocumentTextIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { RocketLaunchIcon } from '../components/icons/RocketLaunchIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { UploadIcon } from '../components/icons/UploadIcon';
import { CursorArrowRaysIcon } from '../components/icons/CursorArrowRaysIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { ChatBubbleLeftRightIcon } from '../components/icons/ChatBubbleLeftRightIcon';


const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = heroElement.getBoundingClientRect();
        // Calculate cursor position from center of element (-0.5 to 0.5)
        const x = (e.clientX - left) / width - 0.5; 
        const y = (e.clientY - top) / height - 0.5;

        // Apply rotation based on cursor position
        const rotateY = x * 25; // Max rotation
        const rotateX = -y * 25; // Max rotation

        heroElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        heroElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = heroElement.parentElement;
    if(container){
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if(container){
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="relative text-center pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute h-64 w-64 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full -top-16 -left-16 filter blur-3xl opacity-50 animate-[move-blob-1_20s_infinite_alternate]"></div>
           <div className="absolute h-72 w-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full -bottom-24 -right-16 filter blur-3xl opacity-50 animate-[move-blob-2_25s_infinite_alternate-reverse]"></div>
        </div>
        <div ref={heroRef} className="relative z-10 hero-3d-effect">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900" style={{ textShadow: '0px 4px 15px rgba(0,0,0,0.1)' }}>
            Study Smart, Not Hard
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-700 font-medium max-w-3xl mx-auto">
            Welcome to StuBro AI, your personal AI tutor that makes learning fun, fast, and easy.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link to="/signup">
              <Button size="lg" variant="primary" className="text-lg shadow-xl !font-bold">
                  Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Everything You Need to Succeed</h2>
          <p className="mt-2 text-slate-600">All powered by cutting-edge AI, tailored for you.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-slate-800">
          <FeatureCard 
            icon={<DocumentTextIcon className="h-8 w-8" />}
            title="Instant Summaries"
            description="Turn long chapters from texts, PDFs, or videos into key points for quick revision."
            color="text-pink-600"
            linkTo="/app"
          />
          <FeatureCard 
            icon={<LightBulbIcon className="h-8 w-8" />}
            title="Advanced Quizzes"
            description="Generate mixed-type quizzes and get detailed feedback on your written answers."
            color="text-indigo-600"
            linkTo="/app"
          />
           <FeatureCard 
            icon={<BrainCircuitIcon className="h-8 w-8" />}
            title="Interactive Mind Maps"
            description="Visualize complex topics with AI-generated mind maps to connect ideas easily."
            color="text-teal-600"
            linkTo="/mind-map"
          />
           <FeatureCard 
            icon={<CalendarIcon className="h-8 w-8" />}
            title="Smart Study Planner"
            description="Get an AI-generated weekly timetable with breaks, revision, and mock test slots."
            color="text-amber-600"
            linkTo="/study-planner"
          />
          <FeatureCard 
            icon={<RocketLaunchIcon className="h-8 w-8" />}
            title="Career Guidance"
            description="Discover personalized career paths, exam roadmaps, and college suggestions."
            color="text-sky-600"
            linkTo="/career-guidance"
          />
          <FeatureCard 
            icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
            title="Talk to Teacher"
            description="Practice for exams with an AI that listens and replies in a live voice conversation."
            color="text-rose-600"
            linkTo="/gemini-live"
          />
           <FeatureCard 
            icon={<BookOpenIcon className="h-8 w-8" />}
            title="Question Paper Tool"
            description="Create custom exam papers from your notes and get them graded instantly by AI."
            color="text-purple-600"
            linkTo="/question-paper"
          />
           <FeatureCard 
            icon={<UsersIcon className="h-8 w-8" />}
            title="Group Quiz"
            description="Challenge your friends in a real-time quiz battle and see who comes out on top."
            color="text-green-600"
            linkTo="/group-quiz"
          />
        </div>
      </section>
      
       {/* How It Works Section */}
       <section>
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">How It Works</h2>
            <p className="mt-2 text-slate-600">Get answers in 3 simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <HowItWorksStep
                icon={<UploadIcon className="h-10 w-10 text-violet-600" />}
                step="Step 1"
                title="Provide Content"
                description="Paste text, upload a file (PDF, DOCX), or share a YouTube link. Our AI will instantly process it."
            />
            <HowItWorksStep
                icon={<CursorArrowRaysIcon className="h-10 w-10 text-pink-600" />}
                step="Step 2"
                title="Choose Your Tool"
                description="Select what you need: a quiz, a summary, flashcards, a mind map, or start a chat with the AI."
            />
             <HowItWorksStep
                icon={<SparklesIcon className="h-10 w-10 text-amber-600" />}
                step="Step 3"
                title="Get Instant Results"
                description="Receive your tailor-made study materials in seconds, ready for you to use and master any topic."
            />
        </div>
       </section>
       
      {/* Testimonials Section */}
      <section>
         <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Loved by Students Everywhere</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-700">
            <TestimonialCard
                quote="StuBro AI has been a game-changer for my exam prep. The quiz feature is amazing for testing my knowledge, and the summaries save me so much time."
                author="Anjali S., Class 10"
            />
            <TestimonialCard
                quote="I used to get stuck on difficult physics concepts. Now, I can just paste the text into StuBro and ask questions until I understand. It's like having a tutor 24/7."
                author="Rohan M., Class 12"
            />
             <TestimonialCard
                quote="The Mind Map generator is genius! It helped me connect all the dots for my history exam. Highly recommended for all students."
                author="Priya K., Class 9"
            />
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="relative bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-12 text-center text-white overflow-hidden">
         <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
         <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full"></div>
         <div className="relative z-10">
            <h2 className="text-4xl font-bold">Ready to Ace Your Exams?</h2>
            <p className="mt-4 text-lg max-w-xl mx-auto text-violet-100">Join thousands of students who are learning smarter with their personal AI tutor.</p>
            <Link to="/signup" className="mt-8 inline-block">
                <Button size="lg" className="!bg-white !text-violet-700 !font-bold hover:!bg-gray-100">
                    Sign Up Now - It's Free!
                </Button>
            </Link>
         </div>
      </section>

    </div>
  );
};

const FeatureCard = ({ icon, title, description, color, linkTo }: { icon: React.ReactNode, title: string, description: string, color: string, linkTo: string }) => (
    <Link to={linkTo} className="block group">
      <div className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl text-center border border-white/30 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
        <div className={`mx-auto bg-white/60 ${color} rounded-full h-16 w-16 flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-700">
          {description}
        </p>
      </div>
    </Link>
);

const TestimonialCard = ({ quote, author }: { quote: string, author: string }) => (
     <div className="bg-white/40 backdrop-blur-lg p-6 rounded-2xl border border-white/30 shadow-lg">
        <p className="italic">"{quote}"</p>
        <div className="mt-4 font-semibold text-slate-800">- {author}</div>
    </div>
);

const HowItWorksStep = ({ icon, step, title, description }: { icon: React.ReactNode, step: string, title: string, description: string }) => (
    <div className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/30 shadow-lg">
        <div className="mx-auto bg-white rounded-full h-20 w-20 flex items-center justify-center mb-4 border-2 border-slate-200">
            {icon}
        </div>
        <p className="font-bold text-violet-600">{step}</p>
        <h3 className="text-xl font-semibold text-slate-800 mt-1">{title}</h3>
        <p className="text-slate-600 mt-2 text-sm">{description}</p>
    </div>
);


export default HomePage;