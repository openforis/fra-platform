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
}

export const updateOriginalDataPointDependentNodes = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { originalDataPoint } = props
  const { year } = originalDataPoint
  if (!year) throw new Error(`OriginalDataPoint ${originalDataPoint.id} is missing year`)

  const originalDataPoints = [originalDataPoint]
  await updateOriginalDataPointsDependentNodes({ ...props, originalDataPoints }, client)
}
