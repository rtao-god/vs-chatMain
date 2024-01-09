interface PlusIconProps {
  className?: string
}

export default function PlusIcon({ className }: PlusIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7.99999 2.34315V13.6569"
        stroke="#6D717F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.34314 8H13.6568" stroke="#6D717F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
