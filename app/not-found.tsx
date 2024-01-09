import Header from '@/components/common/layout/Header/Header'
import styles from './not-found.module.scss'
import Image from 'next/image'

export default function NotFoundPage() {
  return (
    <div className={styles.root}>
      <Header />

      <main className={styles.main}>
        <Image className={styles.image} width={648} height={327} src="/images/not-found-error.svg" alt="Not found" />
        <h1 className={styles.title}>Oops! Page not found</h1>
        <div className={styles.description}>The page you are looking for not available!</div>
      </main>
    </div>
  )
}
