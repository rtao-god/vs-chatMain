import { ChatListRequestOptions, ChatListResponse, ChatMessage, NewChatMessage } from '@/interfaces/api/admin/chats'
import Api from '../base/Api'
import { PaginatedResponse } from '@/interfaces/api/admin/base'

export default class ChatsApi extends Api {
  async fetchChatList(options: ChatListRequestOptions = { page: 1 }): Promise<ChatListResponse> {
    if (!options.page) options.page = 1

    const queryOptions: [string, string][] = [['page', options.page.toString()]]

    if (typeof options.operatorId === 'number' || typeof options.operatorId === 'string') {
      queryOptions.push(['user_id', options.operatorId.toString()])
    }

    if (typeof options.departmentId === 'number' || typeof options.departmentId === 'string') {
      queryOptions.push(['department_id', options.departmentId.toString()])
    }

    const stringifiedQueryOptions = queryOptions.map(([key, value]) => `${key}=${value}`).join('&')

    const chatList = this.query({ path: `/chats?${stringifiedQueryOptions}` })
    return chatList
  }

  async fetchChatMessages(
    chatId: number | string,
    dateFrom: Date,
    page: number,
    perPage: number
  ): Promise<PaginatedResponse<ChatMessage>> {
    const chatMessages = this.query({
      path: `/chats/${chatId}/messages?date_from=${dateFrom.toISOString()}&page=${page}&per_page=${perPage}`,
    })
    return chatMessages
  }

  async sendMessage(chatId: number | string, message: NewChatMessage): Promise<void> {
    const body = new FormData()
    body.append('message', message.message)

    for (let i = 0; i < message.files.length; i++) {
      body.append('files.' + i, message.files[i])
    }

    await this.query({ path: `/chats/${chatId}/messages`, method: 'POST', body })
  }
}
