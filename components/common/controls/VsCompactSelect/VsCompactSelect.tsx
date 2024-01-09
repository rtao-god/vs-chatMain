'use client'

import { ChangeEventHandler } from 'react'
import styles from './VsCompactSelect.module.scss'
import { useNormalizedOptions } from '@/hooks/common/decorators'
import classNames from 'classnames'

interface VsCompactSelect<OptionValueType> {
  value?: OptionValueType
  options: { name: string; value: OptionValueType }[]
  className?: string
  onChange?: (selectedOption: { name: string; value: OptionValueType }) => void
}

export default function VsCompactSelect<OptionValueType = string>({
  value,
  options,
  className,
  onChange,
}: VsCompactSelect<OptionValueType>) {
  const [normalizedOptions, optionsByNormalizedValue] = useNormalizedOptions(options)

  const onChangeLocal: ChangeEventHandler<HTMLSelectElement> = event => {
    const newValue = event.target.value
    const option = optionsByNormalizedValue.get(newValue)!
    onChange?.(option)
  }

  const normalizedValue = normalizedOptions.find(option => option.value === value)?.normalizedValue

  return (
    <select className={classNames(styles.root, className)} value={normalizedValue} onChange={onChangeLocal}>
      {normalizedOptions.map(option => (
        <option key={option.normalizedValue} value={option.normalizedValue}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
