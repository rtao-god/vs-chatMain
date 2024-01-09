'use client'

import VsInput from '@/components/common/controls/VsInput/VsInput'
import styles from './page.module.scss'
import VsButton from '@/components/common/controls/VsButton/VsButton'
import VsCheckbox from '@/components/common/controls/VsCheckbox/VsCheckbox'
import { FormEventHandler, useState } from 'react'
import VsLink from '@/components/common/controls/VsLink/VsLink'
import AuthApi from '@/api/AuthApi'
import { useRouter } from 'next/navigation'
import { setAuthTokenClientSide } from '@/utils/auth.client'
import { useApiClientSide } from '@/hooks/common/api.client'
import { useForm } from '@/hooks/common/useForm'
import VsFormErrorMessage from '@/components/common/display/VsFormErrorMessage/VsFormErrorMessage'

export default function LoginPage() {
  const authApi = useApiClientSide(AuthApi)
  const router = useRouter()

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const form = useForm({
    initialFieldValues: {
      email: '',
      password: '',
      keepMeLoggedIn: false,
    },
    onSubmit: async ({ email, password, keepMeLoggedIn }) => {
      setIsLoggingIn(true)
      let token: string | undefined

      try {
        token = await authApi.login(email, password)
      } catch (error: unknown) {
        form.onSubmitError(error)
      }

      if (token) {
        setAuthTokenClientSide(token, keepMeLoggedIn)
        router.push('/')
      } else {
        setIsLoggingIn(false)
      }
    },
  })

  const onActualFormSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
  }

  const submitButtonLabel = isLoggingIn ? 'Logging in...' : 'Login'

  return (
    <main className={styles.root}>
      <form className={styles.content} onSubmit={onActualFormSubmit}>
        <h1 className={styles.title}>Login</h1>

        <VsFormErrorMessage errorMessage={form.errorMessage} isShown={!!form.errorMessage} />

        <VsInput
          className={styles.emailInput}
          label="Email"
          type="email"
          name="email"
          value={form.state.email}
          errorMessage={form.fieldErrorByName.email}
          onInput={email => form.setFieldValue('email', email)}
        />

        <VsInput
          className={styles.passwordInput}
          label="Password"
          type="password"
          name="password"
          value={form.state.password}
          errorMessage={form.fieldErrorByName.password}
          onInput={email => form.setFieldValue('password', email)}
        />

        <VsCheckbox
          className={styles.keepMeLoggedInCheckbox}
          label="Keep me logged in"
          value={form.state.keepMeLoggedIn}
          onChange={keepMeLoggedIn => form.setFieldValue('keepMeLoggedIn', keepMeLoggedIn)}
        />

        <VsButton className={styles.submitButton} isDisabled={isLoggingIn} onClick={form.onSubmit}>
          {submitButtonLabel}
        </VsButton>

        <VsLink className={styles.passwordResetLink} href="/reset-password" type="underline">
          Forgot password? (in development)
        </VsLink>
      </form>
    </main>
  )
}
