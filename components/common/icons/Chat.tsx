interface ChatIconProps {
  className?: string
}

export default function ChatIcon({ className }: ChatIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="62" viewBox="0 0 40 62" fill="none">
      <path
        d="M36 35.7238C36 36.559 35.6254 37.3601 34.9586 37.9506C34.2918 38.5412 33.3874 38.873 32.4444 38.873H11.1111L4 45.1714V19.9778C4 19.1426 4.3746 18.3416 5.0414 17.751C5.70819 17.1604 6.61256 16.8286 7.55556 16.8286H32.4444C33.3874 16.8286 34.2918 17.1604 34.9586 17.751C35.6254 18.3416 36 19.1426 36 19.9778V35.7238Z"
        stroke="#3265B1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 23.0286C13.6 23.0286 24 23.0286 29 23.0286"
        stroke="#3265B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 28.3429C13.6 28.3429 24 28.3429 29 28.3429"
        stroke="#3265B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 33.6571C13.6 33.6571 24 33.6571 29 33.6571"
        stroke="#3265B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
