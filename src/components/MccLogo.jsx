import React from 'react';

export const MccLogo = ({ size = 46, showText = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-3.5 shrink-0 select-none ${className}`}>
      
      {/* 
        Official Madras Christian College (MCC) Crest Badge Icon
        - Hand in Blessing at the top
        - Rope cushion bar
        - Shield with Anchor of Hope, Cross & Wrapped Rope + Water Shading Lines
        - "IN HOC SIGNO" Latin Motto Ribbon Scroll at bottom
      */}
      <div className="relative shrink-0 group">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 110" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_18px_rgba(220,38,38,0.5)] group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="mccGoldMetallic" x1="0" y1="0" x2="100" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="mccBurgundy" x1="0" y1="0" x2="0" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
          </defs>

          {/* 1. TOP: Hand in Blessing */}
          <g transform="translate(50, 8)" stroke="url(#mccGoldMetallic)" strokeWidth="1.8" fill="#FDE68A">
            <path d="M -4 12 C -6 8, -4 2, -2 0 C 0 -1, 2 0, 2 3 L 2 10 M 2 3 C 3 -1, 6 -1, 6 4 L 6 10 M 6 5 C 7 1, 9 2, 9 7 L 9 11 M -4 10 C -8 11, -9 15, -7 18 C -5 20, 2 20, 8 18 C 10 15, 9 11, 8 10 Z" strokeLinejoin="round" />
          </g>

          {/* 2. Rope Cushion Bar */}
          <g transform="translate(32, 22)">
            <rect x="0" y="0" width="36" height="5" rx="2.5" fill="url(#mccBurgundy)" stroke="url(#mccGoldMetallic)" strokeWidth="1.5" />
            <line x1="6" y1="0" x2="10" y2="5" stroke="#FDE68A" strokeWidth="1" />
            <line x1="15" y1="0" x2="19" y2="5" stroke="#FDE68A" strokeWidth="1" />
            <line x1="24" y1="0" x2="28" y2="5" stroke="#FDE68A" strokeWidth="1" />
          </g>

          {/* 3. Main Heraldic Shield Outer Frame */}
          <path 
            d="M 18 28 L 82 28 L 82 56 C 82 76, 68 90, 50 96 C 32 90, 18 76, 18 56 Z" 
            fill="url(#mccBurgundy)" 
            stroke="url(#mccGoldMetallic)" 
            strokeWidth="2.5" 
          />

          {/* Inner Shield Border Line */}
          <path 
            d="M 22 31 L 78 31 L 78 55 C 78 72, 65 85, 50 90 C 35 85, 22 72, 22 55 Z" 
            fill="none" 
            stroke="rgba(253,230,138,0.3)" 
            strokeWidth="1" 
          />

          {/* Water Shading Lines */}
          <g stroke="rgba(253,230,138,0.25)" strokeWidth="1">
            <line x1="22" y1="58" x2="78" y2="58" />
            <line x1="23" y1="62" x2="77" y2="62" />
            <line x1="25" y1="66" x2="75" y2="66" />
            <line x1="28" y1="70" x2="72" y2="70" />
            <line x1="31" y1="74" x2="69" y2="74" />
            <line x1="35" y1="78" x2="65" y2="78" />
            <line x1="40" y1="82" x2="60" y2="82" />
          </g>

          {/* 4. Anchor & Cross Motif */}
          <circle cx="50" cy="38" r="3.5" stroke="url(#mccGoldMetallic)" strokeWidth="2" fill="none" />
          <rect x="48" y="41" width="4" height="36" fill="#FFFFFF" />
          <rect x="36" y="47" width="28" height="4" fill="#FFFFFF" />

          {/* Bottom Anchor Flukes */}
          <path d="M 30 70 C 34 84, 66 84, 70 70 L 75 72 C 68 89, 32 89, 25 72 Z" fill="url(#mccGoldMetallic)" />
          <polygon points="25,72 31,67 33,73" fill="#FDE68A" />
          <polygon points="75,72 69,67 67,73" fill="#FDE68A" />

          {/* Wrapped Rope */}
          <path d="M 50 37 Q 56 42, 52 47 Q 44 52, 48 58 Q 54 64, 49 70 Q 45 74, 50 78" stroke="#FDE68A" strokeWidth="1.8" strokeDasharray="3 1" fill="none" />

          {/* Motto Ribbon Banner */}
          <g transform="translate(0, 12)">
            <path d="M 12 80 C 26 76, 38 82, 50 82 C 62 82, 74 76, 88 80 L 86 89 C 74 85, 62 90, 50 90 C 38 90, 26 85, 14 89 Z" fill="#450A0A" stroke="url(#mccGoldMetallic)" strokeWidth="1.5" />
            <path d="M 12 80 L 6 84 L 14 89 Z" fill="url(#mccGoldMetallic)" />
            <path d="M 88 80 L 94 84 L 86 89 Z" fill="url(#mccGoldMetallic)" />
            <text x="50" y="87" fontFamily="Georgia, 'Times New Roman', serif" fontSize="6.5" fontWeight="900" fill="#FDE68A" textAnchor="middle" letterSpacing="1.2">
              IN HOC SIGNO
            </text>
          </g>
        </svg>
      </div>

      {/* Official HD Vector Typography for MCC-MRF INNOVATION PARK */}
      {showText && (
        <div className="shrink-0 flex flex-col justify-center whitespace-nowrap space-y-0.5">
          
          {/* Top Line: MCC- MRF */}
          <div className="flex items-center leading-none tracking-tight">
            {/* MCC- in Crimson Serif */}
            <span 
              className="text-[#EF4444] font-serif font-black text-2xl tracking-tight mr-1.5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 900 }}
            >
              MCC-
            </span>
            
            {/* MRF in Official Heavy Red Vector Block Font */}
            <svg width="72" height="24" viewBox="0 0 110 35" fill="none" className="inline-block shrink-0">
              {/* M */}
              <path d="M 0 0 L 10 0 L 17 20 L 24 0 L 34 0 L 34 35 L 25 35 L 25 10 L 18 30 L 16 30 L 9 10 L 9 35 L 0 35 Z" fill="#DC2626" />
              {/* R */}
              <path d="M 38 0 L 58 0 C 67 0 72 4 72 11 C 72 16 68 20 61 21 L 73 35 L 62 35 L 51 22 L 47 22 L 47 35 L 38 35 Z M 47 7 L 47 16 L 57 16 C 63 16 63 14 63 11 C 63 8 61 7 57 7 Z" fill="#DC2626" />
              {/* F */}
              <path d="M 76 0 L 108 0 L 108 8 L 85 8 L 85 14 L 104 14 L 104 22 L 85 22 L 85 35 L 76 35 Z" fill="#DC2626" />
            </svg>
          </div>

          {/* Bottom Line: INNOVATION PARK */}
          <div className="leading-none">
            <span 
              className="text-[#EF4444] font-serif font-extrabold text-[12px] uppercase tracking-[0.16em] block"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              INNOVATION PARK
            </span>
          </div>
          
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono block pt-0.5">
            Smart Vehicle Access Verification
          </span>
        </div>
      )}

    </div>
  );
};

export default MccLogo;
