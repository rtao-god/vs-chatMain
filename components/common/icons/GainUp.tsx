interface GainUpIconProps {
  className?: string
}

export default function GainUpIcon({ className }: GainUpIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_165_11828)">
        <circle cx="8" cy="8" r="8" fill="#EBF0F7" />
        <path
          d="M7.4 12C7.4 12.3314 7.66863 12.6 8 12.6C8.33137 12.6 8.6 12.3314 8.6 12L7.4 12ZM8.42426 3.57574C8.18995 3.34142 7.81005 3.34142 7.57574 3.57574L3.75736 7.39411C3.52304 7.62843 3.52304 8.00833 3.75736 8.24264C3.99167 8.47696 4.37157 8.47696 4.60589 8.24264L8 4.84853L11.3941 8.24264C11.6284 8.47696 12.0083 8.47696 12.2426 8.24264C12.477 8.00833 12.477 7.62843 12.2426 7.39411L8.42426 3.57574ZM8.6 12L8.6 4L7.4 4L7.4 12L8.6 12Z"
          fill="#3265B1"
        />
      </g>
      <defs>
        <clipPath id="clip0_165_11828">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
