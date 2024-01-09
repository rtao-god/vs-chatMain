import classNames from 'classnames'
import styles from './VsLink.module.scss'
import { capitalize } from '@/utils/strings'
import Link from 'next/link'

interface VsLinkProps {
  children: React.ReactNode
  className?: string
  type?: 'primary' | 'secondary' | 'underline' | 'outline'
  href: string
  onClick?: () => void
}

export default function VsLink({ children, className, type = 'primary', href, onClick }: VsLinkProps) {
  return (
    <Link
      className={classNames(styles.root, styles['root' + capitalize(type)], className)}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
