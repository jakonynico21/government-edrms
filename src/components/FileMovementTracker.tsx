import { useState } from 'react';
import { useStore } from '../store';
import {
  ArrowRightLeft,
  Send,
  MapPin,
  Clock,
  User,
  Building,
  FileText,
  CheckCircle,
  ChevronRight,
  Circle,
  RotateCcw,
} from 'lucide-react';

export default function FileMovementTracker() {
  const { documents, movements, addMovement } = useStore();
  const [form, setForm] = useState({
    documentId: '',
    issuedTo: '',
    department: '',
    purpose: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const activeDocs = documents.filter(d => d.status === 'Active');

  const handleSubmit = () => {
    if (!form.documentId || !form.issuedTo || !form.department || !form.purpose) return;
    const doc = documents.find(d => d.id === form.documentId);
    if (!doc) return;
    addMovement({
      documentId: doc.id,
      documentRef: doc.referenceNumber,
      documentTitle: doc.title,
      issuedTo: form.issuedTo,
      department: form.department,
      dateIssued: new Date().toISOString().slice(0, 10),
      purpose: form.purpose,
      status: 'Out',
    });
    setForm({ documentId: '', issuedTo: '', department: '', purpose: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">File Movement Tracker</h2>
        <p className="text-sm text-slate-500 mt-1">Log check-outs and track the complete audit trail of every file</p>
      </div>

      {/* Check-out Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-corporate-50 rounded-lg">
            <ArrowRightLeft className="w-5 h-5 text-corporate-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Log File Check-Out</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={form.documentId}
                onChange={e => setForm({ ...form, documentId: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 appearance-none cursor-pointer bg-white"
              >
                <option value="">Select a document</option>
                {activeDocs.map(d => (
                  <option key={d.id} value={d.id}>{d.referenceNumber} - {d.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Issued To</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.issuedTo}
                onChange={e => setForm({ ...form, issuedTo: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                placeholder="Officer name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                placeholder="Destination department"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.purpose}
                onChange={e => setForm({ ...form, purpose: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500"
                placeholder="Reason for check-out"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-corporate-600 text-white rounded-lg text-sm font-medium hover:bg-corporate-700 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" /> Log Check-Out
          </button>
          <button
            onClick={() => setForm({ documentId: '', issuedTo: '', department: '', purpose: '' })}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          {submitted && (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
              <CheckCircle className="w-4 h-4" /> Check-out logged successfully
            </span>
          )}
        </div>
      </div>

      {/* Timeline / Audit Trail */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-corporate-600" /> File Movement Audit Trail
        </h3>

        {movements.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
            <ArrowRightLeft className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p>No file movements recorded yet.</p>
          </div>
        ) : (
          movements.map(movement => (
            <div key={movement.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="font-semibold text-slate-900">{movement.documentTitle}</h4>
                  <p className="text-sm text-slate-500 font-mono">{movement.documentRef}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                    <ArrowRightLeft className="w-3 h-3" /> {movement.status}
                  </span>
                  <span>Issued: {movement.dateIssued}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 bg-slate-50 rounded-lg px-3 py-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{movement.issuedTo}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <Building className="w-4 h-4 text-slate-400" />
                <span>{movement.department}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-400 italic">{movement.purpose}</span>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-slate-200" />
                {movement.timeline.map((node, idx) => (
                  <div key={node.id} className="relative mb-4 last:mb-0">
                    <div className={`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      idx === 0 ? 'bg-corporate-600 border-corporate-600' : 'bg-white border-corporate-400'
                    }`}>
                      {idx === 0 ? <Circle className="w-2 h-2 text-white fill-current" /> : <Circle className="w-2 h-2 text-corporate-400 fill-current" />}
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-800">{node.location}</span>
                        <span className="text-xs text-slate-400">{new Date(node.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-600">{node.action}</p>
                      <p className="text-xs text-slate-400 mt-1">Officer: {node.officer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
