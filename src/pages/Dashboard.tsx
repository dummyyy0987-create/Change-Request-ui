import { RefreshCw, ListChecks, Activity, ShieldAlert, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const trendData = [
  { name: 'Mon', score: 65, avg: 72 },
  { name: 'Tue', score: 68, avg: 72 },
  { name: 'Wed', score: 74, avg: 72 },
  { name: 'Thu', score: 71, avg: 72 },
  { name: 'Fri', score: 78, avg: 72 },
  { name: 'Sat', score: 82, avg: 72 },
  { name: 'Sun', score: 85, avg: 72 },
];

const pipelineData = [
  { name: 'New', value: 12, color: '#9CA3AF' },
  { name: 'Assess', value: 45, color: '#3B82F6' },
  { name: 'CAB', value: 28, color: '#D97706' },
  { name: 'Scheduled', value: 15, color: '#16A34A' },
];

const priorityChanges = [
  { id: 'CHG0182004', desc: 'Firewall rule update for vendor cutover', risk: 'Moderate', score: 61, status: 'Needs Attention' },
  { id: 'CHG0182031', desc: 'Core switch firmware upgrade - EMEA', risk: 'High', score: 42, status: 'Not Ready' },
  { id: 'CHG0182055', desc: 'AD sync service account update', risk: 'Moderate', score: 78, status: 'Minor Improvements' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-fade-in pb-12">
      <div className="flex justify-between items-end animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-primary tracking-tight">Change Management Overview</h1>
          <p className="text-sm text-neutral-secondary mt-1">Monitor change readiness, AI assessments, risks, and CAB workload.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2 shadow-sm" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </Button>
          <Button variant="outline" size="sm" className="gap-2 shadow-sm" onClick={() => navigate('/changes')}>
            <ListChecks className="w-4 h-4" /> View Change Queue
          </Button>
          <Button size="sm" className="gap-2 bg-theme-primary text-white shadow-sm hover:shadow-md transition-shadow" onClick={() => navigate('/cab')}>
            <ShieldAlert className="w-4 h-4" /> Open CAB Queue
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <KpiCard title="Active Changes" value="128" subtext="+8 this week" icon={<Activity className="w-5 h-5" />} trend="up" />
        <KpiCard title="AI Assessed" value="116" subtext="91% coverage" icon={<SparklesIcon className="w-5 h-5" />} trend="up" />
        <KpiCard title="Ready for CAB" value="74" subtext="57.8% of active" icon={<CheckCircle className="w-5 h-5 text-semantic-success" />} trend="up" />
        <KpiCard title="Needs Attention" value="31" subtext="12 high-risk" icon={<ShieldAlert className="w-5 h-5 text-semantic-warning" />} trend="down" />
        <KpiCard title="Coverage Trend" value="94%" subtext="Last 7 days" icon={<Clock className="w-5 h-5" />} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="bg-white p-5 rounded-2xl border border-neutral-border shadow-sm lg:col-span-2 min-h-[350px] flex flex-col hover-lift">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-neutral-primary text-lg">Change Readiness Trend</h3>
            <select className="text-xs border border-neutral-border rounded p-1 text-neutral-secondary bg-neutral-app focus:outline-none focus:border-theme-primary">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7A8780' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7A8780' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="score" name="Avg Score" stroke="#16A34A" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="avg" name="Target Baseline" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-neutral-border shadow-sm min-h-[350px] flex flex-col hover-lift">
          <h3 className="font-semibold text-neutral-primary text-lg mb-2">Change Pipeline</h3>
          <p className="text-xs text-neutral-secondary mb-4">Distribution of active changes by state</p>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-neutral-border shadow-sm overflow-hidden animate-slide-up hover-lift" style={{ animationDelay: '0.4s' }}>
        <div className="px-6 py-5 border-b border-neutral-border flex justify-between items-center bg-neutral-app/50">
          <div>
            <h3 className="font-semibold text-neutral-primary text-lg">Changes Requiring Attention</h3>
            <p className="text-xs text-neutral-secondary mt-1">High risk or low readiness scores</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs bg-white" onClick={() => navigate('/changes')}>View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-neutral-secondary border-b border-neutral-border text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Change Number</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Risk</th>
                <th className="px-6 py-4 font-semibold">AI Score</th>
                <th className="px-6 py-4 font-semibold">Readiness Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {priorityChanges.map((change) => (
                <tr key={change.id} className="hover:bg-neutral-app transition-colors group cursor-pointer" onClick={() => navigate(`/changes/${change.id}`)}>
                  <td className="px-6 py-4 font-semibold text-theme-primary">{change.id}</td>
                  <td className="px-6 py-4 text-neutral-primary">{change.desc}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${change.risk === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {change.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-primary">{change.score}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${change.status === 'Needs Attention' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : change.status === 'Not Ready' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'}`}></div>
                      <span className="font-medium text-neutral-secondary group-hover:text-neutral-primary transition-colors">{change.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subtext, icon, trend }: { title: string, value: string, subtext: string, icon: React.ReactNode, trend?: 'up'|'down' }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow flex flex-col group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-theme-primary to-theme-emerald opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-neutral-secondary tracking-wide uppercase">{title}</span>
        <div className="p-2 bg-neutral-app rounded-xl text-theme-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <div className="text-3xl font-bold text-neutral-primary tracking-tight">{value}</div>
      </div>
      <div className="flex items-center gap-1.5 mt-auto">
        {trend && (
          <TrendingUp className={`w-3.5 h-3.5 ${trend === 'up' ? 'text-semantic-success' : 'text-semantic-danger transform rotate-180'}`} />
        )}
        <div className="text-xs font-medium text-neutral-muted">{subtext}</div>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
