import { useStore } from '../store';
import {
  LayoutDashboard,
  BookOpen,
  ArrowLeftRight,
  Archive,
  Shield,
  FileText,
  Menu,
  X,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'registry', label: 'Registry Log', icon: BookOpen },
  { id: 'movement', label: 'File Movement', icon: ArrowLeftRight },
  { id: 'retention', label: 'Retention & Lifecycle', icon: Archive },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-corporate-900 text-white">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-corporate-800">
          <Shield className="w-7 h-7 text-corporate-300" />
          <div>
            <h1 className="text-sm font-bold tracking-wide leading-tight">EDRMS</h1>
            <p className="text-[10px] text-corporate-300 leading-tight">Government Registry System</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-corporate-700 text-white shadow-sm'
                    : 'text-corporate-200 hover:bg-corporate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        {/* User Info */}
        <div className="px-4 py-3 mx-3 mb-3 bg-corporate-800 rounded-lg border border-corporate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-corporate-600 flex items-center justify-center flex-shrink-0">
              <UserCircle className="w-5 h-5 text-corporate-200" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Atim Cynthia Berocan</p>
              <p className="text-[10px] text-corporate-400 truncate">System Developer</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-corporate-800 text-[10px] text-corporate-500">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-3 h-3" />
            <span className="font-medium text-corporate-400">Ministry of Finance</span>
          </div>
          <p className="leading-relaxed">Developed by Atim Cynthia Berocan</p>
          <p>UICT Registry Project &copy; 2026</p>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 h-14 bg-corporate-900 text-white flex items-center justify-between px-4 z-50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-corporate-300" />
            <span className="text-sm font-bold">EDRMS</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-corporate-300">
              <UserCircle className="w-4 h-4" />
              <span>Atim Cynthia Berocan</span>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 top-14 bg-corporate-900 text-white z-40 p-4 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-corporate-700 text-white' : 'text-corporate-200 hover:bg-corporate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
