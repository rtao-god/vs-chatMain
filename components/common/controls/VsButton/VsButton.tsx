import classNames from 'classnames'
import styles from './VsButton.module.scss'
import { capitalize } from '@/utils/strings'

interface VsButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'medium' | 'small'
  type?: 'primary' | 'danger'
  isDisabled?: boolean
  onClick?: () => void
}

export default function VsButton({
  children,
  className,
  size = 'medium',
  type = 'primary',
  isDisabled,
  onClick,
}: VsButtonProps) {
  return (
    <button
      className={classNames(
        styles.root,
        styles['root' + capitalize(size)],
        styles['root' + capitalize(type)],
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
