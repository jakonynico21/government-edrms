import { useState, useMemo } from 'react';
import { useStore } from '../store';
import { RegistryDocument, DocumentType } from '../types';
import {
  Search,
  Archive,
  Plus,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Check,
  FileSpreadsheet,
  Mail,
  Folder,
  StickyNote,
  ArrowLeftRight,
} from 'lucide-react';

const typeIcons: Record<DocumentType, React.ReactNode> = {
  Letter: <Mail className="w-4 h-4" />,
  Report: <FileSpreadsheet className="w-4 h-4" />,
  File: <Folder className="w-4 h-4" />,
  Memo: <StickyNote className="w-4 h-4" />,
  Circular: <FileText className="w-4 h-4" />,
};

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Archived: 'bg-slate-100 text-slate-600 border-slate-200',
    'In Transit': 'bg-amber-50 text-amber-700 border-amber-200',
    Pending: 'bg-red-50 text-red-700 border-red-200',
  };
  return map[status] || map.Active;
};

export default function RegistryLog() {
  const { documents, archiveDocument, addDocument } = useStore();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortField, setSortField] = useState<keyof RegistryDocument>('dateLogged');
  const [sortDesc, setSortDesc] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const [newDoc, setNewDoc] = useState({
    title: '',
    referenceNumber: '',
    originatingDepartment: '',
    documentType: 'Letter' as DocumentType,
    retentionYears: 7,
    description: '',
  });

  const filtered = useMemo(() => {
    let data = documents.filter(d => {
      const q = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.referenceNumber.toLowerCase().includes(q) ||
        d.originatingDepartment.toLowerCase().includes(q)
      );
    });
    if (statusFilter !== 'All') {
      data = data.filter(d => d.status === statusFilter);
    }
    data.sort((a, b) => {
      const av = a[sortField] as string;
      const bv = b[sortField] as string;
      return sortDesc ? (av > bv ? -1 : 1) : av > bv ? 1 : -1;
    });
    return data;
  }, [documents, search, statusFilter, sortField, sortDesc]);

  const handleSort = (field: keyof RegistryDocument) => {
    if (sortField === field) setSortDesc(!sortDesc);
    else { setSortField(field); setSortDesc(true); }
  };

  const handleAdd = () => {
    if (!newDoc.title || !newDoc.referenceNumber || !newDoc.originatingDepartment) return;
    addDocument({
      ...newDoc,
      dateLogged: new Date().toISOString().slice(0, 10),
      status: 'Active',
    });
    setNewDoc({ title: '', referenceNumber: '', originatingDepartment: '', documentType: 'Letter', retentionYears: 7, description: '' });
    setShowAddModal(false);
  };

  const SortIcon = ({ field }: { field: keyof RegistryDocument }) => {
    if (sortField !== field) return <span className="w-3 h-3 inline-block" />;
    return sortDesc ? <ChevronDown className="w-3 h-3 inline" /> : <ChevronUp className="w-3 h-3 inline" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Registry Log</h2>
          <p className="text-sm text-slate-500 mt-1">Comprehensive storage and retrieval system for all government documents</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-corporate-600 text-white rounded-lg text-sm font-medium hover:bg-corporate-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Document
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, reference number, or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-corporate-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-corporate-500 appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
            <option value="In Transit">In Transit</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer select-none" onClick={() => handleSort('referenceNumber')}>
                  Ref Number <SortIcon field="referenceNumber" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer select-none" onClick={() => handleSort('title')}>
                  Title <SortIcon field="title" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer select-none" onClick={() => handleSort('originatingDepartment')}>
                  Department <SortIcon field="originatingDepartment" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer select-none" onClick={() => handleSort('dateLogged')}>
                  Date Logged <SortIcon field="dateLogged" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p>No documents found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filtered.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-600">{doc.referenceNumber}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{doc.title}</p>
                      {doc.description && <p className="text-xs text-slate-400 mt-0.5">{doc.description}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {typeIcons[doc.documentType]} {doc.documentType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{doc.originatingDepartment}</td>
                    <td className="px-4 py-3 text-slate-600">{doc.dateLogged}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {doc.status !== 'Archived' && doc.status !== 'In Transit' && (
                        <button
                          onClick={() => archiveDocument(doc.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          <Archive className="w-3.5 h-3.5" /> Archive
                        </button>
                      )}
                      {doc.status === 'Archived' && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Check className="w-3.5 h-3.5" /> Archived
                        </span>
                      )}
                      {doc.status === 'In Transit' && (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                          <ArrowLeftRight className="w-3.5 h-3.5" /> In Transit
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          Showing {filtered.length} of {documents.length} documents
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Add New Document</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  value={newDoc.title}
                  onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                  placeholder="e.g. Annual Budget Report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reference Number</label>
                <input
                  type="text"
                  value={newDoc.referenceNumber}
                  onChange={e => setNewDoc({ ...newDoc, referenceNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                  placeholder="e.g. MOF/2024/XXX"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newDoc.originatingDepartment}
                    onChange={e => setNewDoc({ ...newDoc, originatingDepartment: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                    placeholder="e.g. Finance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
                  <select
                    value={newDoc.documentType}
                    onChange={e => setNewDoc({ ...newDoc, documentType: e.target.value as DocumentType })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                  >
                    <option>Letter</option>
                    <option>Report</option>
                    <option>File</option>
                    <option>Memo</option>
                    <option>Circular</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Retention Period (Years)</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={newDoc.retentionYears}
                  onChange={e => setNewDoc({ ...newDoc, retentionYears: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDoc.description}
                  onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 resize-none"
                  placeholder="Brief description of the document..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-corporate-600 text-white rounded-lg text-sm font-medium hover:bg-corporate-700 transition-colors"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
