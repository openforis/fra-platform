import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { AreaRedisRepository } from 'server/repository/redis/area'
import { SocketService } from 'server/service/socket'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  user: User
}

export const updateCountry = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { country, assessment, cycle, user } = props
  const { countryIso } = country

  return client.tx(async (t) => {
    const oldCountry = await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso }, t)

    // update db
    const updatedCountry = await CountryRepository.update({ assessment, cycle, country }, t)

    // update cache
    await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso, force: true }, t)

    // insert activity log
    const target = { assessment: assessment.props.name, status: country.props.status }
    const message = ActivityLogMessage.assessmentStatusUpdate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    if (oldCountry.props.status !== country.props.status) {
      // notify client
      SocketService.Country.notifyStatusUpdate({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        status: country.props.status,
      })
    }

    return updatedCountry
  })
}
