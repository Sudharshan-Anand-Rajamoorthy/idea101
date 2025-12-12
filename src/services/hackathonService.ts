import { Hackathon } from '@/store/hackathonStore';

// Mock hackathon data - In production, this would come from real APIs
const mockHackathons: Hackathon[] = [
  {
    _id: '1',
    name: 'TechCrunch Disrupt 2025',
    description: 'The world\'s leading startup conference and competition. Showcase your innovation to investors, press, and industry leaders.',
    startDate: new Date(2025, 8, 15),
    endDate: new Date(2025, 8, 17),
    location: 'San Francisco, CA',
    isVirtual: false,
    registrationUrl: 'https://techcrunch.com/disrupt',
    websiteUrl: 'https://techcrunch.com/disrupt',
    prizePool: '$500,000+',
    participantLimit: 500,
    registeredCount: 380,
    tags: ['startup', 'pitch', 'funding', 'innovation'],
    difficulty: 'advanced',
    image: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-techcrunch',
  },
  {
    _id: '2',
    name: 'HackMIT 2025',
    description: 'MIT\'s premier hackathon bringing together students from around the world to build amazing projects in 48 hours.',
    startDate: new Date(2025, 9, 3),
    endDate: new Date(2025, 9, 5),
    location: 'Cambridge, MA',
    isVirtual: false,
    registrationUrl: 'https://hackmit.org',
    websiteUrl: 'https://hackmit.org',
    prizePool: '$100,000+',
    participantLimit: 1000,
    registeredCount: 850,
    tags: ['students', 'coding', 'hardware', 'ai'],
    difficulty: 'intermediate',
    image: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-mit',
  },
  {
    _id: '3',
    name: 'Global AI Hackathon 2025',
    description: 'Build AI-powered solutions to solve real-world problems. Connect with AI researchers, engineers, and innovators globally.',
    startDate: new Date(2025, 10, 1),
    endDate: new Date(2025, 10, 3),
    location: 'Virtual',
    isVirtual: true,
    registrationUrl: 'https://aihackathon.global',
    websiteUrl: 'https://aihackathon.global',
    prizePool: '$250,000',
    participantLimit: 2000,
    registeredCount: 1200,
    tags: ['ai', 'machine-learning', 'nlp', 'virtual'],
    difficulty: 'advanced',
    image: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-ai',
  },
  {
    _id: '4',
    name: 'StartupWeekend 2025',
    description: 'A 54-hour event where entrepreneurs, developers, and designers come together to launch startups from idea to pitch.',
    startDate: new Date(2025, 11, 7),
    endDate: new Date(2025, 11, 9),
    location: 'Multiple Cities',
    isVirtual: false,
    registrationUrl: 'https://startupweekend.org',
    websiteUrl: 'https://startupweekend.org',
    prizePool: '$50,000',
    participantLimit: 300,
    registeredCount: 220,
    tags: ['startup', 'entrepreneurship', 'pitch', 'networking'],
    difficulty: 'beginner',
    image: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-startup',
  },
  {
    _id: '5',
    name: 'Web3 Innovation Summit 2025',
    description: 'Build the future of decentralized applications. Compete for prizes while learning from blockchain experts.',
    startDate: new Date(2025, 11, 15),
    endDate: new Date(2025, 11, 17),
    location: 'Austin, TX',
    isVirtual: false,
    registrationUrl: 'https://web3summit.io',
    websiteUrl: 'https://web3summit.io',
    prizePool: '$300,000',
    participantLimit: 600,
    registeredCount: 450,
    tags: ['web3', 'blockchain', 'crypto', 'defi'],
    difficulty: 'advanced',
    image: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-web3',
  },
  {
    _id: '6',
    name: 'Climate Tech Hackathon 2025',
    description: 'Use technology to solve climate change. Build solutions for sustainability and environmental challenges.',
    startDate: new Date(2025, 12, 5),
    endDate: new Date(2025, 12, 7),
    location: 'Virtual',
    isVirtual: true,
    registrationUrl: 'https://climatetechhack.org',
    websiteUrl: 'https://climatetechhack.org',
    prizePool: '$150,000',
    participantLimit: 1500,
    registeredCount: 900,
    tags: ['climate', 'sustainability', 'environment', 'impact'],
    difficulty: 'intermediate',
    image: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-climate',
  },
];

export const hackathonService = {
  // Fetch hackathons from mock data or real API
  async fetchHackathons(): Promise<Hackathon[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In production, you would integrate with real APIs like:
    // - DevPost API (https://api.devpost.com)
    // - MLH API (https://api.mlh.io)
    // - Hackathon.com API
    // - Custom backend API

    return mockHackathons;
  },

  // Filter hackathons by criteria
  filterHackathons(
    hackathons: Hackathon[],
    filters: {
      difficulty?: string;
      isVirtual?: boolean;
      tags?: string[];
      searchQuery?: string;
    }
  ): Hackathon[] {
    let filtered = [...hackathons];

    if (filters.difficulty) {
      filtered = filtered.filter((h) => h.difficulty === filters.difficulty);
    }

    if (filters.isVirtual !== undefined) {
      filtered = filtered.filter((h) => h.isVirtual === filters.isVirtual);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((h) =>
        filters.tags!.some((tag) => h.tags.includes(tag))
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  // Get upcoming hackathons (sorted by date)
  getUpcomingHackathons(hackathons: Hackathon[]): Hackathon[] {
    const now = new Date();
    return hackathons
      .filter((h) => new Date(h.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  },

  // Format date for display
  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  },

  // Calculate days until hackathon
  daysUntil(date: Date | string): number {
    const now = new Date();
    const hackathonDate = new Date(date);
    const diff = hackathonDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  // Check if hackathon is happening soon (within 30 days)
  isHappeningSoon(date: Date | string): boolean {
    const days = this.daysUntil(date);
    return days > 0 && days <= 30;
  },
};
