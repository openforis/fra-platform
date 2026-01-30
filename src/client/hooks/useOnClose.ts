import { RefObject, useEffect } from 'react'
import { useOutsideClickHandler } from '@junaidakbar076/react-outside-click-handler'

type Props = {
  onClose: () => void
  open: boolean
}

// Handle closing on outside click and Escape key
export const useOnClose = <T extends HTMLElement>(props: Props): RefObject<T> => {
  const { onClose, open } = props

  const ref = useOutsideClickHandler<T>(onClose)

  useEffect(() => {
    if (!open) return undefined

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape, true)
    return (): void => window.removeEventListener('keydown', handleEscape, true)
  }, [onClose, open])

  return ref
}
