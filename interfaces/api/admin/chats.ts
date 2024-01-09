import { ChatProvider as _ChatProvider } from 'vs_chat_widget_front/main.lib'

export type ChatProvider = _ChatProvider

export interface Chat {
  id: number
  department_id: number
  status: string
  client: ChatClient
  user: ChatOperator | null
  updated_at: string | null
  created_at: string
}

export interface ChatClient {
  id: number
  name: string
  email: string
}

export interface ChatOperator {
  id: number
  name: string
}

export interface ChatListRequestOptions {
  operatorId?: string | number | null
  departmentId?: string | number | null
  page?: number
}

export interface ChatListResponse {
  current_page: number
  per_page: number
  total: number
  data: Chat[]
}

export interface ChatMessage {
  id: number
  message: string
  direction: number
  is_read: boolean
  created_at: string
  files: any[]
}

export interface NewChatMessage {
  message: string
  files: File[]
}
