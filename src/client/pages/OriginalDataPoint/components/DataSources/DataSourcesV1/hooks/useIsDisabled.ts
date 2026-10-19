import { useIsPrintRoute } from 'client/hooks/routes'
import { useIsEditODPDescriptionEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

export const useIsDisabled = (): boolean => {
  const { print } = useIsPrintRoute()

  const canEditData = useIsEditODPDescriptionEnabled()
  return Boolean(print || !canEditData)
}
