export function Footer() {
  return (
    <footer className="bg-primary border-t border-primary/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl">🎄</span>
          </div>
          <h3 className="text-lg font-semibold text-primary-foreground mb-2">
            Refugio Invernal
          </h3>
          <p className="text-sm text-primary-foreground/70 mb-6">
            Making memories together, one Christmas at a time.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-primary-foreground/60">
            <span>© 2026 Family Christmas Exchange</span>
            <span>•</span>
            <span>Made with ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
