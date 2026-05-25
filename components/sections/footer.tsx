import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-1/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><Link href="https://studio.pipoh.ai" className="transition-colors hover:text-text-primary">Studio</Link></li>
              <li><Link href="https://studio.pipoh.ai/explore" className="transition-colors hover:text-text-primary">Explore</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-text-primary">Pricing</Link></li>
              <li><Link href="/manifesto" className="transition-colors hover:text-text-primary">Manifesto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><Link href="/manifesto" className="transition-colors hover:text-text-primary">About</Link></li>
              <li>
                <Link
                  href="https://status.pipoh.ai"
                  className="transition-colors hover:text-text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><Link href="/privacy" className="transition-colors hover:text-text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-text-primary">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Connect</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><Link href="mailto:hi@pipoh.ai" className="transition-colors hover:text-text-primary">hi@pipoh.ai</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-8">
          <p className="text-xs text-text-muted">© 2026 GIGO Studios. Pipoh is a registered trademark.</p>
          <p className="text-xs text-text-muted">Where pixels become art.</p>
        </div>
      </div>
    </footer>
  );
}
