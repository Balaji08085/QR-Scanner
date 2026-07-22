import React from 'react';

/**
 * SVACS - Smart Vehicle Access Control System
 * Professional SVG Logo Component
 * 
 * Props:
 *   size      - icon size in px (default: 44)
 *   showText  - whether to show "SVACS" wordmark (default: true)
 *   dark      - use dark variant (white icon, white text) for light backgrounds (default: false)
 *   className - additional CSS classes
 */
export const SvacsLogo = ({ size = 44, showText = true, dark = false, className = "" }) => {
  const iconColor    = dark ? '#1B3A6B' : '#FFFFFF';
  const accentColor  = dark ? '#2563EB' : '#60A5FA';
  const cyanColor    = dark ? '#0891B2' : '#22D3EE';
  const textPrimary  = dark ? '#1B3A6B' : '#FFFFFF';
  const textSub      = dark ? '#4B5563' : '#94A3B8';

  return (
    <div className={`flex items-center gap-3 shrink-0 select-none ${className}`}>

      {/* ── Hexagonal Badge Icon ── */}
      <div className="relative shrink-0 group">
        <svg
          width={size}
          height={size * 1.1}
          viewBox="0 0 100 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_14px_rgba(37,99,235,0.55)] group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            {/* Shield gradient – deep navy to electric blue */}
            <linearGradient id="svacs-shield" x1="0" y1="0" x2="100" y2="112" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#1E3A5F" />
              <stop offset="60%"  stopColor="#1B3A6B" />
              <stop offset="100%" stopColor="#0F2240" />
            </linearGradient>

            {/* Accent glow gradient */}
            <linearGradient id="svacs-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Outer rim gradient */}
            <linearGradient id="svacs-rim" x1="0" y1="0" x2="100" y2="112" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#60A5FA" />
              <stop offset="50%"  stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="svacs-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Outer shield shape ── */}
          <path
            d="M 50 2 L 90 16 L 90 60 C 90 84, 72 100, 50 110 C 28 100, 10 84, 10 60 L 10 16 Z"
            fill="url(#svacs-shield)"
            stroke="url(#svacs-rim)"
            strokeWidth="2"
          />

          {/* ── Inner shield border ── */}
          <path
            d="M 50 8 L 84 20 L 84 60 C 84 80, 68 95, 50 104 C 32 95, 16 80, 16 60 L 16 20 Z"
            fill="none"
            stroke="rgba(96,165,250,0.18)"
            strokeWidth="1"
          />

          {/* ══ QR Code Grid (3×3 finder + data) centered ══ */}
          {/* Top-left finder */}
          <rect x="23" y="28" width="18" height="18" rx="2" fill="none" stroke="url(#svacs-accent)" strokeWidth="2" />
          <rect x="27" y="32" width="10" height="10" rx="1" fill="url(#svacs-accent)" />

          {/* Top-right finder */}
          <rect x="59" y="28" width="18" height="18" rx="2" fill="none" stroke="url(#svacs-accent)" strokeWidth="2" />
          <rect x="63" y="32" width="10" height="10" rx="1" fill="url(#svacs-accent)" />

          {/* Bottom-left finder */}
          <rect x="23" y="55" width="18" height="18" rx="2" fill="none" stroke="url(#svacs-accent)" strokeWidth="2" />
          <rect x="27" y="59" width="10" height="10" rx="1" fill="url(#svacs-accent)" />

          {/* Data dots (bottom-right area) */}
          <rect x="59" y="55" width="5" height="5" rx="1" fill="#22D3EE" />
          <rect x="67" y="55" width="5" height="5" rx="1" fill="#22D3EE" />
          <rect x="72" y="62" width="5" height="5" rx="1" fill="url(#svacs-accent)" />
          <rect x="59" y="62" width="5" height="5" rx="1" fill="url(#svacs-accent)" />
          <rect x="64" y="68" width="9" height="5" rx="1" fill="#22D3EE" />

          {/* Alignment marker */}
          <rect x="44" y="55" width="9" height="9" rx="1.5" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
          <rect x="47" y="58" width="3" height="3" rx="0.5" fill="#22D3EE" />

          {/* ══ Car Silhouette (bottom center) ══ */}
          <g transform="translate(50, 88)">
            {/* Car body */}
            <path
              d="M -18 0 L -16 -8 L -8 -12 L 8 -12 L 16 -8 L 18 0 Z"
              fill="url(#svacs-accent)"
              opacity="0.95"
            />
            {/* Cabin */}
            <path
              d="M -10 -8 L -7 -14 L 7 -14 L 10 -8 Z"
              fill="#22D3EE"
              opacity="0.9"
            />
            {/* Wheels */}
            <circle cx="-11" cy="1" r="4" fill="#0F2240" stroke="url(#svacs-rim)" strokeWidth="1.5" />
            <circle cx="11"  cy="1" r="4" fill="#0F2240" stroke="url(#svacs-rim)" strokeWidth="1.5" />
            <circle cx="-11" cy="1" r="1.5" fill="url(#svacs-accent)" />
            <circle cx="11"  cy="1" r="1.5" fill="url(#svacs-accent)" />
            {/* Windshield */}
            <path d="M -8 -8 L -6 -13 L 6 -13 L 8 -8 Z" fill="rgba(34,211,238,0.3)" />
          </g>

          {/* ── Top accent bar ── */}
          <rect x="30" y="14" width="40" height="2.5" rx="1.25" fill="url(#svacs-accent)" opacity="0.5" />
        </svg>
      </div>

      {/* ── Wordmark ── */}
      {showText && (
        <div className="shrink-0 flex flex-col justify-center whitespace-nowrap">

          {/* Main brand name */}
          <span
            style={{
              fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
              fontWeight: 900,
              fontSize: size * 0.52,
              letterSpacing: '0.08em',
              lineHeight: 1,
              color: textPrimary,
              textShadow: dark ? 'none' : '0 0 20px rgba(96,165,250,0.4)',
            }}
          >
            SVACS
          </span>

          {/* Tagline */}
          <span
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontWeight: 500,
              fontSize: size * 0.18,
              letterSpacing: '0.07em',
              color: textSub,
              marginTop: 2,
              textTransform: 'uppercase',
            }}
          >
            Smart Vehicle Access Control
          </span>
        </div>
      )}
    </div>
  );
};

export default SvacsLogo;
