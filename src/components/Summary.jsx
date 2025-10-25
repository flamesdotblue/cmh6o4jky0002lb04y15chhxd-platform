import { PieChart, Wallet, TrendingDown, TrendingUp } from 'lucide-react';

function format(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function Summary({ totals }) {
  const { income, spent, balance, byCategory, topCategory } = totals || {};
  const topValue = topCategory ? byCategory[topCategory] : 0;

  return (
    <section className="-mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-400">Balance</p>
            <h3 className="text-2xl font-semibold mt-1">{format(balance || 0)}</h3>
          </div>
          <div className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-400">Income</p>
            <h3 className="text-2xl font-semibold mt-1">{format(income || 0)}</h3>
          </div>
          <div className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-400">Expenses</p>
            <h3 className="text-2xl font-semibold mt-1">{format(spent || 0)}</h3>
          </div>
          <div className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
            <TrendingDown className="h-5 w-5" />
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-400">Top Category</p>
            <h3 className="text-xl font-semibold mt-1">{topCategory || '—'}</h3>
            <p className="text-sm text-neutral-400">{topCategory ? format(topValue || 0) : 'No data yet'}</p>
          </div>
          <div className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <PieChart className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 backdrop-blur">
      {children}
    </div>
  );
}
