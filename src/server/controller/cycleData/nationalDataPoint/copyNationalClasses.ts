import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user/user'
import { UUIDs } from 'meta/uuid/uuids'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  year: string
  targetYear: string
  user: User
}

export const copyNationalClasses = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, targetYear, user, year } = props
  const { countryIso } = country

  return client.tx(async (t) => {
    const commonProps = { assessment, cycle, countryIso }
    const [originalDataPoint, targetOriginalDataPoint] = await Promise.all([
      OriginalDataPointRepository.getOne({ ...commonProps, year }, t),
      OriginalDataPointRepository.getOne({ ...commonProps, year: targetYear }, t),
    ])

    const updateNCProps = {
      assessment,
      cycle,
      originalDataPoint: {
        ...originalDataPoint,
        nationalClasses: targetOriginalDataPoint.nationalClasses.map(
          ({ area: _, uuid: __, ...nationalClass }: ODPNationalClass) => ({
            ...nationalClass,
            uuid: UUIDs.getUuid(),
          })
        ),
      },
    }

    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateNationalClasses(updateNCProps)

    const activityLog = {
      target: updatedOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      countryIso,
      user,
    }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    // Note: When copying one or more national classes,
    // we must update the dependent nodes of the original data point.
    // The new value for copied original data for each national class is always null or undefined, as we don't copy values.
    await updateOriginalDataPointDependentNodes(
      { assessment, cycle, country, originalDataPoint: updatedOriginalDataPoint, user },
      t
    )

    return updatedOriginalDataPoint
  })
}
