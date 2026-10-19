import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleStatus } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { CycleRepository } from 'server/db/repository/assessmentCycle/cycle'
import { ActivityLogDb, ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  user: User
}

type Returned = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
}

export const publishCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle, user } = props

  return client.tx(async (t) => {
    const datePublished = new Date(Date.now()).toISOString()

    cycle.props.status = CycleStatus.published
    cycle.props.datePublished = datePublished
    await CycleRepository.update({ cycle }, t)
    // Update Assessment cache
    await AssessmentRedisRepository.getAssessmentsMap({ force: true }, t)

    // Update countries db
    const publishedCountries = await CountryRepository.publishAllAccepted({ assessment, cycle, datePublished }, t)

    // Update countries cache
    await Promise.all(
      assessment.cycles.map((c) => AreaRedisRepository.getCountriesMap({ assessment, cycle: c, force: true }, t))
    )

    // Activity log cycle
    const activityLog = { target: cycle, section: 'cycle', message: ActivityLogMessage.cyclePublish, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    // Activity log for all published countries
    const activityLogs = publishedCountries.map<ActivityLogDb<{ status: string }>>((country: Country) => {
      const message = ActivityLogMessage.assessmentStatusUpdate
      const target = { status: country.props.status }
      return {
        assessment_uuid: assessment.uuid,
        cycle_uuid: cycle.uuid,
        country_iso: country.countryIso,
        section: 'assessment',
        message,
        target,
        user_id: user.id,
      }
    })
    await ActivityLogRepository.massiveInsert({ activityLogs }, t)

    const { name: assessmentName } = assessment.props
    const { name: cycleName } = cycle
    return {
      ...(await AssessmentRedisRepository.getOneWithCycle({ assessmentName, cycleName }, t)),
      countries: publishedCountries,
    }
  })
}
