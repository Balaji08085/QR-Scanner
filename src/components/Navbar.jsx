import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Scan, Car, Search, History, BarChart3, LogIn, Menu, X, GraduationCap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEntry } from '../context/EntryContext';
import SvacsLogo from './SvacsLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole } = useEntry();

  const allLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: ShieldCheck, roles: ['guard', 'admin'] },
    { name: 'QR Scanner', path: '/scanner', icon: Scan, roles: ['guard', 'admin'] },
    { name: 'Vehicle Mgmt', path: '/vehicles', icon: Car, roles: ['admin'] },
    { name: 'Search Pass', path: '/search', icon: Search, roles: ['student', 'guard', 'admin'] },
    { name: 'Entry History', path: '/history', icon: History, roles: ['guard', 'admin'] },
    { name: 'Reports', path: '/reports', icon: BarChart3, roles: ['guard', 'admin'] },
  ];

  const links = allLinks.filter(link => link.roles.includes(userRole));

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* SVACS Logo & Brand */}
          <Link to={userRole === 'student' ? "/search" : "/dashboard"} className="flex items-center gap-3 shrink-0 group">
            <SvacsLogo showText={true} size={40} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Role Status & Auth Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <div className={`px-3.5 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
              userRole === 'admin'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : userRole === 'guard'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-ping ${
                userRole === 'admin' ? 'bg-amber-400' : userRole === 'guard' ? 'bg-emerald-400' : 'bg-blue-400'
              }`} />
              {userRole === 'admin' ? 'Admin Portal' : userRole === 'guard' ? 'Gate Security Guard' : 'Student Pass Portal'}
            </div>

            <Link
              to="/login"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-300" />
              Switch Role
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2 bg-white/5 border border-white/10 rounded-xl"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 border-t border-white/10 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl"
          >
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-red-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                Current Access Role: <span className="text-white">{userRole.toUpperCase()}</span>
              </div>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase shadow-lg"
              >
                Change Role / Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
