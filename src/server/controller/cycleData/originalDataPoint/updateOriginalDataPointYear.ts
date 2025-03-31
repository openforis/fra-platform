import { Country } from 'meta/area'
import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { CycleDataController } from 'server/controller/cycleData/index'
import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { CountryService } from 'server/service/country'
import { SocketServer } from 'server/service/socket'

import { updateOriginalDataPointsDependentNodes } from './updateDependants/updateOriginalDataPointsDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string

  id: string
  year: string
  targetYear: string

  user: User
}

export const updateOriginalDataPointYear = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, country, user, year } = props
  const { countryIso } = country

  const originalDataPoint = await OriginalDataPointRepository.getOne({ assessment, cycle, countryIso, year })

  const updatedOriginalDataPoint = await client.tx(async (t) => {
    // --- 1. Update ODP year
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateYear({ ...props, countryIso }, t)

    // --- 2. Update activity log
    const message = ActivityLogMessage.originalDataPointUpdateYear
    const activityLog = { target: updatedOriginalDataPoint, section: 'odp', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    await CountryService.setCountryStatusEditing({ assessment, cycle, country, user }, t)

    return updatedOriginalDataPoint
  })

  // --- 3 Notify client about delete
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const odpDeleteEvent = Sockets.getODPDeleteEvent({ assessmentName, cycleName, countryIso })
  SocketServer.emit(odpDeleteEvent, { countryIso, year: originalDataPoint.year })

  // --- 4 Update dependents
  const commonProps = { assessment, cycle, user }
  await updateOriginalDataPointsDependentNodes({
    ...commonProps,
    originalDataPoints: [
      { originalDataPoint, notifyClient: false },
      { originalDataPoint: updatedOriginalDataPoint, notifyClient: true },
    ],
  })

  // 5 --- Notify about reserved years
  const odpReservedYearsEvent = Sockets.getODPReservedYearsEvent({ assessmentName, cycleName, countryIso })
  const years = await CycleDataController.getOriginalDataPointReservedYears({ assessment, cycle, countryIso })
  SocketServer.emit(odpReservedYearsEvent, { years })

  return updatedOriginalDataPoint
}
