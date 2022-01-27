import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { CountryIso } from '@core/country'
import { AssessmentName, CountryStatus, Cycle } from '@meta/assessment'

export const getCountryStatus = async (
  props: { countryIso: CountryIso | string; name: AssessmentName; cycleName: string },
  client: BaseProtocol = DB
): Promise<CountryStatus | undefined> => {
  const { countryIso, name, cycleName } = props

  const assessmentCycleName = Schemas.getNameCycle({ props: { name } }, { name: cycleName } as Cycle)

  return client.oneOrNone<CountryStatus>(
    `
          select * from ${assessmentCycleName}.country_status where country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
