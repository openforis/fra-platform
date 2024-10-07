import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

export const useIsEditODPEnabled = () => {
  const { sectionName } = useOriginalDataPointRouteParams()
  const isEditTableDataEnabled = useIsEditTableDataEnabled(sectionName)
  const originalDataPoint = useOriginalDataPoint()

  return isEditTableDataEnabled && originalDataPoint?.year > 0
}
