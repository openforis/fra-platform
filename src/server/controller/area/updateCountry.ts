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
  lastUpdate?: boolean
  lastEdit?: boolean
  lastEditOdp?: boolean
  notifyClient?: boolean
}

export const updateCountry = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { assessment, country, cycle, lastEdit, lastEditOdp, lastUpdate = true, notifyClient = true, user } = props
  const { countryIso } = country

  return client.tx(async (t) => {
    const currentCountry = await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso }, t)
    const statusUpdate = currentCountry.props.status !== country.props.status

    const updatedCountry = await CountryRepository.update(
      { assessment, cycle, country, lastUpdate, lastEdit, lastEditOdp, lastInStatus: statusUpdate },
      t
    )

    // update cache for all cycles to keep lastPublished up to date
    await Promise.all(
      assessment.cycles.map((c) =>
        AreaRedisRepository.getOneCountry({ assessment, cycle: c, countryIso, force: true }, t)
      )
    )

    // notify client
    if (statusUpdate) {
      const target = { assessment: assessment.props.name, status: country.props.status }
      const message = ActivityLogMessage.assessmentStatusUpdate
      const activityLog = { target, section: 'assessment', message, countryIso, user }
      await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

      SocketService.Country.notifyStatusUpdate({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        status: country.props.status,
        notifyClient,
      })
    }

    return updatedCountry
  })
}
