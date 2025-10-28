import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { SocketService } from 'server/service/socket'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  user: User

  lastEdit?: boolean
  lastEditOdp?: boolean
  lastUpdate?: boolean
  lastUpdateTimestamp?: string
  notifyClient?: boolean
}

export const updateCountry = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const {
    assessment,
    country,
    cycle,
    lastEdit,
    lastEditOdp,
    lastUpdate = true,
    lastUpdateTimestamp,
    notifyClient = true,
    user,
  } = props
  const { countryIso } = country

  return client.tx(async (t) => {
    const currentCountry = await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso }, t)
    const statusUpdate = currentCountry.props.status !== country.props.status

    const updatedCountry = await CountryRepository.update(
      {
        assessment,
        cycle,
        country,
        lastUpdate,
        lastEdit,
        lastEditOdp,
        lastInStatus: statusUpdate,
        lastUpdateTimestamp,
      },
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
    }

    SocketService.Country.notifyUpdate({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      country: updatedCountry,
      notifyClient,
    })

    return updatedCountry
  })
}
