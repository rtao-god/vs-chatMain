import { RefObject, useLayoutEffect, useState } from 'react'

export default function useElementClientRect<T extends HTMLElement>(elementRef: RefObject<T>) {
  const [elementClientRect, setElementClientRect] = useState(elementRef.current?.getBoundingClientRect())

  const updateElementClientRect = () => {
    if (!elementRef.current) return
    setElementClientRect(elementRef.current.getBoundingClientRect())
  }

  useLayoutEffect(() => {
    if (!elementClientRect) updateElementClientRect()

    window.addEventListener('resize', updateElementClientRect)
    window.addEventListener('scroll', updateElementClientRect)

    let nextParent = elementRef.current?.parentElement
    while (nextParent) {
      nextParent.addEventListener('scroll', updateElementClientRect)
      nextParent = nextParent.parentElement
    }

    return () => {
      window.removeEventListener('resize', updateElementClientRect)
      window.removeEventListener('scroll', updateElementClientRect)

      let nextParent = elementRef.current?.parentElement
      while (nextParent) {
        nextParent.removeEventListener('scroll', updateElementClientRect)
        nextParent = nextParent.parentElement
      }
    }
  })

  return elementClientRect
}
