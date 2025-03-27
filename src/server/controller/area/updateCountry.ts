import { Country, CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { AreaRedisRepository } from 'server/repository/redis/area'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  countryIso: CountryIso
  user: User
}

export const updateCountry = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { country, countryIso, assessment, cycle, user } = props
  return client.tx(async (t) => {
    // update db
    const updatedCountry = await CountryRepository.update({ assessment, cycle, country }, t)

    // update cache
    await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso, force: true }, t)

    // insert activity log
    const target = { assessment: assessment.props.name, status: country.props.status }
    const message = ActivityLogMessage.assessmentStatusUpdate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
    return updatedCountry
  })
}
