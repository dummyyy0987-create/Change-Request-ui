import { Search, Filter, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Eye, Play } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const mockChanges = [
  { id: 'CHG0182004', desc: 'Firewall rule update for vendor cutover', type: 'Normal', risk: 'Moderate', aiScore: 61, status: 'Needs Attention', topGap: 'Backout owner not identified', state: 'Assess', date: '10m ago' },
  { id: 'CHG0182031', desc: 'Core switch firmware upgrade - EMEA', type: 'Normal', risk: 'High', aiScore: 42, status: 'Not Ready', topGap: 'Missing test summary report', state: 'New', date: '1h ago' },
  { id: 'CHG0181992', desc: 'Database index optimization for Orders API', type: 'Standard', risk: 'Low', aiScore: 92, status: 'Ready for CAB', topGap: 'None', state: 'CAB', date: '2h ago' },
  { id: 'CHG0182055', desc: 'Active Directory sync service account update', type: 'Normal', risk: 'Moderate', aiScore: 78, status: 'Minor Improvements', topGap: 'Implementation steps lack detail', state: 'Authorize', date: '4h ago' },
  { id: 'CHG0182101', desc: 'Load balancer certificate renewal', type: 'Standard', risk: 'Low', aiScore: 95, status: 'Ready for CAB', topGap: 'None', state: 'CAB', date: '5h ago' },
];

export default function ChangeQueue() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-primary">Change Queue</h1>
          <p className="text-sm text-neutral-secondary mt-1">Manage and assess active change requests.</p>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="flex gap-6 p-4 bg-white rounded-lg border border-neutral-border shadow-sm text-sm">
        <div className="flex gap-2 items-center"><span className="font-semibold text-neutral-primary">128</span> <span className="text-neutral-secondary">Active Changes</span></div>
        <div className="w-px h-5 bg-neutral-border"></div>
        <div className="flex gap-2 items-center"><span className="font-semibold text-semantic-success">74</span> <span className="text-neutral-secondary">Ready</span></div>
        <div className="w-px h-5 bg-neutral-border"></div>
        <div className="flex gap-2 items-center"><span className="font-semibold text-semantic-warning">31</span> <span className="text-neutral-secondary">Attention</span></div>
        <div className="w-px h-5 bg-neutral-border"></div>
        <div className="flex gap-2 items-center"><span className="font-semibold text-semantic-danger">12</span> <span className="text-neutral-secondary">High Risk</span></div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" />
            <input 
              type="text"
              placeholder="Search Change Number or Description..."
              className="pl-9 pr-4 py-2 w-full bg-white border border-neutral-border rounded-md text-sm focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-white">
            <Filter className="w-4 h-4" /> State
          </Button>
          <Button variant="outline" className="gap-2 bg-white">
            <Filter className="w-4 h-4" /> Risk
          </Button>
          <Button variant="outline" className="gap-2 bg-white text-neutral-muted">
            <SlidersHorizontal className="w-4 h-4" /> More Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-app text-neutral-secondary border-b border-neutral-border">
              <tr>
                <th className="px-5 py-3 font-medium"><div className="flex items-center gap-1 cursor-pointer hover:text-neutral-primary">Change Number <ArrowUpDown className="w-3 h-3"/></div></th>
                <th className="px-5 py-3 font-medium w-full min-w-[250px]">Short Description</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">AI Score</th>
                <th className="px-5 py-3 font-medium">Readiness</th>
                <th className="px-5 py-3 font-medium">Top Gap</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {mockChanges.map((change) => (
                <tr key={change.id} className="hover:bg-neutral-hover transition-colors group">
                  <td className="px-5 py-4 font-medium text-theme-primary cursor-pointer" onClick={() => navigate(`/changes/${change.id}`)}>{change.id}</td>
                  <td className="px-5 py-4 whitespace-normal"><div className="line-clamp-1">{change.desc}</div></td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${change.risk === 'High' ? 'bg-red-100 text-red-800' : change.risk === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                      {change.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">{change.aiScore}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${change.status === 'Ready for CAB' ? 'bg-semantic-success' : change.status === 'Minor Improvements' ? 'bg-emerald-500' : change.status === 'Needs Attention' ? 'bg-semantic-warning' : 'bg-semantic-danger'}`}></div>
                      {change.status}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-neutral-muted max-w-[200px] truncate">{change.topGap}</td>
                  <td className="px-5 py-4 text-neutral-secondary">{change.state}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/changes/${change.id}`)} title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-theme-primary hover:text-theme-dark" title="Run Assessment">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-5 py-3 border-t border-neutral-border flex items-center justify-between text-sm text-neutral-secondary bg-neutral-app">
          <div>Showing 1 to 5 of 128 entries</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0" disabled><ChevronLeft className="w-4 h-4"/></Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-theme-primary text-white border-theme-primary hover:bg-theme-primary">1</Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white">2</Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white">3</Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white">26</Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white"><ChevronRight className="w-4 h-4"/></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
