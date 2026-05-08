import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CaseTrackingPage() {
  const [caseNumber, setCaseNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(caseNumber ? `Case ${caseNumber} is currently under review by dispatch.` : null);
  };

  return (
    <div className="tricolor-page">
      <div className="tricolor-section p-10">
        <h1 className="text-4xl font-semibold mb-4">Track Your Case</h1>
        <p className="text-slate-600 mb-6">Enter your case number or login to view the latest updates and officer response information.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">Case Number</span>
            <input
              type="text"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. 2026-PA-0042"
            />
          </label>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-white shadow hover:bg-slate-800">View case status</button>
            <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-slate-800 hover:bg-slate-100">Login for more details</Link>
          </div>
        </form>

        {result && (
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-slate-900 shadow-sm">
            <p className="font-semibold">Tracking result</p>
            <p className="mt-2 text-sm">{result}</p>
          </div>
        )}

        <Link to="/public" className="mt-8 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">← Back to public dashboard</Link>
      </div>
    </div>
  );
}
