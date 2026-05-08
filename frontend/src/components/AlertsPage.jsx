import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AlertsPage() {
  const [alert, setAlert] = useState({ type: 'Suspicious Activity', location: '', details: '' });
  const [activeAlert, setActiveAlert] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAlert((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveAlert(alert);
  };

  return (
    <div className="tricolor-page">
      <div className="tricolor-section p-10">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-4">Emergency Alerts</h1>
            <p className="text-slate-600">Send urgent alerts and review active safety notifications in your area.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
            <img
              src="/assets/emergency-ai-alert.png"
              alt="AI emergency alert system"
              className="h-full min-h-48 w-full object-cover"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">Alert type</span>
            <select
              name="type"
              value={alert.type}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>Suspicious Activity</option>
              <option>Fire or Smoke</option>
              <option>Traffic Hazard</option>
              <option>Medical Emergency</option>
            </select>
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">Location</span>
            <input
              name="location"
              type="text"
              value={alert.location}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Street, landmark, or neighborhood"
              required
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-700">Details</span>
            <textarea
              name="details"
              value={alert.details}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Provide a short description of the situation."
              required
            />
          </label>
          <button type="submit" className="rounded-full bg-red-600 px-6 py-3 text-white shadow hover:bg-red-700">Send an alert</button>
        </form>

        {activeAlert && (
          <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-5 text-slate-900 shadow-sm">
            <p className="font-semibold">Alert sent</p>
            <p className="mt-2 text-sm">Your alert for {activeAlert.type.toLowerCase()} at {activeAlert.location} has been recorded.</p>
          </div>
        )}

        <Link to="/public" className="mt-8 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">← Back to public dashboard</Link>
      </div>
    </div>
  );
}
