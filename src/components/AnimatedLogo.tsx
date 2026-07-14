import React from 'react';

interface AnimatedLogoProps {
  className?: string;
  variant: 'dark' | 'light';
}

export default function AnimatedLogo({ className = '', variant }: AnimatedLogoProps) {
  const textColor = variant === 'dark' ? '#05164D' : '#FFFFFF';
  const textMuted = variant === 'dark' ? '#64748B' : '#94A3B8';
  
  // Exact ValueCoders brand colors
  const navy = '#05164D';
  const azure = '#2563EB';
  const amber = '#F59E0B';

  return (
    <svg 
      className={className} 
      viewBox="0 0 260 40" 
      height="32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`grad-faces-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={azure} stopOpacity="0.8" />
          <stop offset="100%" stopColor={navy} stopOpacity="0.9" />
        </linearGradient>
        
        <linearGradient id={`grad-text-${variant}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={azure}>
            <animate attributeName="stop-color" values={`${azure};${amber};${azure}`} dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={navy}>
             <animate attributeName="stop-color" values={`${navy};${azure};${navy}`} dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <filter id={`glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            .brand-text {
              font-family: var(--font-plus-jakarta-sans), system-ui, sans-serif;
            }
          `}
        </style>
        
        {/* Realistic 3D Gradients tied to Text Colors */}
      </defs>

      {/* --- ICON: Provided PNG --- */}
      <g transform="translate(0, 0)">
        <image 
          href="/logo-icon.png" 
          x="2" 
          y="2" 
          width="36" 
          height="36" 
          preserveAspectRatio="xMidYMid meet" 
        />
      </g>

      {/* --- TYPOGRAPHY --- */}
      {/* We use a single text element with dominantBaseline for mathematically perfect vertical and horizontal alignment */}
      <g className="brand-text">
        <text 
          x="44" 
          y="20" 
          fontSize="24" 
          fontWeight="800" 
          dominantBaseline="central"
          letterSpacing="-0.5"
        >
          <tspan fill={textColor}>Digital </tspan>
          <tspan fill="#f0a000">Curd</tspan>
        </text>
      </g>
    </svg>
  );
}
