import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user'

import { updateOriginalDataPointsDependentNodes } from 'server/controller/cycleData/originalDataPoint/updateDependants/updateOriginalDataPointsDependentNodes'
import { BaseProtocol } from 'server/db'

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
  const { notifyClient, originalDataPoint } = props
  const { year } = originalDataPoint
  if (!year) throw new Error(`OriginalDataPoint ${originalDataPoint.id} is missing year`)

  const originalDataPoints = [{ originalDataPoint, notifyClient }]
  await updateOriginalDataPointsDependentNodes({ ...props, originalDataPoints }, client)
}
