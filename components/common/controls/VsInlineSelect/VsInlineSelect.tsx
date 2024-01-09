'use client'

import { ChangeEventHandler, useState } from 'react'
import styles from './VsInlineSelect.module.scss'
import { nextId } from '@/utils/misc'
import { useNormalizedOptions } from '@/hooks/common/decorators'
import classNames from 'classnames'

interface VsInlineSelect<OptionValueType> {
  label: string
  value?: string
  options: { name: string; value: OptionValueType }[]
  className?: string
  onChange?: (selectedOption: { name: string; value: OptionValueType }) => void
}

export default function VsInlineSelect<OptionValueType = string>({
  label,
  value,
  options,
  className,
  onChange,
}: VsInlineSelect<OptionValueType>) {
  const [id] = useState(nextId)
  const [normalizedOptions, optionsByNormalizedValue] = useNormalizedOptions(options)

  const onChangeLocal: ChangeEventHandler<HTMLSelectElement> = event => {
    const newValue = event.target.value
    const option = optionsByNormalizedValue.get(newValue)!
    onChange?.(option)
  }

  return (
    <div className={classNames(styles.root, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <select className={styles.select} id={id} value={value} onChange={onChangeLocal}>
        {normalizedOptions.map(option => (
          <option key={option.normalizedValue} value={option.normalizedValue}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
