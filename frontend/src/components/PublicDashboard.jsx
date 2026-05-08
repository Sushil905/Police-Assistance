import { Link } from 'react-router-dom';
import ComplaintStatusChart from './ComplaintStatusChart';

export default function PublicDashboard() {
  return (
    <div className="tricolor-page public-dashboard-page galaxy-blue-page">
      <section className="tricolor-section grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <h1 className="text-4xl font-semibold mb-4">Public User Dashboard</h1>
          <p className="text-slate-600 max-w-xl">A trusted portal for citizens to file complaints, upload evidence, and stay updated with case progress in real time.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/complaint" className="rounded-full bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700">File Complaint</Link>
            <Link to="/case-tracking" className="rounded-full border border-slate-300 px-6 py-3 text-slate-800 hover:bg-slate-100">Track Status</Link>
          </div>
        </div>
        <img
          className="h-96 w-full rounded-[2rem] object-cover"
          src="/assets/public-dashboard-police.png"
          alt="Maharashtra Police public help desk and emergency response"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-4 mt-8">
        <Link to="/complaint" className="group tricolor-dark-card transition hover:-translate-y-1 hover:bg-slate-800">
          <h2 className="text-xl font-semibold mb-3">Safe Complaint Filing</h2>
          <p className="text-slate-300">Securely submit details and evidence from your mobile or desktop device.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 group-hover:text-white">Open filing form →</span>
        </Link>
        <Link to="/community-support" className="group tricolor-card transition hover:-translate-y-1 hover:bg-sky-100">
          <img
            className="h-36 w-full rounded-3xl object-cover"
            src="/assets/community-support-police.png"
            alt="Police officer connecting with the community"
          />
          <h3 className="mt-5 text-xl font-semibold">Community Support</h3>
          <p className="mt-3 text-slate-600">Build trust between citizens and law enforcement through transparent updates.</p>
        </Link>
        <Link to="/alerts" className="group tricolor-card transition hover:-translate-y-1 hover:bg-sky-100">
          <img className="h-36 w-full rounded-3xl object-cover" src="/assets/public-emergency-alerts.png" alt="AI emergency alert dispatch system" />
          <h3 className="mt-5 text-xl font-semibold">Emergency Alerts</h3>
          <p className="mt-3 text-slate-600">Send urgent requests and receive immediate attention from nearby officers.</p>
        </Link>
        <Link to="/crime-tracking" className="group tricolor-card transition hover:-translate-y-1 hover:bg-sky-100">
          <img className="h-36 w-full rounded-3xl object-cover" src="/assets/public-crime-tracking.png" alt="Digital crime tracking dashboard" />
          <h3 className="mt-5 text-xl font-semibold">Crime Tracking</h3>
          <p className="mt-3 text-slate-600">See the current status of reported complaints and community actions.</p>
        </Link>
      </div>

      <div className="tricolor-section mt-8 p-4">
        <h2 className="mb-3 text-lg font-semibold">Current Case Snapshot</h2>
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <ComplaintStatusChart compact />
          <div className="border-t border-slate-200 pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <h3 className="mb-3 text-base font-semibold">Police Stations in Maharashtra Cities</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Mumbai</h4>
                <p className="text-xs text-slate-600">~100 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Pune</h4>
                <p className="text-xs text-slate-600">~50 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Nagpur</h4>
                <p className="text-xs text-slate-600">~30 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Thane</h4>
                <p className="text-xs text-slate-600">~40 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Nashik</h4>
                <p className="text-xs text-slate-600">~25 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Aurangabad</h4>
                <p className="text-xs text-slate-600">~20 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Solapur</h4>
                <p className="text-xs text-slate-600">~20 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Kolhapur</h4>
                <p className="text-xs text-slate-600">~15 police stations</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Amravati</h4>
                <p className="text-xs text-slate-600">~15 police stations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
