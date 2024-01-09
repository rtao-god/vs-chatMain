'use client'
import React, { ChangeEventHandler, useMemo, useState } from 'react'
import styles from './VsSelect.module.scss'
import { nextId } from '@/utils/misc'
import { useNormalizedOptions } from '@/hooks/common/decorators'
import { Option } from '@/interfaces/common/options'
import classNames from 'classnames'

interface VsSelectProps<OptionValueType> {
  label?: string
  value?: OptionValueType
  options: Option<OptionValueType>[]
  className?: string
  onChange?: (selectedOption: Option<OptionValueType>) => void
}

export default function VsSelect<OptionValueType = string>({
  options,
  onChange,
  value,
  label,
  className,
}: VsSelectProps<OptionValueType>) {
  const [id] = useState(nextId)
  const [normalizedOptions, optionsByNormalizedValue] = useNormalizedOptions(options)

  const onChangeLocal: ChangeEventHandler<HTMLSelectElement> = event => {
    const newValue = event.target.value
    const option = optionsByNormalizedValue.get(newValue)!
    onChange?.(option)
  }

  const normalizedValue = useMemo(() => {
    let newValue
    optionsByNormalizedValue.forEach((option, optionIndex) => {
      if (option.value === value) {
        newValue = optionIndex
        return
      }
    })
    return newValue
  }, [value, options])

  return (
    <div className={classNames(styles.root, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <select className={styles.select} id={id} value={normalizedValue} onChange={onChangeLocal}>
        {normalizedOptions.map(option => (
          <option key={option.normalizedValue} value={option.normalizedValue} className={styles.selectOption}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
