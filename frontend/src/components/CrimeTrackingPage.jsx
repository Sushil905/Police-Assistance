import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CrimeTrackingPage() {
  const [area, setArea] = useState('Downtown');
  const [summary, setSummary] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    setSummary(`Crime trends in ${area} show a 10% decrease in reported incidents compared to last month.`);
  };

  return (
    <div className="tricolor-page">
      <div className="tricolor-section p-10">
        <h1 className="text-4xl font-semibold mb-4">Crime Tracking</h1>
        <p className="text-slate-600 mb-6">Review trend summaries, recent incidents, and community safety alerts for your neighborhood.</p>

        <form onSubmit={handleSearch} className="space-y-6">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">Search by area</span>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter a neighborhood or district"
            />
          </label>
          <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-white shadow hover:bg-slate-800">Search trends</button>
        </form>

        {summary && (
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-slate-900 shadow-sm">
            <p className="font-semibold">Trend summary</p>
            <p className="mt-2 text-sm">{summary}</p>
          </div>
        )}

        <Link to="/public" className="mt-8 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">← Back to public dashboard</Link>
      </div>
    </div>
  );
}
