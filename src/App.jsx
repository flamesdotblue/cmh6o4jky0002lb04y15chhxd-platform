import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';

const LS_KEY = 'expenses';

const seedData = [
  {
    id: crypto.randomUUID(),
    type: 'Expense',
    category: 'Food',
    amount: 22.5,
    date: new Date().toISOString().slice(0, 10),
    note: 'Lunch with friends',
  },
  {
    id: crypto.randomUUID(),
    type: 'Expense',
    category: 'Transport',
    amount: 12.0,
    date: new Date().toISOString().slice(0, 10),
    note: 'Metro card top-up',
  },
  {
    id: crypto.randomUUID(),
    type: 'Income',
    category: 'Income',
    amount: 1200,
    date: new Date().toISOString().slice(0, 10),
    note: 'Freelance payout',
  },
  {
    id: crypto.randomUUID(),
    type: 'Expense',
    category: 'Bills',
    amount: 75,
    date: new Date().toISOString().slice(0, 10),
    note: 'Internet bill',
  },
];

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
      return seedData;
    } catch {
      return seedData;
    }
  });

  const [filters, setFilters] = useState({
    query: '',
    category: 'All',
    type: 'All',
    month: 'All',
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addEntry = (entry) => {
    setExpenses((prev) => [{ id: crypto.randomUUID(), ...entry }, ...prev]);
  };

  const deleteEntry = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const months = useMemo(() => {
    const set = new Set(
      expenses.map((e) => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      })
    );
    return ['All', ...Array.from(set).sort().reverse()];
  }, [expenses]);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchQuery = filters.query
        ? (e.note || '').toLowerCase().includes(filters.query.toLowerCase())
        : true;
      const matchCategory = filters.category === 'All' ? true : e.category === filters.category;
      const matchType = filters.type === 'All' ? true : e.type === filters.type;
      const matchMonth = (() => {
        if (filters.month === 'All') return true;
        const d = new Date(e.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return key === filters.month;
      })();
      return matchQuery && matchCategory && matchType && matchMonth;
    });
  }, [expenses, filters]);

  const totals = useMemo(() => {
    const income = expenses
      .filter((e) => e.type === 'Income')
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const spent = expenses
      .filter((e) => e.type === 'Expense')
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const balance = income - spent;

    const byCategory = expenses.reduce((acc, e) => {
      const key = e.category || 'Other';
      acc[key] = (acc[key] || 0) + (e.type === 'Expense' ? Number(e.amount || 0) : 0);
      return acc;
    }, {});

    const topCategory = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    return { income, spent, balance, byCategory, topCategory };
  }, [expenses]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />

      <main className="mx-auto max-w-6xl px-4 -mt-24 relative z-10">
        <Summary totals={totals} />

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm onAdd={addEntry} />
          </div>
          <div className="lg:col-span-2">
            <div className="mb-3 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
              <div className="flex gap-2">
                <input
                  value={filters.query}
                  onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                  placeholder="Search note..."
                  className="bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                  className="bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
                >
                  {['All', 'Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Income', 'Other'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                  className="bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
                >
                  {['All', 'Income', 'Expense'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={filters.month}
                  onChange={(e) => setFilters((f) => ({ ...f, month: e.target.value }))}
                  className="bg-neutral-900/70 border border-neutral-800 rounded-md px-3 py-2"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <ExpenseTable items={filtered} onDelete={deleteEntry} />
          </div>
        </section>

        <footer className="py-12 text-center text-neutral-400">
          Built for tracking money and expenses. Data persists locally in your browser.
        </footer>
      </main>
    </div>
  );
}
