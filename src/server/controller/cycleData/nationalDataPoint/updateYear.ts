import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'
import { SocketServer } from 'server/service/socket'

import { updateOriginalDataPointsDependentNodes } from './updateDependants/updateOriginalDataPointsDependentNodes'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  id: string
  sectionName: string
  targetYear: string
  user: User
  year: string
}

export const updateYear = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, user, year } = props
  const { countryIso } = country

  const originalDataPoint = await OriginalDataPointRepository.getOne({ assessment, cycle, countryIso, year })

  return client.tx(async (t) => {
    // --- 1. Update ODP year
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateYear({ ...props, countryIso }, t)

    // --- 2. Update activity log
    const message = ActivityLogMessage.originalDataPointUpdateYear
    const activityLog = { target: updatedOriginalDataPoint, section: 'odp', message, countryIso, user }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    // --- 3 Notify client about delete
    const { name: assessmentName } = assessment.props
    const { name: cycleName } = cycle
    const odpDeleteEvent = Sockets.getODPDeleteEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(odpDeleteEvent, { countryIso, year: originalDataPoint.year })

    // --- 4 Update dependents
    const commonProps = { assessment, cycle, user }
    const originalDataPoints = [
      { originalDataPoint, notifyClient: false },
      { originalDataPoint: updatedOriginalDataPoint, notifyClient: true },
    ]
    await updateOriginalDataPointsDependentNodes({ ...commonProps, country, originalDataPoints }, t)

    // 5 --- Notify about reserved years
    const odpReservedYearsEvent = Sockets.getODPReservedYearsEvent({ assessmentName, cycleName, countryIso })
    const years = await NationalDataPointController.getReservedYears({ assessment, cycle, countryIso }, t)
    SocketServer.emit(odpReservedYearsEvent, { years })

    return updatedOriginalDataPoint
  })
}
