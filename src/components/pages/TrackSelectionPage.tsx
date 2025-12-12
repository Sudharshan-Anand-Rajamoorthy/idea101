import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEvaluationStore, type EvaluationTrack } from '@/store/evaluationStore';
import { Lightbulb, BookOpen, Microscope, ArrowRight } from 'lucide-react';

const tracks = [
  {
    id: 'startup' as EvaluationTrack,
    title: 'Startup Ideas',
    subtitle: 'For Entrepreneurs',
    description: 'Evaluate your business concept with focus on market potential, scalability, and revenue opportunities.',
    icon: Lightbulb,
    color: 'from-orange-400 to-red-500',
    metrics: ['Market Potential', 'Business Model', 'Scalability', 'Competitive Advantage'],
  },
  {
    id: 'project' as EvaluationTrack,
    title: 'Final-Year Projects',
    subtitle: 'For College Students',
    description: 'Assess your academic project with emphasis on innovation, technical implementation, and academic rigor.',
    icon: BookOpen,
    color: 'from-blue-400 to-cyan-500',
    metrics: ['Innovation', 'Technical Feasibility', 'Academic Value', 'Deliverables'],
  },
  {
    id: 'research' as EvaluationTrack,
    title: 'PhD Research Ideas',
    subtitle: 'For Researchers',
    description: 'Evaluate your research proposal considering novelty, methodology, impact, and contribution to the field.',
    icon: Microscope,
    color: 'from-purple-400 to-pink-500',
    metrics: ['Research Novelty', 'Methodology', 'Field Impact', 'Publication Potential'],
  },
];

export default function TrackSelectionPage() {
  const navigate = useNavigate();
  const setSelectedTrack = useEvaluationStore((state) => state.setSelectedTrack);

  const handleSelectTrack = (track: EvaluationTrack) => {
    setSelectedTrack(track);
    navigate('/evaluate');
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-[120rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-7xl md:text-8xl font-heading text-foreground uppercase mb-6 leading-none">
            Choose Your Track
          </h1>
          <p className="text-xl font-paragraph text-foreground opacity-80 max-w-3xl mx-auto">
            Select the evaluation track that best matches your idea type. Each track is tailored with specific metrics and scoring criteria.
          </p>
        </motion.div>

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full bg-primary border border-gridline p-8 flex flex-col hover:border-secondary transition-colors duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <track.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-heading text-primary-foreground uppercase mb-2">
                  {track.title}
                </h2>
                <p className="text-sm font-paragraph text-primary-foreground opacity-70 mb-4">
                  {track.subtitle}
                </p>
                <p className="text-base font-paragraph text-primary-foreground opacity-80 mb-8 flex-grow">
                  {track.description}
                </p>

                {/* Metrics */}
                <div className="mb-8">
                  <p className="text-xs font-heading text-primary-foreground uppercase opacity-60 mb-3">
                    Evaluation Metrics
                  </p>
                  <ul className="space-y-2">
                    {track.metrics.map((metric, i) => (
                      <li key={i} className="text-sm font-paragraph text-primary-foreground opacity-70 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-full mr-3 mt-1.5 flex-shrink-0" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <Button
                  onClick={() => handleSelectTrack(track.id)}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-paragraph uppercase tracking-wider group-hover:gap-2 transition-all"
                >
                  Select Track
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-primary border border-gridline p-12 text-center"
        >
          <h3 className="text-2xl font-heading text-primary-foreground uppercase mb-4">
            How It Works
          </h3>
          <p className="text-base font-paragraph text-primary-foreground opacity-80 max-w-3xl mx-auto">
            Select your track, provide details about your idea, and our AI-powered evaluation system will analyze it across multiple dimensions. You'll receive a comprehensive report with scores, insights, and actionable recommendations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
