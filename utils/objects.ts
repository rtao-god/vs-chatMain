export function createFieldProxy<S extends object, D extends object>(
  sourceObject: S,
  destObject: D,
  fieldName: keyof S
) {
  Object.defineProperty(destObject, fieldName, {
    get() {
      return sourceObject[fieldName]
    },
    set(value: any) {
      sourceObject[fieldName] = value
    },
  })
}
