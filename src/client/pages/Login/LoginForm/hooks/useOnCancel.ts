import { useCallback } from 'react'

type Props = {
  onCancel: () => void
}

export const useOnCancel = (props: Props): (() => void) => {
  const { onCancel } = props

  return useCallback(() => {
    onCancel()
  }, [onCancel])
}
