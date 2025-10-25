import { Trash2 } from 'lucide-react';

function Badge({ type }) {
  const isIncome = type === 'Income';
  const color = isIncome ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-rose-500/10 text-rose-300 border-rose-500/20';
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full border ${color}`}>{type}</span>
  );
}

function formatCurrency(n) {
  return Number(n).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function ExpenseTable({ items, onDelete }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-900/80">
            <tr className="text-left text-neutral-400">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Note</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">No entries match your filters.</td>
              </tr>
            )}
            {items.map((e) => (
              <tr key={e.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 align-top">{new Date(e.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 align-top"><Badge type={e.type} /></td>
                <td className="px-4 py-3 align-top">{e.category}</td>
                <td className="px-4 py-3 align-top text-neutral-300">{e.note || '—'}</td>
                <td className="px-4 py-3 align-top text-right font-medium">{formatCurrency(e.amount)}</td>
                <td className="px-4 py-3 align-top text-right">
                  <button
                    onClick={() => onDelete(e.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-neutral-300 hover:bg-white/10"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
