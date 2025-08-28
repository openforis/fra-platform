import { getExtraEstimation } from 'client/store/geo/statistics/actions/getExtraEstimation'
import { getForestEstimations } from 'client/store/geo/statistics/actions/getForestEstimations'
import { setEstimationsErrorKey } from 'client/store/geo/statistics/actions/setEstimationsErrorKey'
import { setForestEstimationsTableData } from 'client/store/geo/statistics/actions/setForestEstimationsTableData'

export const GeoStatisticsActions = {
  getExtraEstimation,
  getForestEstimations,
  setEstimationsErrorKey,
  setForestEstimationsTableData,
}
