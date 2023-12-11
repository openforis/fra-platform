import { useMemo } from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useIsFooterVisible = (): boolean => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const { print } = useIsPrintRoute()

  return useMemo<boolean>(() => !print && !!cycleName && !!assessmentName, [print, cycleName, assessmentName])
}
