import Link from 'next/link'
import styles from './VsBackLink.module.scss'
import ArrowLeftIcon from '@/components/common/icons/ArrowLeft'
import classNames from 'classnames'

interface VsBackLinkProps {
  href: string
  label?: string
  className?: string
}

export default function VsBackLink({ href, label = 'Back', className }: VsBackLinkProps) {
  return (
    <Link className={classNames(styles.root, className)} href={href}>
      <div className={styles.content}>
        <ArrowLeftIcon className={styles.icon} />
        <span className={styles.text}>{label}</span>
      </div>
    </Link>
  )
}
