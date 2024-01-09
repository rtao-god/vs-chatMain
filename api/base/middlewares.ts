import { createFieldProxy } from "@/utils/objects"
import Api from "./Api"

export function createErrorHandlerMiddleware(handleError: (error: unknown) => void) {
  return (func: Function) => async (...args: any) => {
    try {
      return await func(...args)
    } catch (error: unknown) {
      handleError(error)
    }
  }
}

export function addMiddleware<T extends Api>(apiInstance: T, middleware: (func: Function) => Function) {
  return new Proxy(apiInstance, {
    get(target: any, property: any, reciever: any) {
      if (typeof target[property] === 'function') {
        const apiInstanceMethod = target[property].bind(apiInstance)
        return middleware(apiInstanceMethod) as any
      }

      return Reflect.get(target, property, reciever)
    }
  })
}
