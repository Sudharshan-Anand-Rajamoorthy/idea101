import { create } from 'zustand';

export type EvaluationTrack = 'startup' | 'project' | 'research' | 'hackathon';

export interface EvaluationFormData {
  title: string;
  description: string;
  track: EvaluationTrack;
  targetAudience?: string;
  timeline?: string;
  budget?: string;
  keywords?: string;
}

export interface EvaluationResult {
  _id: string;
  title: string;
  description: string;
  track: EvaluationTrack;
  scores: {
    novelty: number;
    marketPotential: number;
    technicalFeasibility: number;
    impact: number;
    overall: number;
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  submissionTimestamp: Date;
}

interface EvaluationStore {
  selectedTrack: EvaluationTrack | null;
  setSelectedTrack: (track: EvaluationTrack) => void;
  evaluationHistory: EvaluationResult[];
  addEvaluation: (evaluation: EvaluationResult) => void;
  clearHistory: () => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  selectedTrack: null,
  setSelectedTrack: (track) => set({ selectedTrack: track }),
  evaluationHistory: [],
  addEvaluation: (evaluation) =>
    set((state) => ({
      evaluationHistory: [evaluation, ...state.evaluationHistory],
    })),
  clearHistory: () => set({ evaluationHistory: [] }),
}));
