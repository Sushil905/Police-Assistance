import { useEffect, useState } from 'react';
import axios from 'axios';

const NEWS_API_BASE = import.meta.env.VITE_API_URL || '/api';

const newsData = {
  maharashtra: [
    {
      title: 'Maharashtra Police Launches Safety Awareness Drive',
      desc: 'Police teams are conducting awareness programs about cyber safety, women safety, and emergency response.',
      date: 'Today',
    },
    {
      title: 'Traffic Police Issues Road Safety Guidelines',
      desc: 'Citizens are advised to follow helmet rules, speed limits, and avoid mobile phone usage while driving.',
      date: 'Today',
    },
    {
      title: 'Cyber Crime Cell Warns Against Online Fraud',
      desc: 'People are requested not to share OTP, bank details, or personal information with unknown callers.',
      date: 'Yesterday',
    },
  ],
  india: [
    {
      title: 'National Emergency Helpline 112 Awareness',
      desc: 'Citizens across India can use 112 for police, fire, and medical emergency support.',
      date: 'Today',
    },
    {
      title: 'Digital Complaint Systems Expanding Across India',
      desc: 'Many states are improving online complaint and public safety platforms.',
      date: 'Yesterday',
    },
    {
      title: 'Cyber Safety Campaign for Students',
      desc: 'Awareness programs are being promoted to educate students about cyberbullying and fraud.',
      date: 'This Week',
    },
  ],
  world: [
    {
      title: 'Global Police Agencies Focus on Cyber Crime',
      desc: 'Law enforcement agencies worldwide are increasing efforts against online scams and data theft.',
      date: 'Today',
    },
    {
      title: 'Smart Policing Technology Gaining Popularity',
      desc: 'AI, analytics, and emergency response dashboards are being used in public safety systems.',
      date: 'This Week',
    },
    {
      title: 'Community Policing Improves Public Trust',
      desc: 'Police departments worldwide are encouraging better communication with citizens.',
      date: 'This Month',
    },
  ],
};

const tabs = [
  { id: 'maharashtra', label: 'Maharashtra' },
  { id: 'india', label: 'India' },
  { id: 'world', label: 'Worldwide' },
];

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState('maharashtra');
  const [newsByTab, setNewsByTab] = useState(newsData);
  const [loading, setLoading] = useState(false);
  const [liveError, setLiveError] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setLiveError('');

      try {
        const response = await axios.get(`${NEWS_API_BASE}/news/${activeTab}`);

        const articles = Array.isArray(response.data) ? response.data : [];
        const liveNews = articles
          .filter((article) => article.title && article.description)
          .slice(0, 3)
          .map((article) => ({
            title: article.title,
            desc: article.description,
            date: article.publishedAt
              ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(article.publishedAt))
              : 'Latest',
            url: article.url,
          }));

        if (liveNews.length > 0) {
          setNewsByTab((current) => ({
            ...current,
            [activeTab]: liveNews,
          }));
        }
      } catch (error) {
        console.error('Unable to load live news', error);
        setLiveError('Showing saved updates because live news is unavailable right now.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [activeTab]);

  return (
    <section className="tricolor-section">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">News & Updates</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">Public safety updates</h2>
          <p className="mt-2 text-sm text-slate-600">
            {loading ? 'Loading live news...' : liveError || 'Live updates for safety, policing, and public awareness.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {newsByTab[activeTab].map((news) => (
          <article key={news.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="mb-2 text-sm font-semibold text-blue-600">{news.date}</p>
            <h3 className="text-lg font-semibold text-slate-950">{news.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{news.desc}</p>
            <a
              href={news.url || '#'}
              target={news.url ? '_blank' : undefined}
              rel={news.url ? 'noreferrer' : undefined}
              className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Read More
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
