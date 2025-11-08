import { getLastAcceptedActivity } from 'server/db/repository/assessmentCycle/originalDataPoint/queries/_lastAcceptedActivity'
import { getOriginalDataPointData } from 'server/db/repository/assessmentCycle/originalDataPoint/queries/_originalDataPointData'
import { getOtherLand } from 'server/db/repository/assessmentCycle/originalDataPoint/queries/_otherLand'

export const OriginalDataPointQueries = {
  getLastAcceptedActivity,
  getOtherLand,
  getOriginalDataPointData,
}
