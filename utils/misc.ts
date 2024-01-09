let lastId = 0
export function nextId() {
  return 'autoid-' + lastId++
}

export function resetNextIdCounter() {
  lastId = 0
}

export function mapBy<T, K extends keyof T>(list: T[], fieldName: K): Map<T[K], T> {
  const result = new Map<T[K], T>()
  for (const item of list) {
    result.set(item[fieldName], item)
  }
  return result
}
