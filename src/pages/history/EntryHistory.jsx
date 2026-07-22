import React, { useState } from 'react';
import { History, CheckCircle2, AlertOctagon, Search, Download, Filter, Calendar } from 'lucide-react';
import { useEntry } from '../../context/EntryContext';

const EntryHistory = () => {
  const { history } = useEntry();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredHistory = history.filter(item => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = (
      (item.vehicleNumber && item.vehicleNumber.toLowerCase().includes(q)) ||
      (item.ownerName && item.ownerName.toLowerCase().includes(q)) ||
      (item.gate && item.gate.toLowerCase().includes(q)) ||
      (item.registerId && item.registerId.toLowerCase().includes(q))
    );

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Vehicle Number', 'Owner Name', 'Student/Staff ID', 'Gate', 'Status', 'Reason'];
    const rows = filteredHistory.map(h => [
      h.date,
      h.time,
      h.vehicleNumber,
      h.ownerName,
      h.registerId || 'N/A',
      h.gate,
      h.status,
      h.reason || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `campus_vehicle_entry_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-[#0F172A] relative">
      
      {/* Ambient Lighting */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Page Header */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1 font-mono">
              <History className="w-4 h-4" /> Live Gate Security Audit Stream
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Vehicle Gate Entry History
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Complete Audit Logs of Granted & Denied Gate Access Verification Attempts
            </p>
          </div>

          <button
            onClick={exportToCSV}
            className="w-full md:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" /> Export CSV Log
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Vehicle Number, Owner, Gate, or ID..."
              className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-300 font-bold focus:outline-none"
            >
              <option value="All">All Statuses (Granted & Denied)</option>
              <option value="Granted">Granted Only (🟢)</option>
              <option value="Denied">Denied Only (🔴)</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div className="glass-card rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-black/50 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="p-4 pl-6">Date & Time</th>
                  <th className="p-4">Vehicle Number</th>
                  <th className="p-4">Owner Name</th>
                  <th className="p-4">Gate Location</th>
                  <th className="p-4">Access Status</th>
                  <th className="p-4 pr-6">Reason / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No entry history logs matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      
                      {/* Date & Time */}
                      <td className="p-4 pl-6 font-mono">
                        <span className="text-white font-bold block">{item.date}</span>
                        <span className="text-[10px] text-slate-400 block">{item.time}</span>
                      </td>

                      {/* Vehicle Number */}
                      <td className="p-4 font-mono font-black text-white text-sm">
                        {item.vehicleNumber}
                      </td>

                      {/* Owner */}
                      <td className="p-4">
                        <span className="font-bold text-white block">{item.ownerName}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{item.registerId || 'N/A'}</span>
                      </td>

                      {/* Gate */}
                      <td className="p-4 font-mono text-slate-300">
                        {item.gate || 'Main Entrance Gate'}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 w-fit ${
                          item.status === 'Granted'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {item.status === 'Granted' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Granted
                            </>
                          ) : (
                            <>
                              <AlertOctagon className="w-3.5 h-3.5" /> Denied
                            </>
                          )}
                        </span>
                      </td>

                      {/* Reason */}
                      <td className="p-4 pr-6 text-slate-400 font-mono">
                        {item.reason ? (
                          <span className="text-red-400 font-bold">{item.reason}</span>
                        ) : (
                          <span className="text-emerald-400/70">Verified Valid Sticker</span>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EntryHistory;
