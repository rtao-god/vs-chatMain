import { ApiSettings } from '@/interfaces/api/base'
import { AuthError, ConnectionError, InternalServerError, PayloadError, SameQueryError } from './errors'
import { areEqual } from '@/utils/arrays'

interface QueryOptions {
  path: string
  method?: string
  body?: Record<string, any> | FormData
}

interface PendingQuery {
  identity: any[]
  promise: Promise<any>
}

export default class Api {
  static readonly baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL!

  private static getRequestUrl(endpoint: string): string {
    return `${Api.baseUrl}${endpoint}`
  }

  private authToken?: string | null

  constructor({ authToken }: ApiSettings) {
    this.authToken = authToken
  }

  protected async _query({ path, method, body }: QueryOptions): Promise<any> {
    console.log(`[${new Date().toLocaleTimeString()}] [${method}] ${path}`)
    const serializedBody = body instanceof FormData ? body : JSON.stringify(body)

    const headers: Record<string, any> = {
      Accept: 'application/json',
    }

    if (body) headers['Content-Type'] = 'application/json'
    if (this.authToken) headers.Authorization = `Bearer ${this.authToken}`

    const requestOptions: RequestInit = {
      method,
      body: serializedBody,
      headers,
      cache: 'no-cache',
    }

    let response: Response | undefined
    let parsedResponse: any

    try {
      const requestUrl = Api.getRequestUrl(path)
      response = await fetch(requestUrl, requestOptions)
      parsedResponse = await response.json()
    } catch {
      if (!response) throw new ConnectionError()
    }

    if (response.status >= 500) throw new InternalServerError()

    if (response.status === 401 || response.status === 403) {
      if (parsedResponse?.message && parsedResponse?.errors)
        throw new AuthError(parsedResponse.message, parsedResponse.errors)
      if (parsedResponse?.error) throw new AuthError(parsedResponse.error)
      throw new AuthError('Unknown error')
    }

    if (response.status >= 400 && response.status < 500) {
      if (parsedResponse?.message && parsedResponse?.errors)
        throw new PayloadError(parsedResponse.message, parsedResponse.errors)
      if (parsedResponse?.error) throw new PayloadError(parsedResponse.error)
      throw new PayloadError('Unknown error')
    }

    return parsedResponse
  }

  isSameQueryCancellingEnabled = false
  isSameQueryJoiningEnabled = false

  private _pendingQueries: PendingQuery[] = []

  protected async query({ path, method = 'GET', body }: QueryOptions) {
    if (!this.isSameQueryCancellingEnabled && !this.isSameQueryJoiningEnabled) return this._query({ path, method, body })

    const newQueryIdentity = [path, method, body]
    const sameQuery = this._pendingQueries.find(pendingQuery => areEqual(pendingQuery.identity, newQueryIdentity))
    if (sameQuery) {
      if (this.isSameQueryCancellingEnabled) throw new SameQueryError()
      if (this.isSameQueryJoiningEnabled) return sameQuery.promise
    }

    const newQueryPromise = this._query({ path, method, body })
    const newPendingQuery = { identity: newQueryIdentity, promise: newQueryPromise }

    this._pendingQueries.push(newPendingQuery)

    try {
      const newQueryResult = await newQueryPromise
      this._pendingQueries = this._pendingQueries.filter(pendingQuery => newPendingQuery !== pendingQuery)
      return newQueryResult
    } catch (error) {
      this._pendingQueries = this._pendingQueries.filter(pendingQuery => newPendingQuery !== pendingQuery)
      throw error
    }
  }
}
