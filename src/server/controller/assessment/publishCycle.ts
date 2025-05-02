import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleStatus } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogDb, ActivityLogRepository } from 'server/repository/public/activityLog'
import { AreaRedisRepository } from 'server/repository/redis/area'

export const publishCycle = async (
  props: { user: User; assessment: Assessment; cycle: Cycle; allCountries?: boolean },
  client: BaseProtocol = DB
): Promise<{ cycle: Cycle; countries: Array<Country> }> => {
  const { assessment, user, cycle, allCountries } = props

  return client.tx(async (t) => {
    cycle.props.status = CycleStatus.published
    cycle.props.datePublished = new Date(Date.now()).toISOString()
    await CycleRepository.update({ cycle }, t)

    // Update countries db
    const publishedCountries = await CountryRepository.publishMany({ assessment, cycle, allCountries })
    // Update countries cache
    await AreaRedisRepository.getCountriesMap({ assessment, cycle, force: true })

    // Activity log cycle
    const activityLog = { target: cycle, section: 'cycle', message: ActivityLogMessage.cyclePublish, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    // Activity log for all non-published countries
    const activityLogs = publishedCountries.map<ActivityLogDb<Country>>((country: Country) => {
      const message = ActivityLogMessage.assessmentStatusUpdate
      return {
        assessment_uuid: assessment.uuid,
        cycle_uuid: cycle.uuid,
        country_iso: country.countryIso,
        section: 'assessment',
        message,
        target: country,
        user_id: user.id,
      }
    })
    await ActivityLogRepository.massiveInsert({ activityLogs }, client)
    return { cycle, countries: publishedCountries }
  })
}
