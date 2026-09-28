import { CheckCircle, AlertTriangle, ShieldAlert, FileText, Search, Filter } from 'lucide-react';
import { Button } from '../components/common/Button';

const docs = [
  { id: 'DOC-001', name: 'Stakeholder List', type: 'Mandatory', status: 'Valid', change: 'CHG0182004', updated: '2h ago' },
  { id: 'DOC-002', name: 'Backout Plan', type: 'Mandatory', status: 'Valid', change: 'CHG0182004', updated: '2h ago' },
  { id: 'DOC-003', name: 'Test Summary Report', type: 'Mandatory', status: 'Missing Section', change: 'CHG0182004', updated: '2h ago' },
  { id: 'DOC-004', name: 'Implementation Plan', type: 'Mandatory', status: 'Missing', change: 'CHG0182004', updated: '-' },
  { id: 'DOC-005', name: 'Security Review', type: 'Conditional', status: 'Valid', change: 'CHG0181992', updated: '1d ago' },
];

export default function DocumentCompliance() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-primary">Document Compliance</h1>
          <p className="text-sm text-neutral-secondary mt-1">Verify mandatory supporting templates and their structural completeness.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DocStatCard title="Required Documents" value="48" />
        <DocStatCard title="Documents Received" value="42" />
        <DocStatCard title="Structurally Valid" value="38" highlight="text-semantic-success" />
        <DocStatCard title="Validation Issues" value="4" highlight="text-semantic-warning" />
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-neutral-border flex justify-between gap-4 bg-neutral-app">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" />
            <input 
              type="text"
              placeholder="Search documents or changes..."
              className="pl-9 pr-4 py-2 w-full bg-white border border-neutral-border rounded-md text-sm focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Document List */}
          <div className="md:w-1/3 border-r border-neutral-border overflow-y-auto">
            {docs.map(doc => (
              <div key={doc.id} className={`p-4 border-b border-neutral-border hover:bg-neutral-hover cursor-pointer transition-colors ${doc.id === 'DOC-003' ? 'bg-theme-veryLight border-l-4 border-l-theme-primary' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm text-neutral-primary">{doc.name}</span>
                  {doc.status === 'Valid' ? <CheckCircle className="w-4 h-4 text-semantic-success" /> :
                   doc.status === 'Missing Section' ? <AlertTriangle className="w-4 h-4 text-semantic-warning" /> :
                   <ShieldAlert className="w-4 h-4 text-semantic-danger" />}
                </div>
                <div className="flex justify-between text-xs text-neutral-muted">
                  <span>{doc.change}</span>
                  <span>{doc.updated}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Document Viewer Panel */}
          <div className="md:w-2/3 bg-neutral-app p-6 flex flex-col">
            <div className="bg-white border border-neutral-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-neutral-border flex justify-between items-center bg-neutral-app/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-primary">Test Summary Report</h3>
                    <p className="text-xs text-neutral-secondary">Uploaded for CHG0182004 • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white">Download</Button>
                  <Button variant="outline" size="sm" className="bg-white text-theme-primary border-theme-light">Run Validation</Button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Preview */}
                <div className="flex-1 p-6 overflow-y-auto font-serif text-sm leading-relaxed border-r border-neutral-border bg-white text-neutral-secondary">
                  <h1 className="text-xl font-bold text-black mb-4">Test Summary Report</h1>
                  
                  <h2 className="text-lg font-bold text-black mt-6 mb-2">1. Overview</h2>
                  <p className="mb-4">This document details the test results for the firewall vendor cutover. Testing was conducted on Oct 11, focusing on egress traffic.</p>
                  
                  <h2 className="text-lg font-bold text-black mt-6 mb-2">2. Test Environments</h2>
                  <p className="mb-4">UAT and Staging environments were utilized. All internal connections behaved as expected.</p>
                  
                  <h2 className="text-lg font-bold text-black mt-6 mb-2">3. Results</h2>
                  <p className="mb-4">15/15 test cases passed.</p>
                  
                  {/* Missing Rollback section simulation */}
                </div>
                
                {/* AI Validation Panel */}
                <div className="w-72 bg-neutral-app overflow-y-auto p-4 shrink-0">
                  <h4 className="text-sm font-semibold text-neutral-primary mb-3">AI Validation Panel</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-neutral-secondary uppercase tracking-wider mb-2">Detected Sections</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" /> <span>Overview</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" /> <span>Test Environments</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" /> <span>Results</span></li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-neutral-border">
                      <div className="text-xs font-semibold text-neutral-secondary uppercase tracking-wider mb-2">Missing Required Sections</div>
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <div className="flex items-start gap-2 text-sm text-red-800 font-medium mb-1">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-semantic-danger" /> 
                          <span>Rollback Verification</span>
                        </div>
                        <p className="text-xs text-red-700">The template requires a specific section outlining tests to run after a rollback.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function DocStatCard({ title, value, highlight }: { title: string, value: string, highlight?: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-neutral-border shadow-sm">
      <div className="text-sm font-medium text-neutral-secondary mb-1">{title}</div>
      <div className={`text-2xl font-semibold ${highlight || 'text-neutral-primary'}`}>{value}</div>
    </div>
  );
}
