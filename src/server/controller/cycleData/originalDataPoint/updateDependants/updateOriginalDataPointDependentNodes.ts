import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { updateOriginalDataPointsDependentNodes } from 'server/controller/cycleData/originalDataPoint/updateDependants/updateOriginalDataPointsDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName?: string
  originalDataPoint: OriginalDataPoint
  user: User
  notifyClient?: boolean
}

export const updateOriginalDataPointDependentNodes = async (props: Props): Promise<void> => {
  const { originalDataPoint, notifyClient } = props
  const { year } = originalDataPoint
  if (!year) throw new Error(`OriginalDataPoint ${originalDataPoint.id} is missing year`)

  await updateOriginalDataPointsDependentNodes({ ...props, originalDataPoints: [{ originalDataPoint, notifyClient }] })
}
