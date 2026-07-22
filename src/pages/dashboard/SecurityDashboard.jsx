import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, ShieldCheck, CheckCircle2, AlertTriangle, Scan, History, 
  Activity, ArrowUpRight, Bike, Users, Clock, Filter, AlertOctagon, Sparkles,
  Radio, Shield, FileText, Lock, ChevronRight, BarChart2, CheckSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEntry, getValidityStatus } from '../../context/EntryContext';

const SecurityDashboard = () => {
  const { vehicles, history } = useEntry();

  const vehicleList = Object.values(vehicles);

  // Dynamic Metrics Calculation
  const totalRegistered = vehicleList.length;
  const activeStickers = vehicleList.filter(v => getValidityStatus(v) === 'Active').length;
  const expiredStickers = vehicleList.filter(v => getValidityStatus(v) === 'Expired').length;
  const todayEntries = history.filter(h => h.status === 'Granted').length;
  const invalidScanAttempts = history.filter(h => h.status === 'Denied').length;

  const twoWheelers = vehicleList.filter(v => v.vehicleType?.toLowerCase().includes('bike') || v.vehicleType?.toLowerCase().includes('two')).length;
  const fourWheelers = vehicleList.filter(v => v.vehicleType?.toLowerCase().includes('car') || v.vehicleType?.toLowerCase().includes('four')).length;

  // Active Gate Live Terminals
  const gates = [
    { name: 'Gate 1 (Main Entrance)', status: 'ONLINE', officer: 'M. Kumar (SEC-102)', activeCount: 42, color: 'emerald' },
    { name: 'Gate 2 (North Complex)', status: 'ONLINE', officer: 'S. Rajan (SEC-105)', activeCount: 18, color: 'emerald' },
    { name: 'Gate 3 (South Research)', status: 'ONLINE', officer: 'P. Vignesh (SEC-109)', activeCount: 26, color: 'emerald' },
    { name: 'Gate 4 (Innovation Hub)', status: 'ONLINE', officer: 'R. Anthony (SEC-112)', activeCount: 15, color: 'emerald' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Dashboard Banner Header */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" /> MCC MRF Innovation Park Gate Security Operations
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Security Operations Command Center
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Live Campus Access Monitoring, Sticker Validation & Real-time Barrier Terminal System
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10">
            <Link
              to="/scanner"
              className="flex-1 md:flex-none px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95"
            >
              <Scan className="w-5 h-5 animate-pulse" /> Launch QR Scanner
            </Link>

            <Link
              to="/vehicles"
              className="px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <Car className="w-4 h-4 text-amber-400" /> Manage Vehicles
            </Link>
          </div>
        </div>

        {/* 5 Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Total Registered Vehicles */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-5 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total Registered</span>
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Car className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-white block">{totalRegistered}</span>
              <span className="text-[10px] text-slate-400 font-medium mt-1 block">Park Authorized Vehicles</span>
            </div>
          </motion.div>

          {/* Card 2: Active Stickers */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">Active Stickers</span>
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-emerald-400 block">{activeStickers}</span>
              <span className="text-[10px] text-emerald-300/70 font-medium mt-1 block">Valid QR Passes</span>
            </div>
          </motion.div>

          {/* Card 3: Expired Stickers */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-5 rounded-3xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">Expired Stickers</span>
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-amber-400 block">{expiredStickers}</span>
              <span className="text-[10px] text-amber-300/70 font-medium mt-1 block">Requires Renewal</span>
            </div>
          </motion.div>

          {/* Card 4: Today's Entries */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-5 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-400">Today's Entries</span>
              <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-white block">{todayEntries}</span>
              <span className="text-[10px] text-slate-400 font-medium mt-1 block">Access Granted Scans</span>
            </div>
          </motion.div>

          {/* Card 5: Invalid Scan Attempts */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-5 rounded-3xl border border-red-500/30 bg-red-950/20 backdrop-blur-xl shadow-[0_0_20px_rgba(220,38,38,0.15)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-400">Invalid Scans</span>
              <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40">
                <AlertOctagon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-red-400 block">{invalidScanAttempts}</span>
              <span className="text-[10px] text-red-300/70 font-medium mt-1 block">Access Denied Alerts</span>
            </div>
          </motion.div>

        </div>

        {/* Live Gate Security Terminals Section */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> Campus Security Gate Live Terminals
            </h3>
            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> 4 Gate Terminals Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gates.map((g, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{g.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-black border border-emerald-500/40">
                    {g.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Officer: {g.officer}</span>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Today's Volume</span>
                  <span className="text-white font-bold">{g.activeCount} scans</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section: Fleet Breakdown + Security Roster & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: Fleet Category & Security Officer Duty Roster */}
          <div className="space-y-6">
            
            {/* Fleet Breakdown Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Campus Vehicle Categories</span>
                <Car className="w-4 h-4 text-amber-400" />
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <Bike className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Two-Wheelers (Bikes)</span>
                      <span className="text-[10px] text-slate-400">Students & Staff Two-Wheelers</span>
                    </div>
                  </div>
                  <span className="text-xl font-black text-white">{twoWheelers}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Four-Wheelers (Cars)</span>
                      <span className="text-[10px] text-slate-400">Faculty & VIP Four-Wheelers</span>
                    </div>
                  </div>
                  <span className="text-xl font-black text-white">{fourWheelers}</span>
                </div>
              </div>
            </div>

            {/* On-Duty Command Roster */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Security Duty Shift Roster
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Chief Security Controller</span>
                    <span className="text-white font-bold block">S. Ramanathan (ID: SEC-8801)</span>
                  </div>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-lg font-mono font-bold text-[10px]">On Duty</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Active Shift</span>
                    <span className="text-white font-bold block">Morning Shift Alpha (06:00 AM - 02:00 PM)</span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-mono font-bold text-[10px]">Active</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2 & 3: Live Gate Activity Stream & Verification Logs */}
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-400" /> Live Gate Validation Feed
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Real-time gate scan verification logs</p>
                </div>
                <Link to="/history" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  View Full History Log <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {history.slice(0, 6).map((log) => (
                  <div 
                    key={log.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      log.status === 'Granted'
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-red-950/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl text-white font-bold ${
                        log.status === 'Granted' ? 'bg-emerald-600' : 'bg-red-600'
                      }`}>
                        {log.status === 'Granted' ? <CheckCircle2 className="w-5 h-5" /> : <AlertOctagon className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-black text-white">{log.vehicleNumber}</span>
                          <span className="text-xs text-slate-300 font-semibold">({log.ownerName})</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                          {log.gate} • {log.time}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        log.status === 'Granted'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {log.status === 'Granted' ? 'ACCESS GRANTED' : `DENIED: ${log.reason}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Control Footer Panel */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" /> Security Barrier Status: Locked & Secured
              </span>
              
              <div className="flex items-center gap-3">
                <Link to="/reports" className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" /> Gate Audit Reports
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SecurityDashboard;
