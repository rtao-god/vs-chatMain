import { cookies } from "next/headers"

const authTokenKey = 'VSAdminAuth'

export function getAuthTokenServerSide() {
  return cookies().get(authTokenKey)?.value
}
