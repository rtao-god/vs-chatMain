interface ArrowLeftProps {
  className?: string
}

export default function ArrowLeft({ className }: ArrowLeftProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M1.29289 9.29289C0.902369 9.68342 0.902369 10.3166 1.29289 10.7071L7.65685 17.0711C8.04738 17.4616 8.68054 17.4616 9.07107 17.0711C9.46159 16.6805 9.46159 16.0474 9.07107 15.6569L3.41421 10L9.07107 4.34315C9.46159 3.95262 9.46159 3.31946 9.07107 2.92893C8.68054 2.53841 8.04738 2.53841 7.65685 2.92893L1.29289 9.29289ZM18 11C18.5523 11 19 10.5523 19 10C19 9.44772 18.5523 9 18 9V11ZM2 11H18V9H2V11Z"
        fill="#6D717F"
      />
    </svg>
  )
}
