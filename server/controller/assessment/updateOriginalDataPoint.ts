import { BaseProtocol, DB } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

export const updateOriginalDataPoint = async (
  props: {
    assessment: Assessment
    assessmentCycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint | null> => {
  const { assessment, assessmentCycle, originalDataPoint } = props

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.update(
      { assessment, assessmentCycle, originalDataPoint },
      t
    )

    return updatedOriginalDataPoint
  })
}
