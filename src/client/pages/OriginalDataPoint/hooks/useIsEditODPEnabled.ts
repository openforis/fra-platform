import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'

export const useIsEditODPEnabled = () => {
  const { sectionName } = useOriginalDataPointRouteParams()
  const isEditTableDataEnabled = useIsEditTableDataEnabled(sectionName)
  const originalDataPoint = useOriginalDataPoint()

  return isEditTableDataEnabled && originalDataPoint?.year > 0
}
