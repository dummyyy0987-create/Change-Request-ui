import { useNavigate } from 'react-router-dom';
import { Filter, Scale, Eye, Play, CheckCircle, ShieldAlert, ArrowUpCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

const cabChanges = [
  { id: 'CHG0181992', desc: 'Database index optimization for Orders API', type: 'Normal', priority: 'High', aiScore: 92, risk: 'Low', cabReadiness: 'Ready', topGap: 'None', state: 'CAB', date: '2h ago', history: '4 similar successful' },
  { id: 'CHG0182101', desc: 'Load balancer certificate renewal', type: 'Normal', priority: 'Medium', aiScore: 95, risk: 'Low', cabReadiness: 'Ready', topGap: 'None', state: 'CAB', date: '5h ago', history: '2 similar successful' },
  { id: 'CHG0182055', desc: 'Active Directory sync service account update', type: 'Normal', priority: 'Medium', aiScore: 78, risk: 'Moderate', cabReadiness: 'Needs Review', topGap: 'Implementation steps lack detail', state: 'CAB', date: '4h ago', history: '1 similar incident' },
  { id: 'CHG0182004', desc: 'Firewall rule update for vendor cutover', type: 'Normal', priority: 'High', aiScore: 61, risk: 'Moderate', cabReadiness: 'Needs Attention', topGap: 'Backout owner not identified', state: 'CAB', date: '1d ago', history: '4 similar successful' },
];

export default function CabQueue() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-primary flex items-center gap-2">
            CAB Decision Support
          </h1>
          <p className="text-sm text-neutral-secondary mt-1">Prioritize changes using AI-generated readiness and risk evidence.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-white">
          <Filter className="w-4 h-4" /> Filter Agenda
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-app text-neutral-secondary border-b border-neutral-border">
              <tr>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Change</th>
                <th className="px-5 py-3 font-medium text-center">AI Score</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Historical Evidence</th>
                <th className="px-5 py-3 font-medium">Top Gap</th>
                <th className="px-5 py-3 font-medium">CAB Readiness</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {cabChanges.map((change) => (
                <tr key={change.id} className="hover:bg-neutral-hover transition-colors group">
                  <td className="px-5 py-4">
                    {change.priority === 'High' ? (
                      <ArrowUpCircle className="w-5 h-5 text-semantic-danger" />
                    ) : (
                      <div className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center text-[10px] text-neutral-600 font-bold">M</div>
                    )}
                  </td>
                  <td className="px-5 py-4 cursor-pointer" onClick={() => navigate(`/changes/${change.id}`)}>
                    <div className="font-medium text-theme-primary mb-0.5">{change.id}</div>
                    <div className="text-neutral-secondary text-xs truncate max-w-[250px]">{change.desc}</div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${change.aiScore >= 90 ? 'bg-semantic-success/10 text-semantic-success' : change.aiScore >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      {change.aiScore}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${change.risk === 'High' ? 'bg-red-100 text-red-800' : change.risk === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                      {change.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-neutral-muted text-xs flex items-center gap-1">
                    {change.history.includes('incident') ? <ShieldAlert className="w-3.5 h-3.5 text-semantic-warning" /> : <CheckCircle className="w-3.5 h-3.5 text-semantic-success" />}
                    {change.history}
                  </td>
                  <td className="px-5 py-4 text-neutral-secondary max-w-[200px] truncate text-xs">{change.topGap}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <div className={`w-2 h-2 rounded-full ${change.cabReadiness === 'Ready' ? 'bg-semantic-success' : change.cabReadiness === 'Needs Review' ? 'bg-amber-500' : 'bg-semantic-danger'}`}></div>
                      {change.cabReadiness}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white text-theme-primary border-theme-light hover:bg-theme-veryLight" onClick={() => navigate(`/changes/${change.id}`)}>
                      <Scale className="w-3 h-3 mr-1.5" /> Review Evidence
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-end p-4 border border-theme-light bg-theme-veryLight rounded-lg">
         <p className="text-sm text-theme-dark font-medium flex items-center gap-2">
           <Scale className="w-4 h-4" /> AI assessment is advisory. Final authorization remains with the Change Manager/CAB.
         </p>
      </div>
    </div>
  );
}
