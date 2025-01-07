import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

export const useIsDisabled = () => {
  const { print } = useIsPrintRoute()

  const canEditData = useIsEditODPEnabled()
  return Boolean(print || !canEditData)
}
