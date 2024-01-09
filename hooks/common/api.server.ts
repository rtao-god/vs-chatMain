import Api from '@/api/base/Api'
import { AuthError } from '@/api/base/errors'
import { addMiddleware, createErrorHandlerMiddleware } from '@/api/base/middlewares'
import { ApiSettings } from '@/interfaces/api/base'
import { getAuthTokenServerSide } from '@/utils/auth.server'
import { redirect } from 'next/navigation'

export function useApiServerSide<T extends Api>(
  apiConstructor: new (settings: ApiSettings) => T
): T {
  const authToken = getAuthTokenServerSide()
  const apiInstance = new apiConstructor({ authToken })

  const handleQueryError = (error: unknown) => {
    if (error instanceof AuthError) {
      redirect('/login')
    }

    throw error
  }

  const errorHandlerMiddleware = createErrorHandlerMiddleware(handleQueryError)
  const apiInstanceWithMiddleware = addMiddleware(apiInstance, errorHandlerMiddleware)
  return apiInstanceWithMiddleware
}
