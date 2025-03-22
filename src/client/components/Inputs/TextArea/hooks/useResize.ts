import { MutableRefObject, TextareaHTMLAttributes, useLayoutEffect, useMemo } from 'react'

import { Functions } from 'utils/functions'
import { Objects } from 'utils/objects'

type Props = {
  maxHeight?: number
  textAreaRef: MutableRefObject<HTMLTextAreaElement>
  value: TextareaHTMLAttributes<HTMLTextAreaElement>['value']
}

const useResize = (props: Props) => {
  const { maxHeight, textAreaRef, value } = props

  const resize = useMemo(() => {
    return Functions.throttle(
      () => {
        const textArea = textAreaRef.current
        if (!textArea) return

        const withMaxHeight = !Objects.isNil(maxHeight)

        textArea.style.height = 'auto'
        const { height: parentHeight } = (textArea.parentNode as Element).getBoundingClientRect()
        // This is a fix to make textarea fit Section->NationalData->DataSources GridCell. investigate further if needed
        const realHeight = parentHeight > textArea.scrollHeight ? '100%' : `${textArea.scrollHeight}px`
        textArea.style.height = withMaxHeight ? `${Math.min(textArea.scrollHeight, maxHeight)}px` : realHeight

        const scroll = withMaxHeight ? textArea.scrollHeight > maxHeight : false
        textArea.style.overflowY = scroll ? 'scroll' : 'hidden'
      },
      200,
      { leading: true, trailing: true }
    )
  }, [maxHeight, textAreaRef])

  // on value update
  useLayoutEffect(resize, [resize, value])

  // on window resize
  useLayoutEffect(() => {
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [resize])
}

export default useResize
