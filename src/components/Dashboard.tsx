import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  FileText,
  ArrowRightLeft,
  Archive,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function Dashboard() {
  const { documents, movements, alerts, monthlyStats } = useStore();

  const activeDocs = documents.filter(d => d.status === 'Active').length;
  const inTransit = movements.filter(m => m.status === 'Out').length;
  const dueForArchiving = documents.filter(d => {
    const logged = new Date(d.dateLogged);
    const years = (Date.now() - logged.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return d.status === 'Active' && years >= d.retentionYears;
  }).length;
  const criticalPending = documents.filter(d => d.status === 'Pending').length;

  const stats = [
    { label: 'Total Active Documents', value: activeDocs, icon: FileText, color: 'bg-corporate-50 text-corporate-700 border-corporate-200' },
    { label: 'Files In Transit', value: inTransit, icon: ArrowRightLeft, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Due for Archiving', value: dueForArchiving, icon: Archive, color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { label: 'Critical Pending', value: criticalPending, icon: AlertTriangle, color: 'bg-red-50 text-red-700 border-red-200' },
  ];

  const alertIcon = (type: string) => {
    if (type === 'critical') return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (type === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <Info className="w-4 h-4 text-corporate-500" />;
  };

  const alertBorder = (type: string) => {
    if (type === 'critical') return 'border-l-4 border-l-red-500';
    if (type === 'warning') return 'border-l-4 border-l-amber-500';
    return 'border-l-4 border-l-corporate-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">Overview of the Electronic Document Registry Management System</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <Clock className="w-3 h-3" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${stat.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color.split(' ')[0]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm font-medium mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Document Influx Trends</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-corporate-500" /> Incoming
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-slate-400" /> Outgoing
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="incoming" name="Incoming" fill="#2b5af0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outgoing" name="Outgoing" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-slate-900">Registry Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`bg-slate-50 rounded-lg p-3 ${alertBorder(alert.type)}`}>
                <div className="flex items-start gap-2">
                  {alertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 leading-snug">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">{alert.documentRef}</span>
                      <span className="text-xs text-slate-400">{alert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-corporate-50 rounded-lg">
            <FileText className="w-5 h-5 text-corporate-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Documents</p>
            <p className="text-xl font-bold text-slate-900">{documents.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-lg">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Active Movements</p>
            <p className="text-xl font-bold text-slate-900">{movements.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg">
            <Archive className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Archived Documents</p>
            <p className="text-xl font-bold text-slate-900">{documents.filter(d => d.status === 'Archived').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
