const authTokenKey = 'VSAdminAuth'

function getCookieValue(cookieName: string) {
  if (!globalThis.document) return null
  
  const searchingCookieComponentPrefix = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieComponents = decodedCookie.split(';')
  for (let i = 0; i < cookieComponents.length; i++) {
    const cookieComponent = cookieComponents[i].trimStart()

    if (cookieComponent.startsWith(searchingCookieComponentPrefix)) {
      return cookieComponent.substring(searchingCookieComponentPrefix.length, cookieComponent.length)
    }
  }
  return null
}

export function setAuthTokenClientSide(token: string, isPreserved: boolean) {
  let authCookie = `${authTokenKey}=${token}; SameSite=Lax; Secure`

  const expireDate = new Date()
  expireDate.setMonth(expireDate.getMonth() + 1)
  const stringifiedExpireDate = expireDate.toUTCString()

  if (isPreserved) authCookie += `; Expires=${stringifiedExpireDate}`

  document.cookie = authCookie
}

export function getAuthTokenClientSide() {
  return getCookieValue(authTokenKey)
}
