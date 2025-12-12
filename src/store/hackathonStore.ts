import { create } from 'zustand';

export interface Hackathon {
  _id: string;
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  isVirtual: boolean;
  registrationUrl?: string;
  websiteUrl?: string;
  prizePool?: string;
  participantLimit?: number;
  registeredCount?: number;
  tags: string[];
  image?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface HackathonStore {
  hackathons: Hackathon[];
  setHackathons: (hackathons: Hackathon[]) => void;
  addHackathon: (hackathon: Hackathon) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useHackathonStore = create<HackathonStore>((set) => ({
  hackathons: [],
  setHackathons: (hackathons) => set({ hackathons }),
  addHackathon: (hackathon) =>
    set((state) => ({
      hackathons: [hackathon, ...state.hackathons],
    })),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}));
