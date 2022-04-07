import { BaseProtocol, DB, Schemas } from '@server/db'
import { ActivityLogRepository, AssessmentRepository } from '@server/repository'
import { Country, CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'

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
    const updatedCountry = await AssessmentRepository.updateCountry(
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
          target: updatedCountry,
          section: 'assessment',
          message: ActivityLogMessage.updateCountry,
          countryIso,
          user,
        },
        schemaName: Schemas.getName(assessment),
      },
      t
    )
    return updatedCountry
  })
}
