import styles from './VsArrowButton.module.scss'
import ArrowRightIcon from '@/components/common/icons/ArrowRight'

interface VsArrowButtonProps {
  onClick?: () => void
  children?: React.ReactNode
}

export default function VsArrowButton({ children, onClick }: VsArrowButtonProps) {
  return (
    <button className={styles.root} onClick={onClick}>
      <div className={styles.content}>
        <span className={styles.text}>{children}</span>
        <ArrowRightIcon className={styles.icon} />
      </div>
    </button>
  )
}
