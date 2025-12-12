import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEvaluationStore, type EvaluationTrack } from '@/store/evaluationStore';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate scores based on description quality
    const descLength = formData.description.length;
    const hasDetails = formData.targetAudience && formData.targetAudience.trim().length > 0;

    const baseScore = Math.min(10, 5 + (descLength / 100) * 2);
    const detailBonus = hasDetails ? 1.5 : 0;

    const novelty = Math.min(10, baseScore + detailBonus + (Math.random() * 2 - 1));
    const marketPotential = Math.min(10, baseScore + (Math.random() * 2 - 1));
    const technicalFeasibility = Math.min(10, baseScore - 0.5 + (Math.random() * 2 - 1));
    const impact = Math.min(10, baseScore + detailBonus + (Math.random() * 2 - 1));
    const overall = (novelty + marketPotential + technicalFeasibility + impact) / 4;

    // Generate insights
    const strengths = generateStrengths(selectedTrack, formData);
    const weaknesses = generateWeaknesses(selectedTrack, formData);
    const recommendations = generateRecommendations(selectedTrack, formData);

    const summary = generateSummary(selectedTrack, overall);

    const evaluation = {
      _id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      track: selectedTrack,
      scores: {
        novelty: Math.round(novelty * 10) / 10,
        marketPotential: Math.round(marketPotential * 10) / 10,
        technicalFeasibility: Math.round(technicalFeasibility * 10) / 10,
        impact: Math.round(impact * 10) / 10,
        overall: Math.round(overall * 10) / 10,
      },
      summary,
      strengths,
      weaknesses,
      recommendations,
      submissionTimestamp: new Date(),
    };

    addEvaluation(evaluation);
    setIsEvaluating(false);
    navigate('/history');
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

function generateStrengths(track: EvaluationTrack, formData: any): string[] {
  const strengths: string[] = [];

  if (formData.description.length > 200) {
    strengths.push('Well-detailed concept description');
  }

  if (formData.targetAudience && formData.targetAudience.trim().length > 0) {
    strengths.push('Clear target audience identification');
  }

  if (track === 'startup' && formData.budget) {
    strengths.push('Realistic budget planning');
  }

  if (track === 'project' && formData.timeline) {
    strengths.push('Defined project timeline');
  }

  if (track === 'research' && formData.keywords) {
    strengths.push('Well-defined research scope');
  }

  if (track === 'hackathon' && formData.keywords) {
    strengths.push('Clear technology stack identified');
  }

  if (strengths.length === 0) {
    strengths.push('Clear problem identification');
  }

  return strengths;
}

function generateWeaknesses(track: EvaluationTrack, formData: any): string[] {
  const weaknesses: string[] = [];

  if (formData.description.length < 200) {
    weaknesses.push('Could provide more detailed description');
  }

  if (!formData.targetAudience || formData.targetAudience.trim().length === 0) {
    weaknesses.push('Target audience not clearly defined');
  }

  if (track === 'startup' && !formData.budget) {
    weaknesses.push('Budget estimation would strengthen proposal');
  }

  if (track === 'project' && !formData.timeline) {
    weaknesses.push('Project timeline not specified');
  }

  if (track === 'research' && !formData.keywords) {
    weaknesses.push('Research keywords would clarify scope');
  }

  if (track === 'hackathon' && !formData.keywords) {
    weaknesses.push('Technology stack not specified');
  }

  return weaknesses;
}

function generateRecommendations(track: EvaluationTrack, formData: any): string[] {
  const recommendations: string[] = [];

  if (track === 'startup') {
    recommendations.push('Conduct competitive analysis to identify market gaps');
    recommendations.push('Develop a detailed go-to-market strategy');
    recommendations.push('Create financial projections for 3-5 years');
  } else if (track === 'project') {
    recommendations.push('Establish clear milestones and deliverables');
    recommendations.push('Document technical architecture and design decisions');
    recommendations.push('Plan comprehensive testing and validation strategy');
  } else if (track === 'research') {
    recommendations.push('Review related literature and existing research');
    recommendations.push('Define clear research methodology and approach');
    recommendations.push('Identify potential publication venues and impact');
  } else if (track === 'hackathon') {
    recommendations.push('Create a detailed project roadmap with clear milestones');
    recommendations.push('Plan MVP features for the hackathon timeframe');
    recommendations.push('Prepare a compelling demo and presentation strategy');
  }

  return recommendations;
}

function generateSummary(track: EvaluationTrack, score: number): string {
  if (score >= 8) {
    return `Excellent ${track} idea with strong potential. The concept demonstrates clear innovation and viable execution path. Recommended to proceed with detailed planning and validation.`;
  } else if (score >= 6.5) {
    return `Good ${track} idea with solid fundamentals. The concept has merit and shows promise. Consider refining key aspects and conducting deeper analysis before full implementation.`;
  } else if (score >= 5) {
    return `Promising ${track} idea requiring further development. The core concept is interesting but needs strengthening in several areas. Focus on addressing identified weaknesses.`;
  } else {
    return `${track} idea with potential but significant challenges. Recommend substantial refinement and deeper exploration of the concept before proceeding.`;
  }
}
