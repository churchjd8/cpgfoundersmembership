export function BreakthroughLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arrow breaking through a barrier */}
      <rect x="0" y="0" width="48" height="48" rx="10" fill="#b45309" />
      <path
        d="M14 32L24 16L34 32"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="24" y1="16" x2="24" y2="10" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="26" x2="38" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Text */}
      <text x="56" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" fill="currentColor">
        90-DAY
      </text>
      <text x="56" y="40" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="14" fill="currentColor" opacity="0.7">
        BREAKTHROUGH
      </text>
    </svg>
  );
}

export function BabuLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brain/AI chat icon */}
      <rect x="0" y="0" width="48" height="48" rx="10" fill="#1c1917" />
      <circle cx="24" cy="20" r="9" stroke="white" strokeWidth="2.5" />
      <path
        d="M19 20C19 20 21 23 24 23C27 23 29 20 29 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="21" cy="17" r="1.5" fill="white" />
      <circle cx="27" cy="17" r="1.5" fill="white" />
      <path
        d="M20 32L16 38H32L28 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Text */}
      <text x="56" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" fill="currentColor">
        BABU
      </text>
      <text x="56" y="40" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="12" fill="currentColor" opacity="0.7">
        CPG AI ADVISOR
      </text>
    </svg>
  );
}

export function MbaLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation cap icon */}
      <rect x="0" y="0" width="48" height="48" rx="10" fill="#92400e" />
      <path
        d="M12 22L24 16L36 22L24 28Z"
        fill="white"
      />
      <path
        d="M18 25V33C18 33 21 36 24 36C27 36 30 33 30 33V25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="36" y1="22" x2="36" y2="34" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="35" r="1.5" fill="white" />
      {/* Text */}
      <text x="56" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" fill="currentColor">
        MBA
      </text>
      <text x="56" y="40" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="14" fill="currentColor" opacity="0.7">
        FOR CPG
      </text>
    </svg>
  );
}

export function VipDayLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Diamond/star premium icon */}
      <rect x="0" y="0" width="48" height="48" rx="10" fill="#1c1917" />
      <path
        d="M16 20H32L36 26L24 38L12 26Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 20L20 26M32 20L28 26M24 14V20M12 26H36"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M24 14L26 18L24 20L22 18Z"
        fill="white"
        opacity="0.8"
      />
      {/* Text */}
      <text x="56" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" fill="currentColor">
        VIP DAY
      </text>
      <text x="56" y="40" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="14" fill="currentColor" opacity="0.7">
        WITH JEFF
      </text>
    </svg>
  );
}
