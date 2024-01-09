'use client'
import { FocusEventHandler, FormEventHandler, useState } from 'react'
import styles from './VsInput.module.scss'
import { nextId } from '@/utils/misc'
import classNames from 'classnames'
import ErrorIcon from '../../icons/Error'

interface VsInputProps<ValueType> {
  label?: string
  addonIcon?: React.ReactElement
  value?: ValueType
  className?: string
  type?: string
  name?: string
  placeholder?: string
  errorMessage?: string | null | false
  autoComplete?: string
  onInput?: (value: ValueType) => void
  onChange?: (value: ValueType) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
}

export default function VsInput<ValueType extends string | number | readonly string[]>({
  label,
  addonIcon,
  value,
  type = 'text',
  name,
  placeholder,
  className,
  errorMessage,
  autoComplete,
  onInput,
  onChange,
  onBlur,
  onFocus,
}: VsInputProps<ValueType>) {
  const [id] = useState(nextId)

  const inputClassName = classNames(styles.input, addonIcon && styles.inputWithAddon, errorMessage && styles.inputWithError)

  const onInputLocal: FormEventHandler<HTMLInputElement> = event => {
    onInput?.(event.currentTarget.value as ValueType)
  }

  const onChangeLocal: FormEventHandler<HTMLInputElement> = event => {
    onChange?.(event.currentTarget.value as ValueType)
  }

  return (
    <div className={classNames(styles.root, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          className={inputClassName}
          value={value ?? ''}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onInput={onInputLocal}
          onChange={onChangeLocal}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {addonIcon && <div className={styles.addonIcon}>{addonIcon}</div>}
      </div>

      <div className={styles.errorMessageWrap}>
        <div className={classNames(styles.errorMessage, !errorMessage && styles.errorMessageHidden)}>
          <ErrorIcon className={styles.errorMessageIcon} />
          {errorMessage}
        </div>
      </div>
    </div>
  )
}
