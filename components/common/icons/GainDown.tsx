interface GainDownIconProps {
  className?: string
}

export default function GainDownIcon({ className }: GainDownIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_165_11842)">
        <circle cx="8" cy="8" r="8" fill="#EBF0F7" />
        <path
          d="M7.57574 12.4243C7.81005 12.6586 8.18995 12.6586 8.42426 12.4243L12.2426 8.60589C12.477 8.37157 12.477 7.99167 12.2426 7.75736C12.0083 7.52304 11.6284 7.52304 11.3941 7.75736L8 11.1515L4.60589 7.75736C4.37157 7.52304 3.99167 7.52304 3.75736 7.75736C3.52304 7.99167 3.52304 8.37157 3.75736 8.60589L7.57574 12.4243ZM8.6 4C8.6 3.66863 8.33137 3.4 8 3.4C7.66863 3.4 7.4 3.66863 7.4 4L8.6 4ZM8.6 12L8.6 4L7.4 4L7.4 12L8.6 12Z"
          fill="#CB4123"
        />
      </g>
      <defs>
        <clipPath id="clip0_165_11842">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
