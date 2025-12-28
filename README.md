# Project description - **_IDEASCOPE_**
This project is a web-based idea evaluation and decision-support engine that analyzes the novelty, feasibility, and potential of user-submitted ideas across multiple tracks such as startups, academic research, hackathons, and general projects.

The system is designed as a decision engine, not a neural network. It relies on structured analysis, external data aggregation, and rule-based evaluation logic to help users understand whether an idea is original, market-relevant, and worth pursuing. A dedicated neural network is planned as a future enhancement to improve predictive accuracy and depth of analysis.

# 🎯 Problem This Project Solves

Early-stage founders, students, and researchers often struggle to answer key questions during ideation:
Is this idea already widely implemented or researched?
Who else is working on something similar?
Is the field growing, saturated, or declining?
How can this idea be refined to be more unique or niche?
What factors could cause this idea to fail or succeed?
Manual research across multiple platforms is time-consuming, fragmented, and often biased. This project centralizes and structures that analysis into a single evaluation workflow.

# 🔍 How the System Works

The evaluation pipeline follows a structured analysis flow:
```bash
User Idea
   ↓
Similar Startups / Projects / Research Papers
   ↓
Market & Trend Analysis
   ↓
News & Sentiment Analysis
   ↓
Novelty & Potential Scoring
   ↓
Refined / Niche Idea Suggestions
```
Each idea is evaluated within a track-specific model, ensuring relevant criteria and data sources are used.

# 🧩 Core Features

- **Idea Evaluation Engine** - Generates novelty and potential scores based on structured analysis.
- **Track-Specific Analysis Models** (Separate evaluation logic for):
   - Startups
   - Academic / Research projects
   - Hackathon ideas
   - General technical projects

- **Similarity & Overlap Detection (Planned)** (Designed to surface):
   - Similar startups and products
   - Related research papers
   - GitHub repositories for hackathon and project ideas

- **Trend & Market Analysis (Planned)**
(Uses sources like Google Trends to assess):
   - Market crowding
   - Growth or decline of the idea’s domain
 
- **News Sentiment Analysis (Planned)** - Analyzes recent news related to the idea’s field and explains how external events may impact success or failure.

- **Idea Refinement & Niche Suggestions**
(Suggests modifications to):
   - Reduce overlap with existing solutions
   - Narrow the scope into a more viable niche

- **Failure & Success Indicators** - Explicitly highlights why an idea might fail and what factors could support its success.

- **Hackathon Support** - Includes duration estimation logic when project timelines are not provided.

# 🏗️ Architecture Overview
The project follows a modular web application architecture with a clear separation of concerns:

## Frontend
- Built using modern web technologies (TypeScript + React-style components).
- Handles:
   - Idea input and validation
   - Track selection
   - Display of evaluation results
   - User interaction and feedback

## Backend (Currently Mocked)

For rapid prototyping and development, the backend is currently implemented as a mock service layer.

   - Implemented in:
``` bash
src/services/mockEvaluationBackend.ts
```

- **Responsibilities**:
   - Simulates AI-style evaluation logic
   - Generates:
      - Scores
      - Strengths
      - Weaknesses
      - Recommendations
      - Contextual summaries
- Applies deterministic logic based on input quality
- Adds simulated network latency for realistic UX
- Returns data in the exact format expected from a real backend

This design ensures the frontend remains fully compatible with a future backend powered by real APIs, databases, or machine learning models.

# 🔮 Future Enhancements

- Integration with real data sources:
   - Crunchbase, Wellfound, Product Hunt
   - GitHub API for project and hackathon analysis
   - Semantic Scholar, OpenAlex, arXiv for research analysis
   - Google Trends and news APIs for trend and sentiment analysis
- Introduction of a dedicated neural network to:
   - Improve novelty detection
   - Learn from historical outcomes
   - Provide deeper predictive insights
- Advanced idea comparison and clustering

# 👥 Target Users

- Startup founders and early-stage entrepreneurs
- Hackathon participants
- Undergraduate and final-year students
- PhD and academic researchers exploring research directions

# Wixstro - Wix Astro Template

A modern, full-featured Wix Astro template built with React, TypeScript, and Tailwind CSS. This template provides a solid foundation for building dynamic, interactive websites with Wix's powerful ecosystem.

## 🚀 Features

- **Astro Framework** - Modern static site generator with server-side rendering
- **React Integration** - Full React support with JSX components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom components
- **Wix Integration** - Seamless integration with Wix services and APIs
- **Modern UI Components** - Radix UI components with custom styling
- **Authentication** - Built-in member authentication and protected routes
- **CMS Integration** - Content management system integration
- **Client-side Routing** - React Router for seamless navigation
- **Responsive Design** - Mobile-first responsive design
- **Testing** - Vitest testing framework setup
- **Development Tools** - ESLint, TypeScript checking, and more

## 🛠️ Tech Stack

- **Framework**: Astro 5.8.0
- **Frontend**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.14
- **Language**: TypeScript 5.8.3
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest
- **Build Tool**: Vite
- **Deployment**: Cloudflare


## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Wix account and site

### Installation

1. **Install dependencies**:
   ```bash
   npm run install-template
   ```

2. **Set up environment variables**:
   ```bash
   npm run env
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

The development server will start and you can view your site at `http://localhost:4321`.

## 📁 Project Structure

```
main/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Head.tsx        # Page head component
│   │   └── Router.tsx      # Routing component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Astro pages
│   └── styles/             # Global styles
├── integrations/           # Wix integrations
│   ├── cms/               # CMS integration
│   └── members/           # Member authentication
├── public/                # Static assets
└── eslint-rules/          # Custom ESLint rules
```

## 🎨 UI Components

This template includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout**: Accordion, Collapsible, Tabs, Sheet
- **Forms**: Input, Select, Checkbox, Radio Group, Switch
- **Navigation**: Navigation Menu, Menubar, Breadcrumb
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Popover, Tooltip, Hover Card
- **Data Display**: Table, Card, Badge, Avatar
- **Interactive**: Button, Toggle, Slider, Command

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run release` - Release to Wix
- `npm run env` - Pull environment variables
- `npm run check` - Type check with Astro
- `npm run test:run` - Run tests
- `npm run install-template` - Install dependencies

## 🧪 Testing

The project includes Vitest for testing:

```bash
npm run test:run
```

## 📱 Responsive Design

The template is built with a mobile-first approach and includes:

- Responsive breakpoints
- Touch-friendly interactions
- Optimized images
- Flexible layouts

## 🚀 Deployment

The template is configured for deployment on Cloudflare:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🆘 Support

For support and questions:

- Check the [Wix Developer Documentation](https://dev.wix.com/)
- Review the [Astro Documentation](https://docs.astro.build/)


---

Built with ❤️ using Wix Vibe, Astro, and modern web technologies.
