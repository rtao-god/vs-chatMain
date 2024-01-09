import Link from 'next/link'
import styles from './VsMoreLink.module.scss'
import ArrowRightIcon from '@/components/common/icons/ArrowRight'
import classNames from 'classnames'

interface VsMoreLinkProps {
  href: string
  className?: string
}

export default function VsMoreLink({ href, className }: VsMoreLinkProps) {
  return (
    <Link className={classNames(styles.root, className)} href={href}>
      <div className={styles.content}>
        <span className={styles.text}>More</span>
        <ArrowRightIcon className={styles.icon} />
      </div>
    </Link>
  )
}
