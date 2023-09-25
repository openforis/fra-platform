import { UUIDs } from 'utils/uuids'

import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, ODPNationalClass, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { updateOriginalDataPointDependentNodes } from 'server/controller/cycleData/originalDataPoint/updateOriginalDataPointDependentNodes'
import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
  targetYear: string
  user: User
}

export const copyOriginalDataPointNationalClasses = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, countryIso, year, targetYear, user } = props

  return client.tx(async (t) => {
    const commonProps = { assessment, cycle, countryIso }
    const originalDataPoint = await OriginalDataPointRepository.getOne({ ...commonProps, year }, t)
    const targetOriginalDataPoint = await OriginalDataPointRepository.getOne({ ...commonProps, year: targetYear }, t)

    const updateNCProps = {
      assessment,
      cycle,
      originalDataPoint: {
        ...originalDataPoint,
        nationalClasses: targetOriginalDataPoint.nationalClasses.map(
          ({ area: _, uuid: __, ...nationalClass }: ODPNationalClass) => ({
            ...nationalClass,
            uuid: UUIDs.v4(),
          })
        ),
      },
    }

    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateNationalClasses(updateNCProps)

    const activityLog = {
      target: updatedOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      countryIso: originalDataPoint.countryIso,
      user,
    }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    // Note: When copying one or more national classes,
    // we must update the dependent nodes of the original data point.
    // The new value for copied original data for each national class is always null or undefined, as we don't copy values.
    await updateOriginalDataPointDependentNodes(
      { assessment, cycle, originalDataPoint: updatedOriginalDataPoint, user },
      t
    )

    return updatedOriginalDataPoint
  })
}
