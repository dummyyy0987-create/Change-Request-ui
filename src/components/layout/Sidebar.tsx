import { LayoutDashboard, ListChecks, FileText, ShieldAlert, Sparkles, Files, History, BookOpen, ClipboardCheck, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navGroups = [
  {
    title: "Overview",
    items: [{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" }]
  },
  {
    title: "Change Management",
    items: [
      { icon: ListChecks, label: "Change Queue", path: "/changes" },
      { icon: FileText, label: "My Changes", path: "/my-changes" },
      { icon: ShieldAlert, label: "CAB Queue", path: "/cab" },
    ]
  },
  {
    title: "AI Assessment",
    items: [
      { icon: Sparkles, label: "AI Readiness", path: "/ai-readiness" },
      { icon: Files, label: "Document Compliance", path: "/documents" },
      { icon: History, label: "Historical Precedents", path: "/history" },
    ]
  },
  {
    title: "Knowledge",
    items: [
      { icon: BookOpen, label: "Knowledge Base", path: "/knowledge" },
    ]
  },
  {
    title: "Administration",
    items: [
      { icon: ClipboardCheck, label: "Audit History", path: "/audit" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ]
  }
];

export default function Sidebar() {
  return (
    <div className="w-[250px] bg-theme-dark text-neutral-app flex flex-col h-full shrink-0 shadow-lg relative z-20">
      <div className="p-5 flex items-center gap-3 border-b border-white/10 shrink-0">
        <div className="bg-theme-emerald p-1.5 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-semibold text-white tracking-tight leading-tight">AI Change Management</h1>
          <p className="text-xs text-white/70">AI-powered readiness</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 px-3">{group.title}</h2>
            <ul className="space-y-1">
              {group.items.map((item, iIdx) => (
                <li key={iIdx}>
                  <NavLink 
                    to={item.path}
                    className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-theme-primary text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
