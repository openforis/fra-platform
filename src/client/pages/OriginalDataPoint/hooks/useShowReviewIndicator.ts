import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

export const useShowReviewIndicator = () => {
  const { print } = useIsPrintRoute()

  const canEditData = useIsEditODPEnabled()
  return !print && canEditData
}
