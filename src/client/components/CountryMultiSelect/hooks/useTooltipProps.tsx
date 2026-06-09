import { useCallback, useMemo, useState } from 'react'

import { TooltipId } from 'meta/tooltip/id'

type Props = {
  error?: string
}

export type TooltipProps = {
  canDisplayTooltip: boolean
  dataTooltipId: string
  hideTooltip: () => void
  showTooltip: () => void
}

export const useTooltipProps = (props: Props): TooltipProps => {
  const { error } = props
  const [canDisplayTooltip, setCanDisplayTooltip] = useState<boolean>(true)

  const hideTooltip = useCallback<TooltipProps['hideTooltip']>(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback<TooltipProps['showTooltip']>(() => setCanDisplayTooltip(true), [])

  const dataTooltipId = useMemo<string>(() => {
    return error ? TooltipId.error : 'countries-tooltip'
  }, [error])

  return {
    canDisplayTooltip,
    dataTooltipId,
    hideTooltip,
    showTooltip,
  }
}
