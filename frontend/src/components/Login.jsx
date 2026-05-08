import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Public User');

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: Call /api/auth/login
    console.log('Login:', { email, password, role });
  };

  return (
    <div className="tricolor-page galaxy-blue-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[2rem] border-4 border-white/80 bg-slate-900 text-white shadow-2xl">
        <img
          className="h-full w-full object-cover"
          src="/assets/login-secure-police-access.png"
          alt="Police officer assisting with secure station access"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/48 to-slate-950/12 p-10 flex flex-col justify-between">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-slate-300">Secure access</p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold">Connect with your station</h2>
            <p className="mt-4 max-w-xl text-slate-200">Login securely to manage cases, assign officers, or file complaints with real-time support.</p>
          </div>
          <div className="max-w-xl space-y-2 rounded-3xl border border-white/25 bg-slate-950/20 p-5 text-slate-200 shadow-lg backdrop-blur-[2px]">
            <p className="text-sm font-medium uppercase">Quick actions</p>
            <p className="text-sm">Public users can file complaints and monitor status.</p>
            <p className="text-sm">Officers can upload evidence and update investigations.</p>
          </div>
        </div>
      </div>

      <div className="tricolor-section p-8">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            >
              <option>Public User</option>
              <option>Police Officer</option>
              <option>Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-white shadow-lg transition hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
