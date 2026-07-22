import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import MccLogo from './MccLogo';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl py-10 relative z-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Container with crisp Badge Icon (showText={false} prevents overlap) */}
        <div className="flex items-center gap-3.5">
          <MccLogo showText={false} size={46} />
          <div>
            <span className="font-extrabold text-white text-sm block">
              MCC MRF Innovation Park — Gate Security Verification
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              Official Campus Vehicle Access Control System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-400 font-mono text-[11px]">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Innovation Park Security Gates</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authorized Entry System</span>
        </div>

        <div className="text-slate-500 text-[11px]">
          &copy; {new Date().getFullYear()} MCC MRF Innovation Park Security. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
