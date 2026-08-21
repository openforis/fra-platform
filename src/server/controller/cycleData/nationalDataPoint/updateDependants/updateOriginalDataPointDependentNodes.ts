import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user/user'

import { updateOriginalDataPointsDependentNodes } from 'server/controller/cycleData/nationalDataPoint/updateDependants/updateOriginalDataPointsDependentNodes'
import { BaseProtocol } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName?: string
  originalDataPoint: OriginalDataPoint
  user: User
  notifyClient?: boolean
}

export const updateOriginalDataPointDependentNodes = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { notifyClient = true, originalDataPoint } = props
  const { year } = originalDataPoint
  if (!year) throw new Error(`OriginalDataPoint ${originalDataPoint.id} is missing year`)

  const originalDataPoints = [{ originalDataPoint, notifyClient }]
  await updateOriginalDataPointsDependentNodes({ ...props, originalDataPoints }, client)
}
