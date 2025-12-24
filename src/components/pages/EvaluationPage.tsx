import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEvaluationStore, type EvaluationTrack } from '@/store/evaluationStore';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import { evaluateIdea } from '@/services/evaluationBackend';

const trackConfigs = {
  startup: {
    title: 'Startup Idea Evaluation',
    fields: [
      { name: 'title', label: 'Business Name', placeholder: 'Enter your startup name' },
      { name: 'description', label: 'Business Concept', placeholder: 'Describe your business idea, target market, and value proposition' },
      { name: 'targetAudience', label: 'Target Audience', placeholder: 'Who are your primary customers?' },
      { name: 'budget', label: 'Estimated Budget (Optional)', placeholder: 'e.g., $50,000 - $100,000' },
    ],
  },
  project: {
    title: 'Final-Year Project Evaluation',
    fields: [
      { name: 'title', label: 'Project Title', placeholder: 'Enter your project name' },
      { name: 'description', label: 'Project Description', placeholder: 'Describe your project, objectives, and technical approach' },
      { name: 'targetAudience', label: 'Problem Statement', placeholder: 'What problem does your project solve?' },
      { name: 'timeline', label: 'Timeline (Optional)', placeholder: 'e.g., 6 months' },
    ],
  },
  research: {
    title: 'PhD Research Idea Evaluation',
    fields: [
      { name: 'title', label: 'Research Title', placeholder: 'Enter your research topic' },
      { name: 'description', label: 'Research Proposal', placeholder: 'Describe your research question, methodology, and expected outcomes' },
      { name: 'keywords', label: 'Research Keywords', placeholder: 'e.g., machine learning, climate change, quantum computing' },
      { name: 'targetAudience', label: 'Research Field', placeholder: 'e.g., Computer Science, Environmental Science' },
    ],
  },
  hackathon: {
    title: 'Hackathon Project Evaluation',
    fields: [
      { name: 'title', label: 'Project Name', placeholder: 'Enter your hackathon project name' },
      { name: 'description', label: 'Project Description', placeholder: 'Describe your hackathon project, features, and how it solves a problem' },
      { name: 'targetAudience', label: 'Target Users', placeholder: 'Who will benefit from your project?' },
      { name: 'keywords', label: 'Technologies Used (Optional)', placeholder: 'e.g., React, Python, Machine Learning, Web3' },
    ],
  },
};

export default function EvaluationPage() {
  const navigate = useNavigate();
  const selectedTrack = useEvaluationStore((state) => state.selectedTrack);
  const addEvaluation = useEvaluationStore((state) => state.addEvaluation);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: '',
    timeline: '',
    budget: '',
    keywords: '',
  });

  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    if (!selectedTrack) {
      navigate('/');
    }
  }, [selectedTrack, navigate]);

  if (!selectedTrack) {
    return null;
  }

  const config = trackConfigs[selectedTrack];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setIsEvaluating(true);

    try {
      // Call the backend evaluation function
      const evaluationResult = await evaluateIdea({
        title: formData.title,
        description: formData.description,
        track: selectedTrack,
        targetAudience: formData.targetAudience,
        timeline: formData.timeline,
        budget: formData.budget,
        keywords: formData.keywords,
      });

      // Create evaluation object with backend results
      const evaluation = {
        _id: crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        track: selectedTrack,
        scores: evaluationResult.scores,
        summary: evaluationResult.summary,
        strengths: evaluationResult.strengths,
        weaknesses: evaluationResult.weaknesses,
        recommendations: evaluationResult.recommendations,
        submissionTimestamp: new Date(),
      };

      addEvaluation(evaluation);
      setIsEvaluating(false);
      navigate('/history');
    } catch (error) {
      console.error('Evaluation failed:', error);
      setIsEvaluating(false);
      // Optionally show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-[100rem] mx-auto px-6">
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
            Back to Tracks
          </button>
          <h1 className="text-6xl md:text-7xl font-heading text-foreground uppercase mb-4">
            {config.title}
          </h1>
          <p className="text-lg font-paragraph text-foreground opacity-80">
            Provide detailed information about your idea for comprehensive evaluation.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-primary border border-gridline p-12"
        >
          {config.fields.map((field, index) => (
            <div key={field.name} className="mb-8">
              <label htmlFor={field.name} className="block text-base font-heading text-primary-foreground uppercase mb-4">
                {field.label}
              </label>
              {field.name === 'description' ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="bg-background border-gridline text-foreground font-paragraph min-h-[200px] text-base"
                  required={field.name === 'description' || field.name === 'title'}
                />
              ) : (
                <Input
                  id={field.name}
                  type="text"
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="bg-background border-gridline text-foreground font-paragraph h-12 text-base"
                  required={field.name === 'title'}
                />
              )}
            </div>
          ))}

          <Button
            type="submit"
            disabled={isEvaluating}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-base font-paragraph uppercase tracking-wider"
          >
            {isEvaluating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="mr-2"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                Evaluating...
              </>
            ) : (
              <>
                Get Evaluation
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}

{/* ... keep existing code (helper functions removed - now handled by backend) ... */}
