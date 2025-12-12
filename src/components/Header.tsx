import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-gridline">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-heading text-primary-foreground uppercase tracking-wider hover:text-secondary transition-colors">
            IdeaScope
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              to="/tracks"
              className={`text-sm font-paragraph uppercase tracking-wider transition-colors ${
                location.pathname === '/tracks'
                  ? 'text-secondary'
                  : 'text-primary-foreground hover:text-secondary'
              }`}
            >
              Evaluate
            </Link>
            <Link
              to="/history"
              className={`text-sm font-paragraph uppercase tracking-wider transition-colors ${
                location.pathname === '/history'
                  ? 'text-secondary'
                  : 'text-primary-foreground hover:text-secondary'
              }`}
            >
              History
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
