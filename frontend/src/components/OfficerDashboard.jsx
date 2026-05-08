import { useState } from 'react';

export default function OfficerDashboard() {
  const [activePanel, setActivePanel] = useState('cases');
  const [selectedCaseId, setSelectedCaseId] = useState('2026-PA-0042');
  const [noteText, setNoteText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [assignedCases, setAssignedCases] = useState([
    {
      id: '2026-PA-0042',
      title: 'Mobile theft complaint',
      location: 'Pune Station Road',
      priority: 'High',
      status: 'Under Review',
      notes: ['Initial complaint verified.', 'CCTV request sent to nearby shops.'],
    },
    {
      id: '2026-PA-0087',
      title: 'Traffic hazard report',
      location: 'Nashik Road',
      priority: 'Medium',
      status: 'Assigned',
      notes: ['Patrol team notified.'],
    },
    {
      id: '2026-PA-0119',
      title: 'Suspicious activity alert',
      location: 'Thane West',
      priority: 'Urgent',
      status: 'Action Needed',
      notes: ['Citizen requested immediate follow-up.'],
    },
  ]);

  const handleStatusSubmit = (event) => {
    event.preventDefault();
    if (!noteText.trim()) return;

    setAssignedCases((currentCases) =>
      currentCases.map((caseItem) =>
        caseItem.id === selectedCaseId
          ? { ...caseItem, notes: [...caseItem.notes, noteText.trim()] }
          : caseItem
      )
    );
    setNoteText('');
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const fileInput = event.currentTarget.elements.evidenceFiles;
    const files = Array.from(fileInput.files || []);
    const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
    const validFiles = files.filter((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(extension);
    });

    if (!validFiles.length) {
      setUploadMessage('Please choose PDF, Word, or PowerPoint files only.');
      return;
    }

    setUploadedFiles((current) => [
      ...current,
      ...validFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        caseId: selectedCaseId,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      })),
    ]);
    setUploadMessage(`${validFiles.length} file${validFiles.length === 1 ? '' : 's'} attached to ${selectedCaseId}.`);
    fileInput.value = '';
  };

  return (
    <div className="tricolor-page">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-center rounded-[2rem] border-4 border-white/70 bg-slate-900 text-white p-8 shadow-2xl">
        <div>
          <p className="uppercase tracking-[0.3em] text-slate-400 text-sm">Officer control center</p>
          <h1 className="mt-4 text-4xl font-semibold">Police Officer Dashboard</h1>
          <p className="mt-5 text-slate-300 max-w-xl">Manage assigned cases, update investigation progress, and upload evidence files in one secure dashboard.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button type="button" onClick={() => setActivePanel('cases')} className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">View Cases</button>
            <button
              type="button"
              onClick={() => setActivePanel('notes')}
              className="rounded-full border border-white/30 px-6 py-3 text-white hover:bg-white/10"
            >
              Add Status
            </button>
          </div>
        </div>
        <img
          className="h-96 w-full rounded-[2rem] object-cover"
          src="/assets/officer-dashboard-control.png"
          alt="Police officer managing cases in a control center"
        />
      </section>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <div className="tricolor-card">
          <h2 className="text-xl font-semibold mb-4">Assigned Cases</h2>
          <p className="text-slate-600 mb-5">Quickly access your pending and active complaint assignments.</p>
          <button type="button" onClick={() => setActivePanel('cases')} className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Open Cases</button>
        </div>
        <div className="tricolor-card">
          <h2 className="text-xl font-semibold mb-4">Investigative Notes</h2>
          <p className="text-slate-600 mb-5">Log updates, add evidence details, and share notes with your team.</p>
          <button
            type="button"
            onClick={() => setActivePanel('notes')}
            className="rounded-full bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Add Notes
          </button>
        </div>
        <div className="tricolor-card">
          <h2 className="text-xl font-semibold mb-4">Evidence Upload</h2>
          <p className="text-slate-600 mb-5">Attach PDF, Word, and PowerPoint evidence files to any case.</p>
          <button type="button" onClick={() => setActivePanel('upload')} className="rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-700">Upload Files</button>
        </div>
      </div>

      <section className="tricolor-section mt-8">
        <div className="flex flex-wrap gap-3">
          {['cases', 'notes', 'upload'].map((panel) => (
            <button
              key={panel}
              type="button"
              onClick={() => setActivePanel(panel)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold capitalize transition ${activePanel === panel ? 'bg-slate-900 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            >
              {panel === 'upload' ? 'Upload files' : panel}
            </button>
          ))}
        </div>

        {activePanel === 'cases' && (
          <div className="mt-6 grid gap-4">
            {assignedCases.map((caseItem) => (
              <button
                key={caseItem.id}
                type="button"
                onClick={() => {
                  setSelectedCaseId(caseItem.id);
                  setActivePanel('notes');
                }}
                className="rounded-2xl border border-slate-200 bg-white/70 p-5 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-700">{caseItem.id}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950">{caseItem.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{caseItem.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">{caseItem.priority}</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{caseItem.status}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activePanel === 'notes' && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Selected case</span>
              <select
                value={selectedCaseId}
                onChange={(event) => setSelectedCaseId(event.target.value)}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {assignedCases.map((caseItem) => (
                  <option key={caseItem.id} value={caseItem.id}>{caseItem.id} - {caseItem.title}</option>
                ))}
              </select>
            </label>

            <form onSubmit={handleStatusSubmit} className="space-y-3">
              <label className="space-y-2 block">
                <span className="text-sm font-semibold text-slate-700">New note</span>
                <textarea
                  value={noteText}
                  onChange={(event) => setNoteText(event.target.value)}
                  className="min-h-28 w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Write investigation progress, evidence details, or follow-up instructions."
                  required
                />
              </label>
              <button type="submit" className="rounded-full bg-green-600 px-6 py-3 text-white shadow hover:bg-green-700">Save Note</button>
            </form>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold">Saved notes</h3>
              <div className="mt-3 grid gap-3">
                {assignedCases.find((caseItem) => caseItem.id === selectedCaseId)?.notes.map((note, index) => (
                  <p key={`${selectedCaseId}-${index}`} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700">{note}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePanel === 'upload' && (
          <div className="mt-6">
            <form onSubmit={handleFileUpload} className="grid gap-4 lg:grid-cols-[300px_1fr_auto] lg:items-end">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Attach to case</span>
                <select
                  value={selectedCaseId}
                  onChange={(event) => setSelectedCaseId(event.target.value)}
                  className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {assignedCases.map((caseItem) => (
                    <option key={caseItem.id} value={caseItem.id}>{caseItem.id}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Files</span>
                <input
                  name="evidenceFiles"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  className="w-full rounded-3xl border border-dashed border-slate-300 bg-white/70 px-4 py-3 text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
                  required
                />
              </label>
              <button type="submit" className="rounded-full bg-purple-600 px-6 py-3 text-white shadow hover:bg-purple-700">Attach Files</button>
            </form>

            <p className="mt-3 text-sm text-slate-600">Accepted: PDF, DOC, DOCX, PPT, PPTX.</p>
            {uploadMessage && <p className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">{uploadMessage}</p>}

            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Attached files</h3>
                <div className="mt-3 grid gap-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold text-slate-800">{file.name}</span>
                      <span className="text-slate-600">{file.caseId} · {file.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
