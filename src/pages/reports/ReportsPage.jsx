import React, { useState } from 'react';
import { 
  BarChart3, Calendar, CheckCircle2, AlertTriangle, AlertOctagon, 
  Download, Printer, FileText, Car, ShieldAlert 
} from 'lucide-react';
import { useEntry, formatDateDisplay, getValidityStatus } from '../../context/EntryContext';

const ReportsPage = () => {
  const { vehicles, history } = useEntry();
  const [activeTab, setActiveTab] = useState('daily'); // daily, weekly, monthly, expired, invalid

  const vehicleList = Object.values(vehicles);

  const grantedCount = history.filter(h => h.status === 'Granted').length;
  const deniedCount = history.filter(h => h.status === 'Denied').length;
  const totalScans = history.length;
  const expiredVehicles = vehicleList.filter(v => getValidityStatus(v) === 'Expired');
  const invalidAttempts = history.filter(h => h.status === 'Denied');

  const exportReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-[#0F172A] relative">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Page Header */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1 font-mono">
              <BarChart3 className="w-4 h-4" /> Campus Access Analytics & Reports
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Vehicle Security Intelligence Reports
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Audit summaries, scan success rates, expired sticker alerts, and security logs
            </p>
          </div>

          <button
            onClick={exportReport}
            className="w-full md:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" /> Print / Export Report
          </button>
        </div>

        {/* Report Timeframe / Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 glass-card rounded-2xl border border-white/10 bg-slate-900/60">
          {[
            { id: 'daily', label: 'Daily Report' },
            { id: 'weekly', label: 'Weekly Report' },
            { id: 'monthly', label: 'Monthly Report' },
            { id: 'expired', label: 'Expired Stickers' },
            { id: 'invalid', label: 'Invalid Scans' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-3xl border border-white/10 bg-slate-900/60 text-left">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Scan Logs</span>
            <span className="text-3xl font-black text-white block mt-1">{totalScans}</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 text-left">
            <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider block">Access Granted (Green)</span>
            <span className="text-3xl font-black text-emerald-400 block mt-1">{grantedCount}</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-red-500/30 bg-red-950/20 text-left">
            <span className="text-[11px] font-extrabold text-red-400 uppercase tracking-wider block">Access Denied (Red)</span>
            <span className="text-3xl font-black text-red-400 block mt-1">{deniedCount}</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-amber-500/30 bg-amber-950/20 text-left">
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">Expired Stickers</span>
            <span className="text-3xl font-black text-amber-400 block mt-1">{expiredVehicles.length}</span>
          </div>
        </div>

        {/* TAB 1, 2, 3: DAILY / WEEKLY / MONTHLY REPORTS */}
        {(activeTab === 'daily' || activeTab === 'weekly' || activeTab === 'monthly') && (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-6">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                {activeTab.toUpperCase()} GATE ACCESS VERIFICATION SUMMARY
              </h3>

              {/* Progress Visual Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-emerald-400">Granted: {grantedCount} ({totalScans ? Math.round((grantedCount/totalScans)*100) : 0}%)</span>
                  <span className="text-red-400">Denied: {deniedCount} ({totalScans ? Math.round((deniedCount/totalScans)*100) : 0}%)</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${totalScans ? (grantedCount/totalScans)*100 : 50}%` }} 
                    className="bg-emerald-500 h-full transition-all"
                  />
                  <div 
                    style={{ width: `${totalScans ? (deniedCount/totalScans)*100 : 50}%` }} 
                    className="bg-red-600 h-full transition-all"
                  />
                </div>
              </div>

              {/* Summary Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/40 text-slate-400 font-mono uppercase">
                      <th className="p-3">Gate Name</th>
                      <th className="p-3">Total Scans</th>
                      <th className="p-3">Granted</th>
                      <th className="p-3">Denied</th>
                      <th className="p-3">Pass Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr className="hover:bg-white/5">
                      <td className="p-3 font-bold text-white">Main Entrance Gate</td>
                      <td className="p-3 font-mono">{totalScans}</td>
                      <td className="p-3 font-mono text-emerald-400">{grantedCount}</td>
                      <td className="p-3 font-mono text-red-400">{deniedCount}</td>
                      <td className="p-3 font-mono text-emerald-400 font-bold">
                        {totalScans ? `${Math.round((grantedCount/totalScans)*100)}%` : '100%'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPIRED STICKERS */}
        {activeTab === 'expired' && (
          <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/60 space-y-4">
            <h3 className="text-base font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Expired Vehicle Stickers Report
            </h3>

            {expiredVehicles.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No expired stickers currently registered.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/50 text-slate-400 font-mono uppercase">
                      <th className="p-3">Vehicle Number</th>
                      <th className="p-3">Owner Name</th>
                      <th className="p-3">Student/Staff ID</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Expiry Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {expiredVehicles.map(v => (
                      <tr key={v.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono font-bold text-white">{v.vehicleNumber}</td>
                        <td className="p-3 font-bold text-white">{v.name}</td>
                        <td className="p-3 font-mono text-amber-400">{v.registerId}</td>
                        <td className="p-3">{v.department}</td>
                        <td className="p-3 font-mono text-red-400 font-bold">{formatDateDisplay(v.expiryDate)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-black uppercase text-[10px]">
                            EXPIRED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: INVALID SCAN ATTEMPTS */}
        {activeTab === 'invalid' && (
          <div className="glass-card p-6 rounded-3xl border border-red-500/30 bg-slate-900/60 space-y-4">
            <h3 className="text-base font-black text-red-400 uppercase tracking-wider flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-400" /> Invalid Gate Scan Attempts Report
            </h3>

            {invalidAttempts.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No invalid scan attempts recorded.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/50 text-slate-400 font-mono uppercase">
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Vehicle Number</th>
                      <th className="p-3">Owner / ID</th>
                      <th className="p-3">Gate</th>
                      <th className="p-3">Denial Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {invalidAttempts.map(item => (
                      <tr key={item.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono text-slate-400">{item.date} {item.time}</td>
                        <td className="p-3 font-mono font-bold text-white">{item.vehicleNumber}</td>
                        <td className="p-3 font-bold text-white">{item.ownerName} ({item.registerId || 'N/A'})</td>
                        <td className="p-3 font-mono">{item.gate}</td>
                        <td className="p-3 font-bold text-red-400">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportsPage;
