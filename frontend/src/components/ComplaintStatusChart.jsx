import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Pending', 'Investigating', 'Solved', 'Closed'],
  datasets: [
    {
      label: 'Case Status',
      data: [14, 22, 18, 8],
      backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#64748b'],
      borderWidth: 0,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

export default function ComplaintStatusChart({ compact = false }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-slate-50 ${compact ? 'p-4' : 'p-6'}`}>
      <h3 className={`${compact ? 'mb-3 text-base' : 'mb-4 text-lg'} font-medium`}>Solved vs Pending Cases</h3>
      <div className={compact ? 'mx-auto h-48 max-w-48' : 'h-80'}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
