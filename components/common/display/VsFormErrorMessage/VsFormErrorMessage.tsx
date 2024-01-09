'use client'

import React from 'react'
import styles from "./VsFormErrorMessage.module.scss"
import ErrorIcon from '../../icons/Error'
import classNames from 'classnames'

interface VsFormErrorMessageProps {
  errorMessage?: string | null
  className?: string
  isShown?: boolean
}

function VsFormErrorMessage({ errorMessage, className, isShown }: VsFormErrorMessageProps) {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={classNames(styles.content, isShown && styles.contentShown)}>
        <ErrorIcon className={styles.icon} />
        {errorMessage}
      </div>
    </div>
  )
}

export default VsFormErrorMessage
