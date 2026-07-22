import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, QrCode, AlertTriangle, ShieldOff, CheckCircle2, XOctagon, Camera, 
  MapPin, Search, ShieldCheck, User, Lock, ArrowRight, LogOut, Check, X, 
  ShieldAlert, RefreshCw, Eye, Ban, UserMinus, UserCheck, Activity, Key, Mail, Phone, Building, Info
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEntry, getValidityStatus, getDaysRemaining, formatDateDisplay } from '../../context/EntryContext';

const entryData = [
  { time: '08:00', entries: 120 }, { time: '09:00', entries: 350 }, { time: '10:00', entries: 180 },
  { time: '11:00', entries: 90 }, { time: '12:00', entries: 110 }, { time: '13:00', entries: 220 }
];

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="glass-card p-6 border border-white/5 bg-zinc-900/50 hover:border-white/10 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-black text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}><Icon className="w-6 h-6 text-white" /></div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { 
    liveRequests, approveEntry, rejectEntry, suspendQR, blacklistUser, renewQR, history, users, expiryAlerts 
  } = useEntry();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // For "View Complete Profile" Modal

  // Dynamic calculations for QR Validity Management System
  const totalRegistered = Object.keys(users).length;
  const activeQRs = Object.values(users).filter(u => getValidityStatus(u) === 'Active').length;
  const expiringSoonCount = Object.values(users).filter(u => getValidityStatus(u) === 'Expiring Soon').length;
  const expiredQRs = Object.values(users).filter(u => getValidityStatus(u) === 'Expired').length;
  const renewedToday = Object.values(users).filter(u => u.registrationDate === new Date().toISOString().split('T')[0]).length;
  const pendingRenewals = expiringSoonCount + expiredQRs;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'poiuy' && password === '09876') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin credentials!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>

        <div className="max-w-md w-full glass-card p-8 md:p-10 border-t-4 border-blue-500 relative z-10 bg-zinc-950/80">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-2">Admin Panel</h2>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Smart Campus Gate Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Admin ID / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-slate-900/50 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="poiuy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-slate-900/50 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all hover:scale-[1.02]"
            >
              Sign In <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-black px-4 sm:px-6 lg:px-8 relative text-slate-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header section */}
        <div className="flex justify-between items-center bg-zinc-950/60 p-6 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-2xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">Admin Command Center</h1>
            <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mt-1">Real-Time Authorization Feed & remote device management</p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-400 hover:bg-red-600/20 border border-red-500/20 rounded-xl text-xs font-bold uppercase transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
        
        {/* Dynamic Analytics row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={User} label="Total registered" value={totalRegistered} color="bg-blue-500/20" />
          <StatCard icon={QrCode} label="Total Active Users" value={activeQRs} color="bg-emerald-500/20" />
          <StatCard icon={AlertTriangle} label="Expiring Within 7 Days" value={expiringSoonCount} color="bg-yellow-500/20" />
          <StatCard icon={ShieldOff} label="Expired Users" value={expiredQRs} color="bg-red-500/20" />
          <StatCard icon={CheckCircle2} label="Renewed Today" value={renewedToday} color="bg-purple-500/20" />
          <StatCard icon={XOctagon} label="Pending Renewals" value={pendingRenewals} color="bg-rose-500/20" />
        </div>

        {/* Real-time scan broadcast drawer */}
        <div className="glass-card p-6 bg-zinc-950/40 border border-white/5 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h3 className="text-md font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" /> Live Terminal Broadcast Feed
            </h3>
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Connected
            </span>
          </div>

          {liveRequests.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Camera className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider">Awaiting Active Terminal Scans</p>
              <p className="text-[10px] opacity-60 mt-1">Real-time scan logs will populate here instantly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {liveRequests.map((req) => (
                  <motion.div 
                    key={req.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all relative overflow-hidden bg-zinc-900/60 ${
                      req.status === 'APPROVED' ? 'border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <img src={req.user?.photo} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{req.user?.name}</h4>
                          <p className="text-slate-400 font-mono text-xs">{req.user?.registerId}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500/15 text-blue-300 text-[9px] font-extrabold uppercase rounded">
                            {req.user?.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase border ${
                          req.status === 'APPROVED' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-red-500/15 text-red-400 border-red-500/30'
                        }`}>
                          {req.status === 'APPROVED' ? 'ALLOWED' : 'DENIED'}
                        </span>
                        {req.reason && <p className="text-red-400 text-[10px] mt-1 font-semibold">{req.reason}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-black/40 p-3 rounded-xl border border-white/5">
                      <div>
                        <span className="text-slate-500 font-bold uppercase">Department</span>
                        <p className="text-slate-300 font-medium truncate">{req.user?.department || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 font-bold uppercase">Scan Time / Gate</span>
                        <p className="text-slate-300 font-medium truncate">{req.time} • {req.gate}</p>
                      </div>
                    </div>

                    {/* Admin Remote Controls */}
                    <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
                      <button 
                        onClick={() => setSelectedUser(req.user)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-slate-300 p-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Profile
                      </button>
                      <button 
                        onClick={() => suspendQR(req.user?.registerId)}
                        className="bg-orange-600/10 hover:bg-orange-600/20 text-orange-400 border border-orange-500/20 p-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1 transition-colors"
                      >
                        <Ban className="w-3.5 h-3.5" /> Suspend
                      </button>
                      <button 
                        onClick={() => blacklistUser(req.user?.registerId)}
                        className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 p-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1 transition-colors"
                      >
                        <UserMinus className="w-3.5 h-3.5" /> Blacklist
                      </button>
                      {req.user?.status !== 'Active' && (
                        <button 
                          onClick={() => renewQR(req.user?.registerId)}
                          className="bg-emerald-600/20 hover:bg-emerald-600/35 text-emerald-400 border border-emerald-500/30 p-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1 transition-colors ml-auto"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Renew QR
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Lower Charts & Alert sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6 bg-zinc-950/40 border border-white/5 rounded-3xl shadow-xl">
            <h3 className="text-md font-bold text-white uppercase tracking-widest mb-6">Today's Traffic Flow</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={entryData}>
                  <defs>
                    <linearGradient id="colorEntries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                  <Area type="monotone" dataKey="entries" stroke="#3b82f6" fill="url(#colorEntries)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-card p-6 bg-zinc-950/40 border border-white/5 rounded-3xl shadow-xl flex flex-col max-h-[350px]">
            <h3 className="text-md font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" /> Pass Expiry Alerts
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {expiryAlerts.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No active validity warnings.
                </div>
              ) : (
                expiryAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                      alert.type === 'error' ? 'bg-red-950/20 border-red-500/20 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.05)]' : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
                    }`}
                  >
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{alert.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Profile Details Modal Overlay */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.95 }} 
              className="bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-400" /> Complete Profile Sheet
                </h3>
                <button onClick={() => setSelectedUser(null)} className="p-1 rounded-xl bg-zinc-900 border border-white/10 text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 bg-white/[0.02] p-4 border border-white/5 rounded-2xl">
                <img src={selectedUser.photo} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h4 className="text-lg font-bold text-white">{selectedUser.name}</h4>
                  <p className="text-slate-400 font-mono text-xs">{selectedUser.registerId}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-extrabold uppercase rounded">
                    {selectedUser.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-white/[0.01] p-4 border border-white/5 rounded-2xl">
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider block">Department</span>
                  <span className="text-slate-200 font-medium">{selectedUser.department}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider block">Pass Status</span>
                  <span className={`font-bold ${
                    getValidityStatus(selectedUser) === 'Active' ? 'text-emerald-400' :
                    getValidityStatus(selectedUser) === 'Expiring Soon' ? 'text-amber-400 animate-pulse' : 'text-red-500'
                  }`}>{getValidityStatus(selectedUser)}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider block">Registration Date</span>
                  <span className="text-slate-200 font-medium">{formatDateDisplay(selectedUser.registrationDate || selectedUser.issueDate)}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider block">Expiry Date</span>
                  <span className="text-slate-200 font-medium">
                    {formatDateDisplay(selectedUser.expiryDate)} ({getDaysRemaining(selectedUser.expiryDate)} Days Remaining)
                  </span>
                </div>
                <div className="col-span-2 border-t border-white/5 pt-3">
                  <span className="text-slate-500 font-bold uppercase tracking-wider block">Phone Contact</span>
                  <span className="text-slate-200 font-medium">{selectedUser.mobile}</span>
                </div>
              </div>

              {selectedUser.vehicleDetails && (
                <div className="bg-purple-950/15 border border-purple-500/20 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-purple-400 font-bold uppercase tracking-wider">Registered Vehicle</span>
                    <p className="text-white font-mono font-bold mt-0.5">{selectedUser.vehicleDetails.number}</p>
                  </div>
                  <span className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded font-extrabold uppercase text-[10px]">
                    {selectedUser.vehicleDetails.type}
                  </span>
                </div>
              )}

              <button 
                onClick={() => setSelectedUser(null)}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-white/10 rounded-2xl font-bold transition-all text-xs uppercase"
              >
                Close Sheet
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
