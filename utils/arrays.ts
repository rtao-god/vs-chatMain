export function areEqual(array1: any[], array2: any[]) {
  let result = true
  if (array1.length !== array2.length) return false
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) result = false
  }
  return result
}
