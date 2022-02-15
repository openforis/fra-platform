import { BaseProtocol, DB } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

export const removeOriginalDataPoint = async (
  props: {
    assessment: Assessment
    assessmentCycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, assessmentCycle, originalDataPoint } = props

  return client.tx(async (t) => {
    const removedOriginalDataPoint = await OriginalDataPointRepository.remove(
      { assessment, assessmentCycle, originalDataPoint },
      t
    )

    return removedOriginalDataPoint
  })
}
