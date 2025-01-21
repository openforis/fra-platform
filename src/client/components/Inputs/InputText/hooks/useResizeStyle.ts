import { CSSProperties, MutableRefObject, useEffect, useMemo, useState } from 'react'

import { InputTextProps } from 'client/components/Inputs/InputText/types'

type Props = Pick<InputTextProps, 'disabled' | 'resize' | 'value'> & {
  inputRef: MutableRefObject<HTMLInputElement>
}

type Returned = Pick<CSSProperties, 'minWidth'> | undefined

export const useResizeStyle = (props: Props): Returned => {
  const { disabled, inputRef, resize, value } = props

  const valueLength = (value ?? '').toString().length

  const [paddingPx, setPaddingPx] = useState(0)

  useEffect(() => {
    if (!resize) return
    if (disabled) return
    if (!inputRef.current) return

    const computedStyle = getComputedStyle(inputRef.current)
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0
    setPaddingPx(paddingLeft + paddingRight)
  }, [disabled, inputRef, resize])

  const style = useMemo<Returned>(() => {
    if (!resize) return undefined
    if (valueLength === 0) return undefined

    return { minWidth: `calc(${valueLength}ch + ${paddingPx}px)` }
  }, [paddingPx, resize, valueLength])

  return style
}
