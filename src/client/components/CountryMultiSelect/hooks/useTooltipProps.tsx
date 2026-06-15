import { useCallback, useMemo, useState } from 'react'

import { TooltipId } from 'meta/tooltip/id'
import { UUIDs } from 'meta/uuid/uuids'
import { Objects } from 'utils/objects'

type Props = {
  error?: string
}

export type TooltipProps = {
  canDisplayTooltip: boolean
  hideTooltip: () => void
  showTooltip: () => void
  tooltipId: string
  tooltipLevel: TooltipId.error | TooltipId.info
}

export const useTooltipProps = (props: Props): TooltipProps => {
  const { error } = props
  const [canDisplayTooltip, setCanDisplayTooltip] = useState<boolean>(true)

  const hideTooltip = useCallback<TooltipProps['hideTooltip']>(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback<TooltipProps['showTooltip']>(() => setCanDisplayTooltip(true), [])

  const tooltipId = useMemo<string>(() => {
    return `countries-tooltip-${UUIDs.getUuid()}`
  }, [])

  const tooltipLevel = useMemo<TooltipProps['tooltipLevel']>(() => {
    return Objects.isEmpty(error) ? TooltipId.info : TooltipId.error
  }, [error])

  return {
    canDisplayTooltip,
    hideTooltip,
    showTooltip,
    tooltipId,
    tooltipLevel,
  }
}
