import { NormalizedOption, Option } from '@/interfaces/common/options'
import { useMemo } from 'react'

export function useNormalizedOptions<OptionValueType>(
  options: Option<OptionValueType>[]
): [NormalizedOption<OptionValueType>[], Map<string, Option<OptionValueType>>] {
  return useMemo(() => {
    let counter = 0

    const nextNormalizedValue = () => {
      counter++
      return 'value-' + counter
    }

    const normalizedOptions: NormalizedOption<OptionValueType>[] = []
    const optionsByNormalizedValue = new Map<string, Option<OptionValueType>>()

    for (const option of options) {
      const normalizedValue = nextNormalizedValue()
      const normalizedOption = {
        normalizedValue,
        value: option.value,
        name: option.name,
      }

      normalizedOptions.push(normalizedOption)
      optionsByNormalizedValue.set(normalizedValue, option)
    }

    return [normalizedOptions, optionsByNormalizedValue]
  }, [options])
}
