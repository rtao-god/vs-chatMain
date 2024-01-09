import classNames from 'classnames'
import styles from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={classNames(styles.root, className)}>
      <img src="/icons/logo.svg" alt="Logo" />
    </header>
  )
}
