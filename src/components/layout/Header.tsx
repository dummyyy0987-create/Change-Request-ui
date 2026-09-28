import { Search, Bell, HelpCircle, UserCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPath = pathParts.length > 0 ? pathParts[0] : 'dashboard';
  const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <header className="bg-white border-b border-neutral-border h-16 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-sm text-neutral-muted">
          Dashboard / <span className="text-neutral-primary font-medium">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" />
          <input 
            type="text"
            placeholder="Search changes, documents..."
            className="pl-9 pr-4 py-1.5 bg-neutral-app border border-neutral-border rounded-md text-sm focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary w-64 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 text-neutral-secondary">
          <button className="hover:text-theme-primary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-semantic-danger rounded-full ring-2 ring-white"></span>
          </button>
          <button className="hover:text-theme-primary transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="w-px h-6 bg-neutral-border"></div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-secondary">
            <div className="w-2 h-2 rounded-full bg-semantic-success"></div>
            Connected to ServiceNow
          </div>
          
          <button className="flex items-center gap-2 hover:bg-neutral-hover py-1 px-2 rounded-md transition-colors">
            <UserCircle className="w-8 h-8 text-neutral-muted" />
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium text-neutral-primary leading-none">Sarah Chen</div>
              <div className="text-xs text-neutral-muted mt-1">Change Manager</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
