import ChatsApi from '@/api/admin/ChatsApi'
import StaffChatProvider from '@/api/admin/StaffChatProvider'
import Api from '@/api/base/Api'
import { AuthError } from '@/api/base/errors'
import { addMiddleware, createErrorHandlerMiddleware } from '@/api/base/middlewares'
import { EntityWithId, PaginatedResponse } from '@/interfaces/api/admin/base'
import { ApiSettings } from '@/interfaces/api/base'
import { Chat, ChatProvider } from '@/interfaces/api/admin/chats'
import { getAuthTokenClientSide } from '@/utils/auth.client'
import { useRouter } from 'next/navigation'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'

export function useApiClientSide<T extends Api>(apiConstructor: new (settings: ApiSettings) => T): T {
  const router = useRouter()
  const apiInstance = useMemo(() => {
    const authToken = getAuthTokenClientSide()
    const apiInstance = new apiConstructor({ authToken })

    const handleQueryError = (error: unknown) => {
      if (error instanceof AuthError) {
        router.push('/login')
      }

      throw error
    }

    const errorHandlerMiddleware = createErrorHandlerMiddleware(handleQueryError)
    const apiInstanceWithMiddleware = addMiddleware(apiInstance, errorHandlerMiddleware)
    return apiInstanceWithMiddleware
  }, [apiConstructor])

  return apiInstance
}

export function useFractionalLoading<ListDataType extends EntityWithId, ApiType extends Api>(
  intialListRespone: PaginatedResponse<ListDataType>,
  apiConstructor: new (settings: ApiSettings) => ApiType,
  queryMethodName: keyof ApiType,
  queryMethodOptions: Record<any, any> = {}
): [ListDataType[], MutableRefObject<HTMLDivElement | null>] {
  const api = useApiClientSide(apiConstructor)
  api.isSameQueryCancellingEnabled = true

  const [list, setList] = useState(intialListRespone.data)
  const trackingEl = useRef<HTMLDivElement | null>(null)

  const loadNextPageIfNeeded = async () => {
    if (!trackingEl.current) return
    if (list.length === intialListRespone.total) return

    const trackingElClientRect = trackingEl.current.getBoundingClientRect()
    if (trackingElClientRect.bottom > window.innerHeight) return

    const nextListPage = list.length / intialListRespone.per_page + 1

    const queryMethod = api[queryMethodName]
    if (typeof queryMethod !== 'function') return

    try {
      queryMethodOptions.page = nextListPage
      const nextListResponse: PaginatedResponse<ListDataType> = await queryMethod.call(api, queryMethodOptions)
      const newList = list.filter(item => !nextListResponse.data.some(newItem => newItem.id === item.id))
      newList.push(...nextListResponse.data)
      setList(newList)
      loadNextPageIfNeeded()
    } catch {}
  }

  useEffect(() => {
    loadNextPageIfNeeded()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', loadNextPageIfNeeded)
    return () => window.removeEventListener('scroll', loadNextPageIfNeeded)
  })

  return [list, trackingEl]
}

export function useChatProvider(chat: Chat): ChatProvider {
  const chatsApi = useApiClientSide(ChatsApi)
  const chatProvider = StaffChatProvider.forChat(chatsApi, chat)
  return chatProvider
}
