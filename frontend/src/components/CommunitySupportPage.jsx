import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CommunitySupportPage() {
  const [interest, setInterest] = useState('Neighborhood Watch');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="tricolor-page">
      <div className="tricolor-section p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-4">Community Support</h1>
            <p className="text-slate-600 mb-6">Connect with local safety programs, neighborhood watch updates, and community policing resources.</p>
          </div>
          <img
            className="h-80 w-full rounded-[2rem] border-4 border-white/80 object-cover shadow-xl"
            src="/assets/community-support-police.png"
            onError={(event) => {
              event.currentTarget.src = '/assets/community-help.jpg';
            }}
            alt="Police officer connecting with the community"
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">I want to learn more about</span>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>Neighborhood Watch</option>
              <option>Safety Workshops</option>
              <option>Volunteer Patrols</option>
              <option>Community Alerts</option>
            </select>
          </label>

          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">Message or concern</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Share a community safety concern or request support for a local program."
            />
          </label>

          <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-white shadow hover:bg-slate-800">Send request</button>
        </form>

        {submitted && (
          <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-5 text-green-900 shadow-sm">
            <p className="font-semibold">Request received</p>
            <p className="mt-2 text-sm">You will receive a follow-up with resources for {interest.toLowerCase()} soon.</p>
          </div>
        )}

        <Link to="/public" className="mt-8 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">← Back to public dashboard</Link>
      </div>
    </div>
  );
}
