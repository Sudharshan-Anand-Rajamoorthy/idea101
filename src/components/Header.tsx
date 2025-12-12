import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-gridline">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-heading text-primary-foreground uppercase tracking-wider">
            IdeaScope
          </Link>
          
          <nav className="flex items-center gap-8">
            <a href="#evaluate" className="text-sm font-paragraph text-primary-foreground uppercase tracking-wider hover:text-secondary transition-colors">
              Evaluate
            </a>
            <a href="#how-it-works" className="text-sm font-paragraph text-primary-foreground uppercase tracking-wider hover:text-secondary transition-colors">
              How It Works
            </a>
            <a href="#results" className="text-sm font-paragraph text-primary-foreground uppercase tracking-wider hover:text-secondary transition-colors">
              Results
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
