export default function Footer() {
  return (
    <footer className="bg-primary border-t border-gridline mt-24">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-heading text-primary-foreground uppercase mb-4">
              IdeaScope
            </h3>
            <p className="text-sm font-paragraph text-primary-foreground opacity-80">
              AI-powered startup idea evaluation platform. Transform your concepts into actionable insights.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-heading text-primary-foreground uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#evaluate" className="text-sm font-paragraph text-primary-foreground opacity-80 hover:text-secondary transition-colors">
                  Evaluate Ideas
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm font-paragraph text-primary-foreground opacity-80 hover:text-secondary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#results" className="text-sm font-paragraph text-primary-foreground opacity-80 hover:text-secondary transition-colors">
                  View Results
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-heading text-primary-foreground uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm font-paragraph text-primary-foreground opacity-80">
                  Documentation
                </span>
              </li>
              <li>
                <span className="text-sm font-paragraph text-primary-foreground opacity-80">
                  API Access
                </span>
              </li>
              <li>
                <span className="text-sm font-paragraph text-primary-foreground opacity-80">
                  Support
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gridline">
          <p className="text-sm font-paragraph text-primary-foreground opacity-60 text-center">
            © 2025 IdeaScope. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
