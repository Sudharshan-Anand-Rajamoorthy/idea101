// HPI 1.5-V
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { StartupIdeaEvaluations } from '@/entities';
import { 
  Sparkles, 
  TrendingUp, 
  Wrench, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Globe, 
  Zap, 
  Target, 
  BarChart3,
  Code2,
  Lightbulb
} from 'lucide-react';
import { Image } from '@/components/ui/image';

// --- Utility Components for "Living Experience" ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}>{children}</div>;
};

const Marquee: React.FC<{ text: string; reverse?: boolean }> = ({ text, reverse = false }) => {
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap py-4 bg-primary border-y border-white/10">
      <motion.div
        className="flex gap-8 items-center"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-heading text-transparent stroke-text uppercase opacity-50">
            {text} <span className="text-secondary mx-4">•</span>
          </span>
        ))}
      </motion.div>
      <style>{`.stroke-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3); }`}</style>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- Canonical Data Sources (Preserved) ---
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<StartupIdeaEvaluations | null>(null);
  const [showResults, setShowResults] = useState(false);

  // --- Logic Preservation ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ideaTitle.trim() || !ideaDescription.trim()) {
      return;
    }

    setIsEvaluating(true);
    setShowResults(false);

    // Simulate AI evaluation with realistic scoring
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate scores based on idea characteristics
    const wordCount = ideaDescription.split(' ').length;
    const hasKeywords = ideaDescription.toLowerCase().includes('ai') || 
                       ideaDescription.toLowerCase().includes('platform') ||
                       ideaDescription.toLowerCase().includes('app');
    
    const noveltyScore = Math.min(10, Math.floor(Math.random() * 4) + (hasKeywords ? 7 : 6));
    const marketPotentialScore = Math.min(10, Math.floor(Math.random() * 3) + (wordCount > 50 ? 7 : 6));
    const technicalDifficultyScore = Math.min(10, Math.floor(Math.random() * 4) + 5);
    const userFitScore = Math.min(10, Math.floor(Math.random() * 3) + 6);
    
    const avgScore = (noveltyScore + marketPotentialScore + technicalDifficultyScore + userFitScore) / 4;
    
    let summary = '';
    if (avgScore >= 8) {
      summary = `Exceptional concept with strong market alignment. The idea demonstrates high innovation potential and addresses a clear market need. Technical implementation appears feasible with modern frameworks. Recommended for immediate prototyping and user validation.`;
    } else if (avgScore >= 6.5) {
      summary = `Promising idea with solid fundamentals. Shows good market potential and reasonable technical complexity. Consider refining the unique value proposition and conducting deeper competitive analysis before proceeding to development phase.`;
    } else {
      summary = `Interesting concept requiring further refinement. The core idea has merit but needs stronger differentiation. Recommend additional market research and pivoting certain aspects to improve viability and reduce technical risks.`;
    }

    const newEvaluation: StartupIdeaEvaluations = {
      _id: crypto.randomUUID(),
      ideaTitle,
      ideaDescription,
      noveltyScore,
      marketPotentialScore,
      technicalDifficultyScore,
      userFitScore,
      evaluationSummary: summary,
      submissionTimestamp: new Date(),
    };

    await BaseCrudService.create('startupideasevaluations', newEvaluation);
    
    setEvaluation(newEvaluation);
    setIsEvaluating(false);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-secondary';
    if (score >= 6) return 'text-white';
    return 'text-white/60';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Moderate';
  };

  // --- Scroll Effects ---
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const circleScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

  return (
    <div className="min-h-screen bg-background font-paragraph selection:bg-secondary selection:text-black overflow-x-clip">
      <Header />

      {/* --- HERO SECTION (Replicating Structure of Inspiration Image) --- */}
      <section className="relative w-full min-h-screen flex flex-col">
        {/* Top Half: Black, Heavy Typography */}
        <div className="relative flex-grow bg-primary pt-32 pb-12 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 border-b border-white/10 pointer-events-none">
             <div className="absolute left-12 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
             <div className="absolute right-12 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
             <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
          </div>

          <div className="relative z-10 max-w-[120rem] mx-auto w-full h-full flex flex-col justify-center">
            <div className="flex justify-between items-start mb-12 text-xs md:text-sm font-heading text-secondary tracking-widest uppercase">
              <span>AI-Powered Analysis</span>
              <span className="hidden md:inline-block">v2.0.4 // Stable</span>
              <span>San Francisco, CA</span>
            </div>

            <motion.div style={{ y: heroY }} className="relative">
              <h1 className="text-[12vw] leading-[0.85] font-heading font-black text-white tracking-tighter uppercase mix-blend-difference">
                Idea<span className="text-secondary">.</span><br />
                Scope<span className="text-white/20">/Eval</span>
              </h1>
            </motion.div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
              <p className="text-white/60 max-w-md text-sm md:text-base font-paragraph leading-relaxed">
                UNLEASH YOUR CREATIVITY IN THE AGE OF HYPER-EFFICIENCY. 
                VALIDATE YOUR STARTUP CONCEPTS WITH MILITARY-GRADE AI PRECISION.
              </p>
              <Button 
                onClick={() => document.getElementById('evaluate')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary hover:bg-secondary/90 text-black rounded-none px-8 py-6 text-lg font-heading uppercase tracking-wider transition-all hover:translate-x-1"
              >
                Initialize System
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Half: Gradient & Shape */}
        <div className="relative h-[40vh] w-full bg-gradient-to-r from-secondary via-lavendergradientstart to-lavendergradientend overflow-hidden">
          <motion.div 
            style={{ scale: circleScale }}
            className="absolute -bottom-1/2 left-12 w-[60vh] h-[60vh] bg-white rounded-full blur-3xl opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <Marquee text="VALIDATE • INNOVATE • DISRUPT • EXECUTE" />
          </div>
        </div>
      </section>

      {/* --- MISSION GRID SECTION --- */}
      <section className="py-32 bg-background relative border-b border-gridline">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 sticky top-32 self-start">
              <AnimatedElement>
                <span className="text-secondary font-heading text-sm uppercase tracking-widest mb-4 block">01. The Mission</span>
                <h2 className="text-5xl md:text-6xl font-heading text-primary uppercase leading-none mb-8">
                  Decode<br/>The<br/>Future
                </h2>
                <p className="text-primary/60 text-lg leading-relaxed">
                  Most startups fail because they build what nobody wants. IdeaScope uses advanced NLP and market data to predict viability before you write a single line of code.
                </p>
              </AnimatedElement>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-gridline border border-gridline">
              {[
                { icon: Cpu, title: "Algorithmic Scoring", desc: "Proprietary models trained on 10,000+ successful exits." },
                { icon: Globe, title: "Market Sentiment", desc: "Real-time analysis of global trends and user needs." },
                { icon: Target, title: "User Fit Analysis", desc: "Deep psychological profiling of your target demographic." },
                { icon: Zap, title: "Instant Feedback", desc: "Get a comprehensive report in seconds, not weeks." }
              ].map((item, idx) => (
                <div key={idx} className="bg-background p-12 flex flex-col gap-6 group hover:bg-primary/5 transition-colors duration-500">
                  <item.icon className="w-12 h-12 text-primary stroke-1 group-hover:text-secondary transition-colors" />
                  <h3 className="text-2xl font-heading uppercase">{item.title}</h3>
                  <p className="text-primary/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VISUAL BREAK --- */}
      <section className="w-full h-[80vh] relative overflow-hidden">
        <Image 
          src="https://static.wixstatic.com/media/5fc1d2_c65fe7877a1441268f57698ca1f94b62~mv2.png?originWidth=1280&originHeight=704"
          alt="Abstract technology visualization"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-[15vw] font-heading text-white/10 uppercase font-black select-none pointer-events-none">
            Analysis
          </h2>
        </div>
      </section>

      {/* --- EVALUATION INTERFACE (The Core) --- */}
      <section id="evaluate" className="bg-primary text-white py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Context & Instructions */}
            <div className="lg:col-span-5 space-y-12">
              <AnimatedElement>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-xs font-heading uppercase tracking-widest mb-8">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  System Online
                </div>
                <h2 className="text-5xl md:text-7xl font-heading uppercase leading-none mb-8">
                  Input<br/>Parameters
                </h2>
                <p className="text-white/60 text-lg max-w-md">
                  Provide a detailed schematic of your concept. The more granular the data, the more precise the prediction.
                </p>
              </AnimatedElement>

              <div className="hidden lg:block p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg">
                <h4 className="font-heading text-secondary uppercase mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  System Log
                </h4>
                <div className="font-mono text-xs text-white/40 space-y-2">
                  <p>{`> Initializing neural networks... OK`}</p>
                  <p>{`> Loading market datasets... OK`}</p>
                  <p>{`> Calibrating sentiment analyzers... OK`}</p>
                  <p className="animate-pulse">{`> Awaiting user input_`}</p>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7">
              <AnimatedElement delay={200}>
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-xl backdrop-blur-md shadow-2xl">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label htmlFor="ideaTitle" className="block text-sm font-heading text-secondary uppercase tracking-wider">
                        Project Codename
                      </label>
                      <Input
                        id="ideaTitle"
                        type="text"
                        value={ideaTitle}
                        onChange={(e) => setIdeaTitle(e.target.value)}
                        placeholder="e.g. NEURAL_COMMERCE_V1"
                        className="bg-black/50 border-white/20 text-white font-paragraph h-16 text-lg focus:border-secondary focus:ring-secondary/50 rounded-none"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="ideaDescription" className="block text-sm font-heading text-secondary uppercase tracking-wider">
                        Technical Specification
                      </label>
                      <Textarea
                        id="ideaDescription"
                        value={ideaDescription}
                        onChange={(e) => setIdeaDescription(e.target.value)}
                        placeholder="Describe the problem, solution architecture, and target user base..."
                        className="bg-black/50 border-white/20 text-white font-paragraph min-h-[300px] text-lg focus:border-secondary focus:ring-secondary/50 rounded-none resize-none p-6"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isEvaluating}
                      className="w-full bg-secondary hover:bg-secondary/80 text-black h-20 text-xl font-heading uppercase tracking-widest rounded-none transition-all group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        {isEvaluating ? 'Processing Data Stream...' : 'Execute Analysis'}
                        {!isEvaluating && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                      </span>
                      {isEvaluating && (
                        <motion.div 
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </Button>
                  </div>
                </form>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- RESULTS SECTION (Conditional) --- */}
      <AnimatePresence>
        {showResults && evaluation && (
          <motion.section 
            id="results"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-background py-32 border-t border-gridline"
          >
            <div className="max-w-[120rem] mx-auto px-6 md:px-12">
              <div className="flex flex-col items-center text-center mb-24">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-black" />
                </motion.div>
                <h2 className="text-6xl md:text-8xl font-heading uppercase text-primary mb-6">
                  Analysis<br/>Complete
                </h2>
                <div className="h-1 w-32 bg-secondary" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                {/* Main Score Card */}
                <div className="lg:col-span-2 bg-primary text-white p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Code2 className="w-64 h-64" />
                  </div>
                  <h3 className="text-3xl font-heading text-secondary mb-8 uppercase">{evaluation.ideaTitle}</h3>
                  <p className="text-xl text-white/80 leading-relaxed font-paragraph mb-12 border-l-4 border-secondary pl-6">
                    {evaluation.evaluationSummary}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: 'Novelty', score: evaluation.noveltyScore },
                      { label: 'Market', score: evaluation.marketPotentialScore },
                      { label: 'Tech', score: evaluation.technicalDifficultyScore },
                      { label: 'User Fit', score: evaluation.userFitScore }
                    ].map((stat, i) => (
                      <div key={i} className="border-t border-white/20 pt-4">
                        <div className="text-4xl font-heading mb-2">{stat.score?.toFixed(1)}</div>
                        <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Card */}
                <div className="bg-gridline/30 p-12 flex flex-col justify-center items-center text-center border border-gridline">
                  <Lightbulb className="w-16 h-16 text-primary mb-6" />
                  <h4 className="text-2xl font-heading uppercase mb-4">Next Steps</h4>
                  <p className="text-primary/60 mb-8">
                    Your evaluation is saved to the database. Refine your parameters to see how the score changes.
                  </p>
                  <Button
                    onClick={() => {
                      setShowResults(false);
                      setEvaluation(null);
                      setIdeaTitle('');
                      setIdeaDescription('');
                      document.getElementById('evaluate')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white w-full h-14 uppercase tracking-widest"
                  >
                    New Evaluation
                  </Button>
                </div>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    label: 'Novelty Score', 
                    score: evaluation.noveltyScore, 
                    icon: Sparkles,
                    desc: "Uniqueness factor in current market"
                  },
                  { 
                    label: 'Market Potential', 
                    score: evaluation.marketPotentialScore, 
                    icon: TrendingUp,
                    desc: "Projected growth and TAM size"
                  },
                  { 
                    label: 'Tech Difficulty', 
                    score: evaluation.technicalDifficultyScore, 
                    icon: Wrench,
                    desc: "Implementation complexity estimation"
                  },
                  { 
                    label: 'User Fit', 
                    score: evaluation.userFitScore, 
                    icon: Users,
                    desc: "Problem-solution alignment score"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-primary p-8 text-white group hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <item.icon className="h-8 w-8 text-secondary" />
                      <span className={`text-2xl font-heading ${getScoreColor(item.score || 0)}`}>
                        {item.score?.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading uppercase mb-2">{item.label}</h3>
                    <p className="text-sm text-white/50">{item.desc}</p>
                    <div className="w-full bg-white/10 h-1 mt-6 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.score || 0) * 10}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-secondary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- FOOTER CTA --- */}
      <section className="py-24 bg-background border-t border-gridline">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-[8vw] font-heading uppercase text-primary/10 leading-none select-none">
            Start Now
          </h2>
          <div className="-mt-12 md:-mt-24 relative z-10">
            <p className="text-xl md:text-2xl font-paragraph text-primary mb-8">
              Don't let your next big idea stay just an idea.
            </p>
            <Button 
              onClick={() => document.getElementById('evaluate')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white hover:bg-primary/90 px-12 py-8 text-xl font-heading uppercase rounded-full"
            >
              Launch Evaluator
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Global Styles for Custom Effects */}
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        /* Hide scrollbar for clean look */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF7F50;
        }
      `}</style>
    </div>
  );
}