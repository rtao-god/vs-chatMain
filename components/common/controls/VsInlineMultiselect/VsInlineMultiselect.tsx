'use client'

import { Option } from '@/interfaces/common/options'
import styles from './VsInlineMultiselect.module.scss'
import { useNormalizedOptions } from '@/hooks/common/decorators'
import PlusIcon from '@/components/common/icons/Plus'
import classNames from 'classnames'

interface VsInlineMultiselectProps<OptionValueType> {
  selectedValues: OptionValueType[]
  options: Option<OptionValueType>[]
  className?: string
  onSelect?: (selectedValue: OptionValueType) => void
  onDeselect?: (deselectedValue: OptionValueType) => void
  onChange?: (selectedValues: OptionValueType[]) => void
}

export default function VsInlineMultiselect<OptionValueType>({
  selectedValues,
  options,
  className,
  onSelect,
  onDeselect,
  onChange,
}: VsInlineMultiselectProps<OptionValueType>) {
  const [normalizedOptions] = useNormalizedOptions(options)

  const isOptionSelected = (optionValue: OptionValueType) => {
    return selectedValues.some(selectedValue => selectedValue === optionValue)
  }

  const onOptionToggle = (optionValue: OptionValueType) => {
    if (isOptionSelected(optionValue)) {
      // Fot optimization purposes
      if (onChange) {
        const newSelectedValues = selectedValues.filter(selectedValue => selectedValue !== optionValue)
        onChange?.(newSelectedValues)
      }

      onDeselect?.(optionValue)
    } else {
      if (onChange) {
        const newSelectedValues = [...selectedValues, optionValue]
        onChange?.(newSelectedValues)
      }

      onSelect?.(optionValue)
    }
  }

  return (
    <div className={classNames(styles.root, className)}>
      <ul className={styles.optionsWrap}>
        {normalizedOptions.map(option => (
          <li
            key={option.normalizedValue}
            className={classNames(styles.option, isOptionSelected(option.value) && styles.optionSelected)}
          >
            <span className={styles.optionName}>{option.name}</span>

            <button className={styles.optionToggle} onClick={() => onOptionToggle(option.value)}>
              <PlusIcon
                className={classNames(
                  styles.optionToggleIcon,
                  isOptionSelected(option.value) && styles.optionToggleIconSelected
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
