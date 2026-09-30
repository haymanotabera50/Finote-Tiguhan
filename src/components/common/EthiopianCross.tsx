import React from 'react';

interface CrossProps {
  className?: string;
  size?: number;
  variant?: 'lalibela' | 'simple' | 'ornate';
}

export const EthiopianCross: React.FC<CrossProps> = ({ 
  className = "text-amber-400", 
  size = 24, 
  variant = 'lalibela' 
}) => {
  if (variant === 'simple') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
      >
        <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
        <circle cx="12" cy="10" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    );
  }

  // Authentic Lalibela / Gondar pierced cross pattern
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="currentColor" 
      className={className}
    >
      {/* Top Finial */}
      <path d="M30 4h4v6h-4z" />
      <circle cx="32" cy="3" r="2" />
      
      {/* Center Body */}
      <path d="M29 10h6v12h12v6h-12v18h-6V28H17v-6h12V10z" />
      
      {/* Upper Cross arms accents */}
      <path d="M26 12h12v4H26z" />
      <path d="M12 25h6v12h-6z" />
      <path d="M46 25h6v12h-6z" />
      
      {/* Geometric perforations (characteristic of Ethiopian Brass/Wood Crosses) */}
      <rect x="30.5" y="14" width="3" height="3" fill="#081716" />
      <rect x="20" y="27" width="3" height="3" fill="#081716" />
      <rect x="41" y="27" width="3" height="3" fill="#081716" />
      <rect x="30.5" y="36" width="3" height="3" fill="#081716" />
      <circle cx="32" cy="25" r="2" fill="#081716" />

      {/* Traditional lower base handle / finials */}
      <path d="M27 46h10v3h-10z" />
      <path d="M25 49h14v3H25z" />
      <path d="M28 52h8v8h-8z" />
      <path d="M24 60h16v2H24z" />
    </svg>
  );
};

