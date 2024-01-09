interface ChevronRightProps {
  className?: string
}

export default function ChevronRightIcon({ className }: ChevronRightProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M9 18L15 12L9 6" stroke="#2A2D34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
