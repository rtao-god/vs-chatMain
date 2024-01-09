import { Option } from '@/interfaces/common/options'

export function mapOptions<T extends Record<string, any>>(list: T[], nameBy: keyof T) {
  return list.map(item => ({ name: item[nameBy] as string, value: item }))
}

export function generateNumericOptions(count: number) {
  const result: Option<number>[] = []
  for (let i = 1; i <= count; i++) {
    result.push({ name: i.toString(), value: i })
  }

  return result
}
