import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ComplaintPage() {
  const [complaint, setComplaint] = useState({ name: '', email: '', location: '', incidentType: 'Theft', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="tricolor-page">
      <div className="tricolor-section p-10">
        <h1 className="text-4xl font-semibold mb-4">File a Complaint</h1>
        <p className="text-slate-600 mb-6">Submit your report securely so the police department can act quickly and keep you updated.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Full Name</span>
              <input
                name="name"
                type="text"
                value={complaint.name}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Jane Doe"
                required
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Email or Phone</span>
              <input
                name="email"
                type="text"
                value={complaint.email}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Location</span>
              <input
                name="location"
                type="text"
                value={complaint.location}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Street, city, neighborhood"
                required
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Incident Type</span>
              <select
                name="incidentType"
                value={complaint.incidentType}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Theft</option>
                <option>Assault</option>
                <option>Vandalism</option>
                <option>Harassment</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Incident Details</span>
            <textarea
              name="details"
              value={complaint.details}
              onChange={handleChange}
              rows="6"
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Describe what happened in as much detail as possible."
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Evidence File</span>
              <input type="file" className="w-full text-slate-700" />
            </label>
            <button type="submit" className="rounded-full bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700">Submit Complaint</button>
          </div>
        </form>

        {submitted && (
          <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-5 text-green-900 shadow-sm">
            <p className="font-semibold">Complaint submitted!</p>
            <p className="mt-2 text-sm">We’ve received your request and will notify you with next steps shortly.</p>
          </div>
        )}

        <Link to="/public" className="mt-8 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">← Back to public dashboard</Link>
      </div>
    </div>
  );
}
