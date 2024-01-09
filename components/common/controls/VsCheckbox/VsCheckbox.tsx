'use client'

import classNames from 'classnames'
import styles from './VsCheckbox.module.scss'
import { ChangeEventHandler } from 'react'

interface VsCheckboxProps {
  label: string
  value?: boolean
  className?: string
  onChange?: (newValue: boolean) => void
}

export default function VsCheckbox({ label, value, className, onChange }: VsCheckboxProps) {

  const onChangeLocal: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.checked)
  }

  return (
    <label className={classNames(styles.root, className)}>
      <input type="checkbox" className={styles.input} checked={value} onChange={onChangeLocal} />
      <div className={styles.view}></div>
      <div className={styles.label}>{label}</div>
    </label>
  )
}
