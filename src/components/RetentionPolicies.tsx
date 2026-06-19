import { useState } from 'react';
import { useStore } from '../store';
import { retentionRules } from '../data';
import {
  Archive,
  Clock,
  Shield,
  FileText,
  Trash2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Layers,
} from 'lucide-react';

export default function RetentionPolicies() {
  const { documents, archiveDocument, archiveBulk } = useStore();
  const [view, setView] = useState<'eligible' | 'vault'>('eligible');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDone, setBulkDone] = useState(false);

  const eligible = documents.filter(d => {
    const logged = new Date(d.dateLogged);
    const years = (Date.now() - logged.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return d.status === 'Active' && years >= d.retentionYears;
  });

  const archived = documents.filter(d => d.status === 'Archived');

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === eligible.length) setSelectedIds([]);
    else setSelectedIds(eligible.map(e => e.id));
  };

  const handleBulkArchive = () => {
    if (selectedIds.length === 0) return;
    archiveBulk(selectedIds);
    setSelectedIds([]);
    setBulkDone(true);
    setTimeout(() => setBulkDone(false), 3000);
  };

  const actionIcon = (action: string) => {
    if (action === 'Archive') return <Archive className="w-3.5 h-3.5" />;
    if (action === 'Destroy') return <Trash2 className="w-3.5 h-3.5" />;
    return <RotateCcw className="w-3.5 h-3.5" />;
  };

  const actionColor = (action: string) => {
    if (action === 'Archive') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (action === 'Destroy') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Retention & Lifecycle Policies</h2>
        <p className="text-sm text-slate-500 mt-1">Manage document retention schedules and lifecycle compliance</p>
      </div>

      {/* Rules Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-corporate-50 rounded-lg">
            <Shield className="w-5 h-5 text-corporate-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Retention Schedule Rules</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {retentionRules.map(rule => (
            <div key={rule.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-800">{rule.category}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium ${actionColor(rule.actionAfterRetention)}`}>
                  {actionIcon(rule.actionAfterRetention)} {rule.actionAfterRetention}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">{rule.retentionYears} years</span>
                <span className="text-slate-400">|</span>
                <span className="text-xs">{rule.documentType}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setView('eligible')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            view === 'eligible'
              ? 'border-corporate-600 text-corporate-700'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Files Eligible for Archiving
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">{eligible.length}</span>
          </span>
        </button>
        <button
          onClick={() => setView('vault')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            view === 'vault'
              ? 'border-corporate-600 text-corporate-700'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Layers className="w-4 h-4" /> Historical Vault
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{archived.length}</span>
          </span>
        </button>
      </div>

      {/* Eligible View */}
      {view === 'eligible' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={selectAll}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                {selectedIds.length === eligible.length && eligible.length > 0 ? 'Deselect All' : 'Select All'}
              </button>
              {selectedIds.length > 0 && (
                <span className="text-xs text-slate-500">{selectedIds.length} selected</span>
              )}
            </div>
            <button
              onClick={handleBulkArchive}
              disabled={selectedIds.length === 0}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                selectedIds.length > 0
                  ? 'bg-corporate-600 text-white hover:bg-corporate-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Archive className="w-4 h-4" /> Execute Bulk Retention Schedule
            </button>
          </div>

          {bulkDone && (
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
              <CheckCircle className="w-4 h-4" /> Bulk retention schedule executed successfully. Files moved to Historical Vault.
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === eligible.length && eligible.length > 0}
                        onChange={selectAll}
                        className="rounded border-slate-300 text-corporate-600 focus:ring-corporate-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Ref Number</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Department</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Date Logged</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Retention</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {eligible.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                        <p>No files currently eligible for archiving.</p>
                      </td>
                    </tr>
                  ) : (
                    eligible.map(doc => {
                      const years = ((Date.now() - new Date(doc.dateLogged).getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
                      return (
                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(doc.id)}
                              onChange={() => toggleSelect(doc.id)}
                              className="rounded border-slate-300 text-corporate-600 focus:ring-corporate-500"
                            />
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600">{doc.referenceNumber}</td>
                          <td className="px-4 py-3 font-medium text-slate-900">{doc.title}</td>
                          <td className="px-4 py-3 text-slate-600">{doc.originatingDepartment}</td>
                          <td className="px-4 py-3 text-slate-600">{doc.dateLogged}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-500">
                              {years}y / {doc.retentionYears}y
                            </span>
                            <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1">
                              <div
                                className="h-1.5 bg-amber-500 rounded-full"
                                style={{ width: `${Math.min(100, (parseFloat(years) / doc.retentionYears) * 100)}%` }}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                archiveDocument(doc.id);
                                setSelectedIds(prev => prev.filter(id => id !== doc.id));
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-corporate-600 rounded-lg hover:bg-corporate-700 transition-colors"
                            >
                              <Archive className="w-3.5 h-3.5" /> Archive Now
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Vault View */}
      {view === 'vault' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BookOpen className="w-4 h-4" />
            <span>The Historical Vault contains all documents that have been processed through retention scheduling.</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Ref Number</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Department</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Date Logged</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {archived.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                        <Archive className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <p>The Historical Vault is empty.</p>
                      </td>
                    </tr>
                  ) : (
                    archived.map(doc => (
                      <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-600">{doc.referenceNumber}</td>
                        <td className="px-4 py-3 font-medium text-slate-900">{doc.title}</td>
                        <td className="px-4 py-3 text-slate-600">{doc.documentType}</td>
                        <td className="px-4 py-3 text-slate-600">{doc.originatingDepartment}</td>
                        <td className="px-4 py-3 text-slate-600">{doc.dateLogged}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-100 text-slate-600 border-slate-200">
                            <Archive className="w-3 h-3" /> Archived
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
