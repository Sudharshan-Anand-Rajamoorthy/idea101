import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HackathonCard from '@/components/HackathonCard';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Wrench, Users, ArrowRight, Lightbulb, BookOpen, Microscope, Zap } from 'lucide-react';
import { useHackathonStore, type Hackathon } from '@/store/hackathonStore';
import { hackathonService } from '@/services/hackathonService';

export default function HomePage() {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'all' | 'virtual' | 'inperson'>('all');

  useEffect(() => {
    const loadHackathons = async () => {
      setIsLoading(true);
      try {
        const data = await hackathonService.fetchHackathons();
        const upcoming = hackathonService.getUpcomingHackathons(data);
        setHackathons(upcoming);
      } catch (error) {
        console.error('Failed to load hackathons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHackathons();
  }, []);

  const filteredHackathons = hackathons.filter((h) => {
    if (selectedDifficulty && h.difficulty !== selectedDifficulty) return false;
    if (selectedLocation === 'virtual' && !h.isVirtual) return false;
    if (selectedLocation === 'inperson' && h.isVirtual) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background gradient element */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-lavendergradientstart to-lavendergradientend opacity-40 blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-[120rem] w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-7xl md:text-8xl font-heading text-foreground uppercase mb-8 leading-none">
                IdeaScope
              </h1>

              <p className="text-lg font-paragraph text-foreground mb-4 max-w-xl">
                Transform raw concepts into validated opportunities through advanced AI analysis. Whether you're an entrepreneur, student, or researcher, get comprehensive evaluation tailored to your idea type.
              </p>

              <div className="flex items-center gap-8 text-sm font-paragraph text-foreground opacity-80 mb-12">
                <span>Real-time Evaluation</span>
                <span>Multi-factor Analysis</span>
                <span>Actionable Insights</span>
              </div>

              <Button
                onClick={() => navigate('/tracks')}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base font-paragraph uppercase tracking-wider"
              >
                Start Evaluation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Right side - Decorative gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-lavendergradientstart/30 to-lavendergradientend/40 rounded-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-lavendergradientstart to-lavendergradientend opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Evaluation Tracks Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-heading text-primary-foreground uppercase mb-6">
              Choose Your Track
            </h2>
            <p className="text-lg font-paragraph text-primary-foreground opacity-80 max-w-3xl mx-auto">
              Select the evaluation track that best matches your idea type. Each track is tailored with specific metrics and scoring criteria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Startup Ideas',
                subtitle: 'For Entrepreneurs',
                description: 'Evaluate your business concept with focus on market potential, scalability, and revenue opportunities.',
                metrics: ['Market Potential', 'Business Model', 'Scalability', 'Competitive Advantage'],
              },
              {
                icon: BookOpen,
                title: 'Final-Year Projects',
                subtitle: 'For College Students',
                description: 'Assess your academic project with emphasis on innovation, technical implementation, and academic rigor.',
                metrics: ['Innovation', 'Technical Feasibility', 'Academic Value', 'Deliverables'],
              },
              {
                icon: Microscope,
                title: 'PhD Research Ideas',
                subtitle: 'For Researchers',
                description: 'Evaluate your research proposal considering novelty, methodology, impact, and contribution to the field.',
                metrics: ['Research Novelty', 'Methodology', 'Field Impact', 'Publication Potential'],
              },
            ].map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-8 border border-gridline hover:border-secondary transition-colors"
              >
                <track.icon className="h-12 w-12 text-secondary mb-6" />
                <h3 className="text-2xl font-heading text-foreground uppercase mb-2">
                  {track.title}
                </h3>
                <p className="text-sm font-paragraph text-foreground opacity-70 mb-4">
                  {track.subtitle}
                </p>
                <p className="text-base font-paragraph text-foreground opacity-80 mb-6">
                  {track.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {track.metrics.map((metric, i) => (
                    <li key={i} className="text-sm font-paragraph text-foreground opacity-70 flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-full mr-3 mt-1.5 flex-shrink-0" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-heading text-foreground uppercase mb-6">
              How It Works
            </h2>
            <p className="text-lg font-paragraph text-foreground opacity-80 max-w-3xl mx-auto">
              Our AI-driven platform analyzes your startup idea across multiple dimensions to provide comprehensive insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Novelty Analysis',
                description: 'Evaluates uniqueness and innovation potential against existing solutions in the market.',
              },
              {
                icon: TrendingUp,
                title: 'Market Potential',
                description: 'Assesses market size, growth trajectory, and revenue opportunities for your concept.',
              },
              {
                icon: Wrench,
                title: 'Technical Feasibility',
                description: 'Analyzes implementation complexity and required technical resources for execution.',
              },
              {
                icon: Users,
                title: 'Impact Assessment',
                description: 'Measures alignment with target audience needs and problem-solution fit.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary p-8 border border-gridline"
              >
                <item.icon className="h-12 w-12 text-secondary mb-6" />
                <h3 className="text-xl font-heading text-primary-foreground uppercase mb-4">
                  {item.title}
                </h3>
                <p className="text-sm font-paragraph text-primary-foreground opacity-80">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathons Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-heading text-foreground uppercase mb-6">
              Upcoming Hackathons
            </h2>
            <p className="text-lg font-paragraph text-foreground opacity-80 max-w-3xl mx-auto">
              Discover and participate in exciting hackathons happening around the world. Build, innovate, and compete for amazing prizes.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 flex flex-wrap gap-4 justify-center"
          >
            {/* Difficulty Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedDifficulty === null
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setSelectedDifficulty('beginner')}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedDifficulty === 'beginner'
                    ? 'bg-green-500/20 text-green-700 border-green-300'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setSelectedDifficulty('intermediate')}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedDifficulty === 'intermediate'
                    ? 'bg-yellow-500/20 text-yellow-700 border-yellow-300'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setSelectedDifficulty('advanced')}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedDifficulty === 'advanced'
                    ? 'bg-red-500/20 text-red-700 border-red-300'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                Advanced
              </button>
            </div>

            {/* Location Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedLocation === 'all'
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                All Locations
              </button>
              <button
                onClick={() => setSelectedLocation('virtual')}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedLocation === 'virtual'
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                Virtual
              </button>
              <button
                onClick={() => setSelectedLocation('inperson')}
                className={`px-4 py-2 text-sm font-heading uppercase tracking-wider border transition-colors ${
                  selectedLocation === 'inperson'
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background border-gridline text-foreground hover:border-secondary'
                }`}
              >
                In-Person
              </button>
            </div>
          </motion.div>

          {/* Hackathons Grid */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <Zap className="h-8 w-8 text-secondary" />
              </motion.div>
              <p className="mt-4 text-lg font-paragraph text-foreground opacity-80">
                Loading hackathons...
              </p>
            </motion.div>
          ) : filteredHackathons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary border border-gridline p-12 text-center"
            >
              <p className="text-lg font-paragraph text-primary-foreground opacity-80">
                No hackathons found matching your filters. Try adjusting your selection.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHackathons.map((hackathon, index) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} index={index} />
              ))}
            </div>
          )}

          {/* View All Hackathons Link */}
          {filteredHackathons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <p className="text-base font-paragraph text-foreground opacity-80 mb-6">
                Want to see more hackathons? Check out these resources:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={() => window.open('https://devpost.com/hackathons', '_blank')}
                  variant="outline"
                  className="border-gridline text-foreground hover:bg-background"
                >
                  DevPost Hackathons
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => window.open('https://mlh.io/seasons/2025/events', '_blank')}
                  variant="outline"
                  className="border-gridline text-foreground hover:bg-background"
                >
                  MLH Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => window.open('https://hackathon.com', '_blank')}
                  variant="outline"
                  className="border-gridline text-foreground hover:bg-background"
                >
                  Hackathon.com
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-heading text-primary-foreground uppercase mb-6">
              Ready to Evaluate Your Idea?
            </h2>
            <p className="text-lg font-paragraph text-primary-foreground opacity-80 max-w-3xl mx-auto mb-8">
              Get started with IdeaScope today and receive comprehensive feedback on your concept.
            </p>
            <Button
              onClick={() => navigate('/tracks')}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base font-paragraph uppercase tracking-wider"
            >
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
