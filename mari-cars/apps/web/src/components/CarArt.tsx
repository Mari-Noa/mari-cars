/** Generic car silhouette used until real photography exists. Not any specific model. */
export function CarArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 150" className={className} fill="none" aria-hidden="true">
      <path
        d="M18 108c0-14 20-20 52-25l50-26c22-12 52-18 92-18h40c30 3 58 20 78 42l30 8c12 4 14 14 14 20v13H18z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M128 62l-26 20h112l-4-38h-30c-24 0-40 6-52 18zm100-18l4 38h72c-14-18-36-34-60-38z"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g fill="#0a0a0b" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2">
        <circle cx="96" cy="118" r="24" />
        <circle cx="312" cy="118" r="24" />
      </g>
      <g fill="currentColor" fillOpacity="0.5">
        <circle cx="96" cy="118" r="9" />
        <circle cx="312" cy="118" r="9" />
      </g>
      <path d="M0 143h400" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
    </svg>
  );
}
