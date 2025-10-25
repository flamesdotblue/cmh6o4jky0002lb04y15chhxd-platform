import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Income', 'Other'];

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'Expense',
    category: 'Food',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  });

  const canSubmit = () => {
    const amt = Number(form.amount);
    return !Number.isNaN(amt) && amt > 0 && form.category && form.type && form.date;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit()) return;
    onAdd({ ...form, amount: Number(form.amount) });
    setForm((f) => ({ ...f, amount: '', note: '' }));
  };

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 backdrop-blur">
      <h3 className="text-lg font-semibold">Add Entry</h3>
      <p className="text-sm text-neutral-400 mb-4">Log an income or expense</p>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="col-span-1 bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
          >
            {['Expense', 'Income'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="col-span-1 bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            placeholder="Amount"
            className="bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
          />
        </div>

        <input
          type="text"
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          placeholder="Note (optional)"
          className="w-full bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
        />

        <button
          type="submit"
          disabled={!canSubmit()}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
        >
          <PlusCircle className="h-4 w-4" /> Add Entry
        </button>
      </form>
    </div>
  );
}
