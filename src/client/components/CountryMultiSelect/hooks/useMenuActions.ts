import { useMemo } from 'react'

import { Props } from 'client/components/CountryMultiSelect/types'
import { SelectProps } from 'client/components/Inputs/Select'

import { TooltipContent } from './useTooltipContent'

type Returned = {
  onMenuOpen: SelectProps['onMenuOpen']
  onMenuClose: SelectProps['onMenuClose']
}

export const useMenuActions = (props: Props & { tooltip: TooltipContent }): Returned => {
  const { onMenuClose: onMenuCloseProps, tooltip } = props
  const { hideTooltip, showTooltip } = tooltip

  return useMemo<Returned>(() => {
    const onMenuClose: Returned['onMenuClose'] = () => {
      showTooltip()
      onMenuCloseProps?.()
    }

    const onMenuOpen: Returned['onMenuOpen'] = () => {
      hideTooltip()
    }

    return { onMenuClose, onMenuOpen }
  }, [hideTooltip, onMenuCloseProps, showTooltip])
}
