interface CheckIconProps {
  className?: string
}

export default function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="62" viewBox="0 0 40 62" fill="none">
      <path
        d="M35 21L14.375 41L5 31.9091"
        stroke="#3265B1"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
