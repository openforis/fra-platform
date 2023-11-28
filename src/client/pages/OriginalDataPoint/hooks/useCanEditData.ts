import { OriginalDataPoint, TableNames } from 'meta/assessment'

import { useIsEditTableDataEnabled } from 'client/store/user'

export const useCanEditData = (originalDataPoint: OriginalDataPoint) => {
  const isEditTableDataEnabled = useIsEditTableDataEnabled(TableNames.extentOfForest)
  return originalDataPoint.id && isEditTableDataEnabled
}
