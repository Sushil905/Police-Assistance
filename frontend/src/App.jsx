import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import PublicDashboard from './components/PublicDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import AdminDashboard from './components/AdminDashboard';
import ComplaintPage from './components/ComplaintPage';
import CaseTrackingPage from './components/CaseTrackingPage';
import CommunitySupportPage from './components/CommunitySupportPage';
import AlertsPage from './components/AlertsPage';
import CrimeTrackingPage from './components/CrimeTrackingPage';
import PoliceStationFinder from './components/PoliceStationFinder';
import NewsSection from './components/NewsSection';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const emergencyNumbers = [
    { label: 'Police', number: '100' },
    { label: 'Emergency', number: '112' },
    { label: 'Women Helpline', number: '1091' },
    { label: 'Child Helpline', number: '1098' },
    { label: 'Ambulance', number: '108' },
    { label: 'Fire', number: '101' },
  ];

  return (
    <Router>
      <div className={`${darkMode ? 'app-dark border-green-600 bg-slate-800 text-slate-100' : 'border-orange-500 bg-slate-100 text-slate-900'} min-h-screen border-[10px] transition-colors duration-300`}>
        <button
          type="button"
          onClick={() => setDarkMode((current) => !current)}
          className="fixed right-3 top-3 z-50 rounded-full border border-white/40 bg-slate-800/90 px-2.5 py-1.5 text-[10px] font-semibold leading-none text-white shadow-lg backdrop-blur transition hover:bg-slate-700"
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>

        <header className="border-b-4 border-green-600 bg-slate-900 px-6 py-5 text-white shadow-xl">
          <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/maharashtra-police-badge.svg"
                alt="Maharashtra Police Badge"
                className="w-10 h-10"
              />
              <Link to="/" className="text-2xl font-semibold tracking-tight">Smart Police Assistance</Link>
            </div>
            <nav className="flex flex-wrap gap-4 text-sm md:text-base">
              <Link to="/" className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700">Home</Link>
              <Link to="/public" className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700">Public</Link>
              <Link to="/station-finder" className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700">Station Finder</Link>
              <Link to="/officer" className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700">Officer</Link>
              <Link to="/admin" className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700">Admin</Link>
              <Link to="/login" className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700">Login</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-10 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative' }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/80 via-white/80 to-green-600/80"></div>
                  <div className="relative z-10 space-y-10 p-4 sm:p-6">
                    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center rounded-[2rem] border border-white/30 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 p-8 text-white shadow-2xl">
                      <div>
                        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                          <img
                            src="/assets/maharashtra-police-badge.svg"
                            alt="Maharashtra Police Badge"
                            className="h-10 w-10"
                          />
                          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Maharashtra Police</span>
                        </div>
                        <p className="uppercase tracking-[0.3em] text-sm text-slate-300">Community first</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight">A safer public through better police collaboration.</h1>
                        <p className="mt-6 text-slate-200 max-w-xl">Access complaint filing, case tracking, emergency alerts, officer dashboards, analytics, and station lookup in one secure system.</p>
                        <div className="mt-8 flex flex-wrap gap-4">
                          <Link to="/public" className="rounded-full bg-white px-5 py-3 text-slate-900 font-semibold shadow hover:bg-slate-100">Public Dashboard</Link>
                          <Link to="/station-finder" className="rounded-full border border-white/30 px-5 py-3 text-white hover:bg-white/10">Station Finder</Link>
                        </div>
                      </div>
                      <div className="relative min-h-80 overflow-hidden rounded-[2rem] border-4 border-white/40 bg-slate-800 shadow-inner lg:min-h-[430px]">
                        <img
                          className="absolute inset-0 h-full w-full object-cover"
                          src="/assets/maharashtra-police-day.png"
                          alt="Maharashtra Police day greeting"
                        />
                      </div>
                    </section>

                    <section className="rounded-[2rem] border-4 border-green-600/70 bg-white/95 p-6 shadow-xl backdrop-blur">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">Emergency Numbers</p>
                          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Quick help contacts</h2>
                        </div>
                        <p className="text-sm text-slate-600">Use these helplines for urgent assistance.</p>
                      </div>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {emergencyNumbers.map((item) => (
                          <a
                            key={item.label}
                            href={`tel:${item.number}`}
                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 shadow-sm transition hover:border-red-200 hover:bg-red-50"
                          >
                            <span className="font-medium">{item.label}</span>
                            <span className="text-2xl font-bold text-red-600">{item.number}</span>
                          </a>
                        ))}
                      </div>
                    </section>

                    <NewsSection />

                    <section className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-[2rem] border border-white/30 bg-slate-800 bg-opacity-70 p-6 text-white shadow-lg">
                        <img
                          className="h-40 w-full rounded-3xl object-cover"
                          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="Community and police working together"
                        />
                        <h2 className="mt-6 text-xl font-semibold">Community Support</h2>
                        <p className="mt-3 text-slate-200">Empower citizens to report safely and stay informed about local safety initiatives.</p>
                      </div>
                      <div className="rounded-[2rem] border border-white/30 bg-slate-800 bg-opacity-70 p-6 text-white shadow-lg">
                        <img
                          className="h-40 w-full rounded-3xl object-cover"
                          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="Police officer assisting a citizen"
                        />
                        <h2 className="mt-6 text-xl font-semibold">Officer Efficiency</h2>
                        <p className="mt-3 text-slate-200">Track cases, manage evidence, and stay connected with your team from a unified interface.</p>
                      </div>
                      <div className="rounded-[2rem] border border-white/30 bg-slate-800 bg-opacity-70 p-6 text-white shadow-lg">
                        <img
                          className="h-40 w-full rounded-3xl object-cover"
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="Police data analytics and reporting"
                        />
                        <h2 className="mt-6 text-xl font-semibold">Analytics & Reporting</h2>
                        <p className="mt-3 text-slate-200">Visualize crime trends and performance metrics to improve police deployment and safety outcomes.</p>
                      </div>
                    </section>
                  </div>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/public" element={<PublicDashboard />} />
            <Route path="/complaint" element={<ComplaintPage />} />
            <Route path="/case-tracking" element={<CaseTrackingPage />} />
            <Route path="/community-support" element={<CommunitySupportPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/crime-tracking" element={<CrimeTrackingPage />} />
            <Route path="/station-finder" element={<PoliceStationFinder />} />
            <Route path="/officer" element={<OfficerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
