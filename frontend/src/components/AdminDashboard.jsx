import { useState } from 'react';
import ComplaintStatusChart from './ComplaintStatusChart';

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState('officers');
  const [officers, setOfficers] = useState([
    { id: 'OFF-101', name: 'Inspector S. Patil', role: 'Inspector', station: 'Pune Central', cases: 8 },
    { id: 'OFF-118', name: 'Sub Inspector A. Khan', role: 'Sub Inspector', station: 'Thane West', cases: 5 },
    { id: 'OFF-126', name: 'Constable M. Shinde', role: 'Constable', station: 'Nashik Road', cases: 3 },
  ]);
  const [newOfficer, setNewOfficer] = useState({ name: '', role: 'Sub Inspector', station: '' });
  const [assignment, setAssignment] = useState({ caseId: '2026-PA-0042', officerId: 'OFF-101' });
  const [assignmentMessage, setAssignmentMessage] = useState('');
  const [reportMessage, setReportMessage] = useState('');

  const complaints = [
    { id: '2026-PA-0042', title: 'Mobile theft complaint', priority: 'High', location: 'Pune Station Road' },
    { id: '2026-PA-0087', title: 'Traffic hazard report', priority: 'Medium', location: 'Nashik Road' },
    { id: '2026-PA-0119', title: 'Suspicious activity alert', priority: 'Urgent', location: 'Thane West' },
  ];

  const handleAddOfficer = (event) => {
    event.preventDefault();
    setOfficers((current) => [
      ...current,
      {
        id: `OFF-${Math.floor(200 + Math.random() * 700)}`,
        name: newOfficer.name,
        role: newOfficer.role,
        station: newOfficer.station,
        cases: 0,
      },
    ]);
    setNewOfficer({ name: '', role: 'Sub Inspector', station: '' });
  };

  const handleAssignCase = (event) => {
    event.preventDefault();
    const selectedOfficer = officers.find((officer) => officer.id === assignment.officerId);
    setAssignmentMessage(`${assignment.caseId} assigned to ${selectedOfficer?.name}.`);
  };

  const handleGenerateReport = () => {
    setReportMessage(`Generated report: ${complaints.length} active complaints, ${officers.length} officers, ${officers.reduce((total, officer) => total + officer.cases, 0)} assigned cases.`);
  };

  return (
    <div className="tricolor-page galaxy-blue-page">
      <section className="tricolor-section">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-slate-500 text-sm">Admin control</p>
            <h1 className="mt-4 text-4xl font-semibold">Admin Dashboard</h1>
            <p className="mt-5 text-slate-600 max-w-xl">Oversee officers, assign complaints, and generate analytics that help your station respond faster and more transparently.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button type="button" onClick={() => setActivePanel('officers')} className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">Manage Team</button>
              <button type="button" onClick={() => setActivePanel('reports')} className="rounded-full border border-slate-300 px-6 py-3 text-slate-800 hover:bg-slate-100">View Reports</button>
            </div>
          </div>
          <img
            className="h-96 w-full rounded-[2rem] object-cover"
            src="/assets/admin-dashboard-police-analytics.png"
            alt="Police administrator reviewing analytics dashboards"
          />
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <div className="tricolor-card">
          <h2 className="text-xl font-semibold mb-4">Officer Management</h2>
          <p className="text-slate-600 mb-5">Quickly add officers, manage roles, and assign stations.</p>
          <button type="button" onClick={() => setActivePanel('officers')} className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Manage Officers</button>
        </div>
        <div className="tricolor-card">
          <h2 className="text-xl font-semibold mb-4">Complaints Assignment</h2>
          <p className="text-slate-600 mb-5">Assign complaints to appropriate officers based on case type and area.</p>
          <button type="button" onClick={() => setActivePanel('assignments')} className="rounded-full bg-green-600 px-5 py-3 text-white hover:bg-green-700">Assign Cases</button>
        </div>
        <div className="tricolor-card">
          <h2 className="text-xl font-semibold mb-4">Reports & Analytics</h2>
          <p className="text-slate-600 mb-5">Generate insights from crime trends and officer performance data.</p>
          <button type="button" onClick={() => setActivePanel('reports')} className="rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-700">Generate Report</button>
        </div>
      </div>

      <section className="tricolor-section mt-8">
        <div className="flex flex-wrap gap-3">
          {[
            ['officers', 'Officers'],
            ['assignments', 'Assignments'],
            ['reports', 'Reports'],
          ].map(([panel, label]) => (
            <button
              key={panel}
              type="button"
              onClick={() => setActivePanel(panel)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${activePanel === panel ? 'bg-slate-900 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {activePanel === 'officers' && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-3">
              {officers.map((officer) => (
                <div key={officer.id} className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold text-blue-700">{officer.id}</p>
                      <h3 className="mt-1 font-semibold text-slate-950">{officer.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{officer.role} · {officer.station}</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{officer.cases} cases</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddOfficer} className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Add Officer</h3>
              <label className="mt-4 block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Name</span>
                <input value={newOfficer.name} onChange={(event) => setNewOfficer((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500" required />
              </label>
              <label className="mt-4 block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Role</span>
                <select value={newOfficer.role} onChange={(event) => setNewOfficer((current) => ({ ...current, role: event.target.value }))} className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500">
                  <option>Inspector</option>
                  <option>Sub Inspector</option>
                  <option>Constable</option>
                  <option>Admin Officer</option>
                </select>
              </label>
              <label className="mt-4 block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Station</span>
                <input value={newOfficer.station} onChange={(event) => setNewOfficer((current) => ({ ...current, station: event.target.value }))} className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500" required />
              </label>
              <button type="submit" className="mt-5 rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Add Officer</button>
            </form>
          </div>
        )}

        {activePanel === 'assignments' && (
          <form onSubmit={handleAssignCase} className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Complaint</span>
              <select value={assignment.caseId} onChange={(event) => setAssignment((current) => ({ ...current, caseId: event.target.value }))} className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500">
                {complaints.map((complaint) => (
                  <option key={complaint.id} value={complaint.id}>{complaint.id} - {complaint.title}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Officer</span>
              <select value={assignment.officerId} onChange={(event) => setAssignment((current) => ({ ...current, officerId: event.target.value }))} className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500">
                {officers.map((officer) => (
                  <option key={officer.id} value={officer.id}>{officer.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="rounded-full bg-green-600 px-6 py-3 text-white shadow hover:bg-green-700">Assign Case</button>
            {assignmentMessage && <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 lg:col-span-3">{assignmentMessage}</p>}
          </form>
        )}

        {activePanel === 'reports' && (
          <div className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5">
                <p className="text-sm text-slate-600">Active complaints</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{complaints.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5">
                <p className="text-sm text-slate-600">Officers</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{officers.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5">
                <p className="text-sm text-slate-600">Assigned case load</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{officers.reduce((total, officer) => total + officer.cases, 0)}</p>
              </div>
            </div>
            <button type="button" onClick={handleGenerateReport} className="mt-5 rounded-full bg-purple-600 px-6 py-3 text-white shadow hover:bg-purple-700">Generate Summary</button>
            {reportMessage && <p className="mt-4 rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-800">{reportMessage}</p>}
          </div>
        )}
      </section>

      <div className="tricolor-section mt-8">
        <h2 className="text-2xl font-semibold mb-4">Crime Analytics Overview</h2>
        <ComplaintStatusChart />
      </div>
    </div>
  );
}
