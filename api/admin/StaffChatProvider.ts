import { Chat, ChatProvider } from '@/interfaces/api/admin/chats'
import { ChatMessageBlock, ChatMessage } from 'vs_chat_widget_front/interfaces/chat'
import ChatsApi from './ChatsApi'

export default class StaffChatProvider implements ChatProvider {
  private _chatsApi: ChatsApi
  private _startDate: Date
  private _maxMessagesPerBlock = 16
  private _internalIdCounter = 4503599627370495

  private _chat: Chat

  private _isInitialized = false
  private async _init() {
    await this.loadOldMessageBlock(1)
    this._isInitialized = true
  }

  constructor(chatsApi: ChatsApi, chat: Chat) {
    chatsApi.isSameQueryJoiningEnabled = true

    this._chatsApi = chatsApi
    this._startDate = new Date()
    this._chat = chat

    this._init()
  }

  private _loadedOldMessageBlocks = new Map<number, ChatMessageBlock>()
  get loadedOldMessageBlocks(): readonly ChatMessageBlock[] {
    return Array.from(this._loadedOldMessageBlocks.values())
  }

  private _newMessageBlock: ChatMessageBlock = {
    messages: [],
    number: 0,
  }
  get newMessageBlock(): ChatMessageBlock {
    return this._newMessageBlock
  }

  private _totalOldMessageCount = 0
  get totalOldMessageCount(): number {
    return this._totalOldMessageCount
  }

  get totalOldBlockCount(): number {
    return Math.ceil(this.totalOldMessageCount / this._maxMessagesPerBlock)
  }

  async loadOldMessageBlock(number: number): Promise<ChatMessageBlock> {
    let loadedOldMessageBlock = this._loadedOldMessageBlocks.get(number)
    if (loadedOldMessageBlock) return loadedOldMessageBlock

    const chatMessagesResponse = await this._chatsApi.fetchChatMessages(
      this._chat.id,
      this._startDate,
      number,
      this._maxMessagesPerBlock
    )
    this._totalOldMessageCount = chatMessagesResponse.total

    if (this._loadedOldMessageBlocks.has(number)) {
      return this._loadedOldMessageBlocks.get(number)!
    }

    loadedOldMessageBlock = {
      messages: chatMessagesResponse.data.map(chatMessage => ({
        content: chatMessage.message,
        date: new Date(chatMessage.created_at),
        id: chatMessage.id,
        authorRole: chatMessage.direction ? 'operator' : 'client',
        authorName: chatMessage.direction ? 'transportation' : this._chat.client.name,
      })),
      number,
    }

    this._loadedOldMessageBlocks.set(number, loadedOldMessageBlock)
    this._fire('old-block-load', loadedOldMessageBlock)
    return loadedOldMessageBlock
  }

  async sendMessage(content: string, attachedFiles: File[] = []): Promise<void> {
    const displayedMessage: ChatMessage = {
      attachments: attachedFiles?.map(attachedFile => ({
        name: attachedFile.name,
        size: attachedFile.size,
        type: attachedFile.type,
        url: URL.createObjectURL(attachedFile),
      })),

      authorName: 'transportation',
      authorRole: 'operator',
      content,
      date: new Date(),
      id: this._internalIdCounter--,
    }

    this._newMessageBlock.messages.push(displayedMessage)
    this._fire('new-message', displayedMessage)
    await this._chatsApi.sendMessage(this._chat.id, {
      message: content,
      files: attachedFiles,
    })
  }

  _eventListeners: Record<string, Set<any>> = {}

  private _fire(eventName: 'new-message', message: ChatMessage): void
  private _fire(eventName: 'old-block-load', chatMessageBlock: ChatMessageBlock): void
  private _fire(eventName: string, ...args: any[]) {
    if (!this._eventListeners[eventName]) return

    for (const eventListener of this._eventListeners[eventName]) {
      eventListener(...args)
    }
  }

  on(eventName: 'new-message', callback: (message: ChatMessage) => void): void
  on(eventName: 'old-block-load', callback: (chatMessageBlock: ChatMessageBlock) => void): void
  on(eventName: string, callback: any): void {
    this.off(eventName as any, callback)

    if (!this._eventListeners[eventName]) {
      this._eventListeners[eventName] = new Set()
    }

    this._eventListeners[eventName].add(callback)
  }

  off(eventName: 'new-message', callback: any): void
  off(eventName: 'old-block-load', callback: any): void
  off(eventName: string, callback: any): void {
    if (!this._eventListeners[eventName]) return
    this._eventListeners[eventName].delete(callback)
  }

  private static _memoizedChatProviders = new Map<number, StaffChatProvider>()
  static forChat(chatsApi: ChatsApi, chat: Chat) {
    if (this._memoizedChatProviders.has(chat.id)) {
      return this._memoizedChatProviders.get(chat.id)!
    }

    const newStaffChatProviderInstance = new StaffChatProvider(chatsApi, chat)
    this._memoizedChatProviders.set(chat.id, newStaffChatProviderInstance)
    return newStaffChatProviderInstance
  }
}
