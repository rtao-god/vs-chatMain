'use client'

import Link from 'next/link'
import styles from './Navbar.module.scss'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  className?: string
  links: { name: string, href: string }[]
}

export default function Navbar({ className, links }: NavbarProps) {
  const pathname = usePathname()

  return (
    <div className={classNames(className, styles.root)}>
      <ul className={styles.list}>
        {links.map(({ name, href }) => (
          <li className={styles.item} key={href}>
            {pathname === href ? (
              <div className={styles.link}>
                <div className={classNames(styles.linkText, styles.linkTextActive)}>{name}</div>
              </div>
            ) : (
              <Link className={styles.link} href={href}>
                <div className={styles.linkText}>{name}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
