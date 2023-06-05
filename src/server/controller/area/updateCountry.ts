import { Country, CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const updateCountry = async (
  props: {
    country: Country
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    user: User
  },
  client: BaseProtocol = DB
): Promise<Country> => {
  const { country, countryIso, assessment, cycle, user } = props
  return client.tx(async (t) => {
    const updatedCountry = await CountryRepository.update(
      {
        country,
        countryIso,
        assessment,
        cycle,
      },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: {
            assessment: assessment.props.name,
            status: country.props.status,
          },
          section: 'assessment',
          message: ActivityLogMessage.assessmentStatusUpdate,
          countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )
    return updatedCountry
  })
}
