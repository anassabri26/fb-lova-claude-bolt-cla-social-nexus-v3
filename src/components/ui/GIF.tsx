import React from 'react';

interface GIFProps {
  className?: string;
}

const GIF: React.FC<GIFProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 10v4" />
      <path d="M12 10v4" />
      <path d="M16 10v2" />
      <path d="M16 14v0" />
    </svg>
  );
};

export default GIF;