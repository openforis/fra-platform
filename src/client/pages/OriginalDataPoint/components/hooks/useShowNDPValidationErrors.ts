import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'

import { useODPDisplayHistory } from './useODPDisplayHistory'

export const useShowNDPValidationErrors = (): boolean => {
  const canEdit = useCanEditCycleData()
  const displayHistory = useODPDisplayHistory()
  const { print } = useIsPrintRoute()

  return canEdit && !displayHistory && !print
}
