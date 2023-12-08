import { useMemo } from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useFooterLogic = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const { print } = useIsPrintRoute()

  const isFooterVisible = useMemo(() => !print && cycleName && assessmentName, [print, cycleName, assessmentName])

  return {
    isFooterVisible,
  }
}
