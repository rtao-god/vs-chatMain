'use client'

import VsInput from '@/components/common/controls/VsInput/VsInput'
import styles from './page.module.scss'
import VsButton from '@/components/common/controls/VsButton/VsButton'
import VsLink from '@/components/common/controls/VsLink/VsLink'
import { useState } from 'react'

export default function ResetPasswordPage() {
  const [isEmailSet, setIsEmailSet] = useState(false)
  const [email, setEmail] = useState('')

  if (isEmailSet) return (
    <main className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Done!</h1>
        <div className={styles.description}>
          We sent a message to <span className={styles.descriptionEmail}>{email}</span>, so you can choose your new password.
        </div>

        <VsLink className={styles.returnToLoginLinkPrimary} href="/login" type="primary">
          Return to login
        </VsLink>
      </div>
    </main>
  )

  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Reset your password</h1>
        <div className={styles.description}>Fear not. We'll email you instructions to reset your password.</div>

        <VsInput className={styles.emailInput} type="email" label="Email" value={email} onChange={setEmail} />

        <div className={styles.actions}>
          <VsButton onClick={() => setIsEmailSet(true)}>Reset</VsButton>
          <div className={styles.returnToLoginLinkWrap}>
            <VsLink className={styles.returnToLoginLinkSecondary} href="/login" type="secondary">
              Return to login
            </VsLink>
          </div>
        </div>
      </div>
    </main>
  )
}
