import { useEffect } from 'react'

import { Functions } from 'utils/functions'

const useResize = (props: {
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement>
  maxHeight?: number
  value: React.TextareaHTMLAttributes<HTMLTextAreaElement>['value']
}) => {
  const { textAreaRef, maxHeight = null, value } = props

  useEffect(() => {
    const adjustTextAreaHeight = () => {
      const textArea = textAreaRef.current
      if (!textArea) return

      textArea.style.height = 'auto'
      const newHeight = maxHeight !== null ? Math.min(textArea.scrollHeight, maxHeight) : textArea.scrollHeight
      textArea.style.height = `${newHeight}px`

      textArea.style.overflowY = maxHeight !== null && textArea.scrollHeight > maxHeight ? 'scroll' : 'hidden'
    }

    const handleResize = Functions.throttle(adjustTextAreaHeight, 200, { leading: true })

    adjustTextAreaHeight()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [textAreaRef, maxHeight, value])
}

export default useResize
