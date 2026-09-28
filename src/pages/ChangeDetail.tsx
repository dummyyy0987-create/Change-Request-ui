import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldAlert, Sparkles, FileText, CheckCircle, AlertTriangle, Info, Play, MessageSquarePlus, Upload, History } from 'lucide-react';
import { Button } from '../components/common/Button';

export default function ChangeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for CHG0182004
  const isTarget = id === 'CHG0182004';
  const score = isTarget ? 61 : 85;
  const statusLabel = isTarget ? 'Needs Attention' : 'Ready for CAB';
  const statusColor = isTarget ? 'text-semantic-warning' : 'text-semantic-success';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-fade-in">
      <div 
        className="flex items-center gap-2 text-sm text-neutral-secondary mb-4 hover:text-neutral-primary cursor-pointer w-fit transition-colors"
        onClick={() => navigate('/changes')}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Queue
      </div>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-neutral-primary">{id || 'CHG0182004'}</h1>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded border border-amber-200 font-medium">Moderate Risk</span>
            <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-0.5 rounded border border-neutral-200 font-medium">Normal Change</span>
          </div>
          <p className="text-lg text-neutral-secondary">{isTarget ? 'Firewall rule update for vendor cutover' : 'Sample Change Description'}</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-white">
            <FileText className="w-4 h-4" />
            View in ServiceNow
          </Button>
          <Button className="gap-2 bg-theme-primary text-white">
            <Play className="w-4 h-4" />
            Run AI Assessment
          </Button>
        </div>
      </div>

      {/* Lifecycle */}
      <div className="bg-white px-6 py-5 rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center w-full">
          <LifecycleStep label="New" status="completed" />
          <LifecycleStep label="Assess" status="current" />
          <LifecycleStep label="Authorize" status="upcoming" />
          <LifecycleStep label="CAB" status="upcoming" />
          <LifecycleStep label="Scheduled" status="upcoming" />
          <LifecycleStep label="Completed" status="upcoming" isLast />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: AI Readiness & Findings */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-neutral-border flex flex-col items-center justify-center bg-gradient-to-b from-neutral-app/50 to-white relative">
              
              {/* Circular Score */}
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-neutral-border fill-none" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" className={`${isTarget ? 'stroke-amber-500' : 'stroke-semantic-success'} fill-none`} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * score) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-neutral-primary">{score}</span>
                  <span className="text-sm text-neutral-secondary">/ 100</span>
                </div>
              </div>
              
              <div className={`text-lg font-semibold ${statusColor} mb-1`}>{statusLabel}</div>
              <div className="text-sm text-neutral-secondary text-center">Review required before CAB</div>
              
              <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-muted bg-white px-3 py-1.5 rounded-full border border-neutral-border shadow-sm">
                <Clock className="w-3.5 h-3.5" /> AI assessment generated 2m ago
              </div>
            </div>

            <div className="p-6 md:w-2/3">
              <h3 className="font-semibold text-neutral-primary mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-theme-primary" /> Score Breakdown
              </h3>
              
              <div className="space-y-4">
                <ScoreFactor name="Completeness" score={72} weight="30%" desc="3 missing/weak fields" />
                <ScoreFactor name="W5H Quality" score={65} weight="20%" desc="Who/When details unclear" />
                <ScoreFactor name="Historical Analysis" score={90} weight="20%" desc="4 similar successful changes" />
                <ScoreFactor name="Risk Plausibility" score={68} weight="15%" desc="Risk matches precedent" />
                <ScoreFactor name="CAB Readiness" score={60} weight="15%" desc="Needs backout owner" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-neutral-primary mb-4 flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-semantic-warning" /> AI Findings
            </h3>
            
            <div className="space-y-4">
              <div className="border border-red-200 bg-red-50/30 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-semantic-danger"></div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider">High Priority</span>
                    <h4 className="font-medium text-neutral-primary text-base">Backout owner not identified</h4>
                  </div>
                </div>
                <p className="text-sm text-neutral-secondary mb-3">The backout plan does not specify the responsible operational owner in case of rollback.</p>
                <div className="bg-white border border-red-100 p-3 rounded text-sm text-neutral-primary">
                  <span className="font-semibold block mb-1">Recommended Action:</span>
                  Add an explicit backout owner or on-call contact to the Backout Plan section.
                </div>
              </div>

              <div className="border border-amber-200 bg-amber-50/30 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-semantic-warning"></div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider">Medium Priority</span>
                    <h4 className="font-medium text-neutral-primary text-base">Test plan requires additional verification</h4>
                  </div>
                </div>
                <p className="text-sm text-neutral-secondary mb-3">Add post-change verification steps for each firewall rule update to ensure connectivity.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-neutral-primary flex items-center gap-2 text-lg">
                <History className="w-5 h-5 text-theme-primary" /> Historical Precedents
              </h3>
              <span className="text-xs text-neutral-muted">Similar closed changes used as evidence</span>
            </div>
            
            <div className="space-y-3">
              <div className="border border-neutral-border rounded-lg p-4 hover:border-theme-primary transition-colors cursor-pointer bg-neutral-app/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-theme-primary">CHG0169542</span>
                    <span className="bg-theme-veryLight text-theme-dark text-xs px-2 py-0.5 rounded border border-theme-light font-medium">92% Similar</span>
                  </div>
                  <span className="text-xs text-neutral-muted">Closed 2 mos ago</span>
                </div>
                <p className="text-sm text-neutral-primary mb-3">Firewall rule update for vendor integration (AWS)</p>
                <div className="flex gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted">Outcome</span>
                    <span className="font-medium flex items-center gap-1 text-semantic-success"><CheckCircle className="w-3.5 h-3.5"/> Successful</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted">Incident Caused</span>
                    <span className="font-medium text-neutral-secondary">No</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted">Risk Level</span>
                    <span className="font-medium text-neutral-secondary">Moderate</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-neutral-border rounded-lg p-4 hover:border-theme-primary transition-colors cursor-pointer bg-neutral-app/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-theme-primary">CHG0158221</span>
                    <span className="bg-theme-veryLight text-theme-dark text-xs px-2 py-0.5 rounded border border-theme-light font-medium">85% Similar</span>
                  </div>
                  <span className="text-xs text-neutral-muted">Closed 4 mos ago</span>
                </div>
                <p className="text-sm text-neutral-primary mb-3">External firewall port opening for API gateway</p>
                <div className="flex gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted">Outcome</span>
                    <span className="font-medium flex items-center gap-1 text-semantic-warning"><AlertTriangle className="w-3.5 h-3.5"/> Successful with issues</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted">Incident Caused</span>
                    <span className="font-medium text-semantic-danger">Yes (INC09122)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* RIGHT COLUMN: Metadata & Workflow */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          
          <div className="bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow p-5">
            <h3 className="font-semibold text-neutral-primary mb-4 border-b border-neutral-border pb-2">Change Details</h3>
            <div className="space-y-3 text-sm">
              <DetailRow label="Assignment Group" value="Network Security" />
              <DetailRow label="Configuration Item" value="FW-CORE-01" />
              <DetailRow label="Service" value="External API Gateway" />
              <DetailRow label="Planned Start" value="Oct 12, 23:00 UTC" />
              <DetailRow label="Planned End" value="Oct 13, 02:00 UTC" />
              <DetailRow label="Created By" value="John Smith" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow p-5">
            <h3 className="font-semibold text-neutral-primary mb-4 border-b border-neutral-border pb-2">Risk Assessment</h3>
            
            <div className="flex items-center justify-between mb-3 bg-neutral-app p-3 rounded-lg border border-neutral-border">
              <div className="text-center flex-1">
                <div className="text-xs text-neutral-secondary mb-1">Declared Risk</div>
                <div className="font-semibold text-amber-600">Moderate</div>
              </div>
              <div className="w-px h-8 bg-neutral-border mx-2"></div>
              <div className="text-center flex-1">
                <div className="text-xs text-neutral-secondary mb-1">AI Assessment</div>
                <div className="font-semibold text-amber-600">Moderate</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-semantic-success bg-green-50 p-2 rounded border border-green-100">
              <CheckCircle className="w-4 h-4 shrink-0" /> Consistent risk evaluation
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow p-5">
            <h3 className="font-semibold text-neutral-primary mb-4 border-b border-neutral-border pb-2">Document Compliance</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-neutral-secondary flex items-center gap-2"><CheckCircle className="w-4 h-4 text-semantic-success"/> Stakeholder List</span>
                <span className="text-xs text-neutral-muted">Valid</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-secondary flex items-center gap-2"><CheckCircle className="w-4 h-4 text-semantic-success"/> Backout Plan</span>
                <span className="text-xs text-neutral-muted">Valid</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-secondary flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-semantic-warning"/> Test Summary Report</span>
                <span className="text-xs text-semantic-warning font-medium">Missing section</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-secondary flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-semantic-danger"/> Implementation Plan</span>
                <span className="text-xs text-semantic-danger font-medium">Missing</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 text-xs h-8">View Document Validation</Button>
          </div>

          <div className="bg-gradient-to-br from-theme-veryLight to-white rounded-2xl border border-theme-light shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
            <div className="absolute inset-0 bg-theme-primary/5"></div>
            <div className="relative p-4 border-b border-theme-light flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-theme-primary" />
              <h3 className="font-semibold text-theme-dark">AI Recommendation</h3>
            </div>
            <div className="relative p-4">
              <div className="bg-white p-3 rounded border border-theme-light text-sm text-neutral-secondary font-mono leading-relaxed mb-4 whitespace-pre-wrap">
{`AI Change Quality Assessment
Readiness Score: 61/100
Status: Needs Attention

Key gaps:
• Backout owner not identified
• Test plan missing rollback verification

Historical evidence:
4 similar firewall changes completed successfully. Implementation risk matches historical precedent.`}
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-theme-primary hover:bg-theme-dark text-white gap-2">
                  <MessageSquarePlus className="w-4 h-4" /> Copy to Work Notes
                </Button>
                <Button variant="outline" className="w-full gap-2 border-theme-light text-theme-dark bg-white hover:bg-theme-light/30">
                  <Upload className="w-4 h-4" /> Write to ServiceNow
                </Button>
              </div>
              <p className="text-xs text-center text-neutral-muted mt-3 italic flex justify-center items-center gap-1">
                <Info className="w-3 h-3" /> AI assessment is advisory only.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function LifecycleStep({ label, status, isLast }: { label: string, status: 'completed' | 'current' | 'upcoming', isLast?: boolean }) {
  const colorClass = status === 'completed' ? 'text-theme-primary' : status === 'current' ? 'text-neutral-primary' : 'text-neutral-muted';
  const circleClass = status === 'completed'
    ? 'border-theme-primary text-theme-primary bg-theme-veryLight'
    : status === 'current'
    ? 'border-theme-primary text-theme-primary bg-white ring-4 ring-theme-light'
    : 'border-neutral-border text-neutral-muted bg-white';

  return (
    <div className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
      <div className={`flex flex-col items-center gap-1.5 ${colorClass}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${circleClass}`}>
          {status === 'completed'
            ? <CheckCircle className="w-4 h-4" />
            : <span className="text-xs font-bold">{label.charAt(0)}</span>
          }
        </div>
        <span className="text-xs font-semibold whitespace-nowrap">{label}</span>
      </div>
      {!isLast && (
        <div className={`flex-1 h-0.5 mx-3 mb-5 ${status === 'completed' ? 'bg-theme-primary' : 'bg-neutral-border'}`}></div>
      )}
    </div>
  );
}

function ScoreFactor({ name, score, weight, desc }: { name: string, score: number, weight: string, desc: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-primary">{name}</span>
          <span className="text-xs text-neutral-muted bg-neutral-app px-1.5 rounded">{weight}</span>
        </div>
        <span className="text-sm font-semibold">{score}%</span>
      </div>
      <div className="w-full h-2 bg-neutral-app rounded-full overflow-hidden mb-1">
        <div className={`h-full rounded-full ${score > 80 ? 'bg-semantic-success' : score > 60 ? 'bg-amber-500' : 'bg-semantic-danger'}`} style={{ width: `${score}%` }}></div>
      </div>
      <div className="text-xs text-neutral-secondary">{desc}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-neutral-app last:border-0">
      <span className="text-neutral-secondary">{label}</span>
      <span className="font-medium text-neutral-primary text-right">{value}</span>
    </div>
  );
}
