export function Footer() {
  return (
    <footer className="bg-primary border-t border-primary/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl">🎄</span>
          </div>
          <h3 className="text-lg font-semibold text-primary-foreground mb-2">
            Intercambio Familiar Anual
          </h3>
          <p className="text-sm text-primary-foreground/70 mb-6">
            ¡Los mejores recuerdos se crean juntos!
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-primary-foreground/60">
            <span>© 2026 Intercambio Familiar</span>
            <span>•</span>
            <span>Hecho con ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
