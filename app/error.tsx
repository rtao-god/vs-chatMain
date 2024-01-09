'use client'

import Header from '@/components/common/layout/Header/Header'
import styles from './error.module.scss'
import Image from 'next/image'

export default function ErrorPage() {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Oops!</h1>
        <div className={styles.description}>We are working on fixing the problem. Be back soon.</div>
        <Image className={styles.image} width={1440} height={382} src="/images/server-error.svg" alt="Server error" />
      </main>
    </div>
  )
}
