import Header from '@/components/common/layout/Header/Header'
import styles from './layout.module.scss'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
      <footer className={styles.footer}>
        © 2023 All rights reserved.
      </footer>
    </div>
  )
}
