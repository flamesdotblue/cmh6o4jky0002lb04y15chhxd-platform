import Spline from '@splinetool/react-spline';
import { CreditCard } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-neutral-950/90" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
            <CreditCard className="h-4 w-4 text-blue-300" />
            <span className="text-xs text-neutral-200">Fintech • Expense & Budget Tracker</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Track your money with clarity
          </h1>
          <p className="mt-3 text-neutral-300 max-w-2xl">
            A sleek dashboard to log incomes and expenses, visualize spending, and keep your balance in check.
          </p>
        </div>
      </div>
    </section>
  );
}
