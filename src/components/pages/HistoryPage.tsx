import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEvaluationStore, type EvaluationTrack } from '@/store/evaluationStore';
import { ArrowLeft, Trash2, ChevronDown, ChevronUp, Lightbulb, BookOpen, Microscope, Zap } from 'lucide-react';

const trackIcons: Record<EvaluationTrack, React.ComponentType<any>> = {
  startup: Lightbulb,
  project: BookOpen,
  research: Microscope,
  hackathon: Zap,
};

const trackLabels: Record<EvaluationTrack, string> = {
  startup: 'Startup Idea',
  project: 'Final-Year Project',
  research: 'PhD Research',
  hackathon: 'Hackathon Project',
};

export default function HistoryPage() {
  const navigate = useNavigate();
  const evaluationHistory = useEvaluationStore((state) => state.evaluationHistory);
  const clearHistory = useEvaluationStore((state) => state.clearHistory);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all evaluations?')) {
      clearHistory();
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-[120rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors mb-8 font-paragraph uppercase text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          <h1 className="text-6xl md:text-7xl font-heading text-foreground uppercase mb-4">
            Evaluation History
          </h1>
          <p className="text-lg font-paragraph text-foreground opacity-80">
            Review all your previous evaluations and insights.
          </p>
        </motion.div>

        {evaluationHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary border border-gridline p-16 text-center"
          >
            <p className="text-lg font-paragraph text-primary-foreground opacity-80 mb-8">
              No evaluations yet. Start by selecting a track and submitting your idea.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base font-paragraph uppercase tracking-wider"
            >
              Start New Evaluation
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Clear History Button */}
            <div className="flex justify-end mb-8">
              <Button
                onClick={handleClearHistory}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10 font-paragraph uppercase text-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>

            {/* Evaluations List */}
            <div className="space-y-6">
              <AnimatePresence>
                {evaluationHistory.map((evaluation, index) => {
                  const Icon = trackIcons[evaluation.track];
                  const isExpanded = expandedId === evaluation._id;

                  return (
                    <motion.div
                      key={evaluation._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-primary border border-gridline overflow-hidden"
                    >
                      {/* Header */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : evaluation._id)}
                        className="w-full p-8 flex items-start justify-between hover:bg-primary/50 transition-colors text-left"
                      >
                        <div className="flex-grow">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-orange-600 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-heading text-primary-foreground uppercase">
                                {evaluation.title}
                              </h3>
                              <p className="text-sm font-paragraph text-primary-foreground opacity-60">
                                {trackLabels[evaluation.track]} • {new Date(evaluation.submissionTimestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Overall Score */}
                        <div className="flex flex-col items-end gap-4 ml-8">
                          <div className="text-right">
                            <div className="text-4xl font-heading text-secondary">
                              {evaluation.scores.overall.toFixed(1)}
                            </div>
                            <p className="text-xs font-paragraph text-primary-foreground opacity-60 uppercase">
                              Overall Score
                            </p>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-primary-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary-foreground" />
                          )}
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gridline bg-background"
                          >
                            <div className="p-8 space-y-8">
                              {/* Description */}
                              <div>
                                <h4 className="text-base font-heading text-foreground uppercase mb-3">
                                  Description
                                </h4>
                                <p className="text-base font-paragraph text-foreground opacity-80">
                                  {evaluation.description}
                                </p>
                              </div>

                              {/* Scores Grid */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                  { label: 'Novelty', value: evaluation.scores.novelty },
                                  { label: 'Market Potential', value: evaluation.scores.marketPotential },
                                  { label: 'Technical Feasibility', value: evaluation.scores.technicalFeasibility },
                                  { label: 'Impact', value: evaluation.scores.impact },
                                ].map((score) => (
                                  <div key={score.label} className="bg-primary border border-gridline p-4 text-center">
                                    <div className="text-3xl font-heading text-secondary mb-2">
                                      {score.value.toFixed(1)}
                                    </div>
                                    <p className="text-xs font-paragraph text-foreground opacity-60 uppercase">
                                      {score.label}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Summary */}
                              <div>
                                <h4 className="text-base font-heading text-foreground uppercase mb-3">
                                  Summary
                                </h4>
                                <p className="text-base font-paragraph text-foreground opacity-80">
                                  {evaluation.summary}
                                </p>
                              </div>

                              {/* Strengths */}
                              <div>
                                <h4 className="text-base font-heading text-foreground uppercase mb-3">
                                  Strengths
                                </h4>
                                <ul className="space-y-2">
                                  {evaluation.strengths.map((strength, i) => (
                                    <li key={i} className="text-base font-paragraph text-foreground opacity-80 flex items-start">
                                      <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-3 mt-2 flex-shrink-0" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Weaknesses */}
                              <div>
                                <h4 className="text-base font-heading text-foreground uppercase mb-3">
                                  Areas for Improvement
                                </h4>
                                <ul className="space-y-2">
                                  {evaluation.weaknesses.map((weakness, i) => (
                                    <li key={i} className="text-base font-paragraph text-foreground opacity-80 flex items-start">
                                      <span className="inline-block w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0" />
                                      {weakness}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Recommendations */}
                              <div>
                                <h4 className="text-base font-heading text-foreground uppercase mb-3">
                                  Recommendations
                                </h4>
                                <ul className="space-y-2">
                                  {evaluation.recommendations.map((rec, i) => (
                                    <li key={i} className="text-base font-paragraph text-foreground opacity-80 flex items-start">
                                      <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-3 mt-2 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* New Evaluation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <Button
                onClick={() => navigate('/')}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base font-paragraph uppercase tracking-wider"
              >
                Start New Evaluation
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
