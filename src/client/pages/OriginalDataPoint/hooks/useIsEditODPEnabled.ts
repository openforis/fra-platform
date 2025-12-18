import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useCanEditDescription, useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'

const useIsValidODP = (): boolean => {
  const originalDataPoint = useOriginalDataPoint()

  return originalDataPoint?.year > 0
}

export const useIsEditODPEnabled = (): boolean => {
  const { sectionName } = useOriginalDataPointRouteParams()
  const validODP = useIsValidODP()
  const canEdit = useIsEditTableDataEnabled(sectionName)

  return canEdit && validODP
}

export const useIsEditODPDescriptionEnabled = (): boolean => {
  const { sectionName } = useOriginalDataPointRouteParams()
  const validODP = useIsValidODP()
  const canEdit = useCanEditDescription({ sectionName })

  return canEdit && validODP
}
