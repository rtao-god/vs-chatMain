export function capitalize(str: string) {
  if (!str) return str
  return str[0].toUpperCase() + str.substring(1)
}