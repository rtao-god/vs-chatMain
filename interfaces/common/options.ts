export interface Option<ValueType> {
  name: string
  value: ValueType
}

export interface NormalizedOption<ValueType> {
  name: string
  value: ValueType
  normalizedValue: string
}
