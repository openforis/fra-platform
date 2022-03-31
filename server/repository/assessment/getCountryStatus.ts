import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { CountryIso } from '@meta/area'
import { AssessmentName, Cycle } from '@meta/assessment'
import { CountryStatus } from '@meta/area/country'

export const getCountryStatus = async (
  props: { countryIso: CountryIso | string; name: AssessmentName; cycleName: string },
  client: BaseProtocol = DB
): Promise<CountryStatus | undefined> => {
  const { countryIso, name, cycleName } = props

  const assessmentCycleName = Schemas.getNameCycle({ props: { name } }, { name: cycleName } as Cycle)

  return client.oneOrNone<CountryStatus>(
    `
          select country_iso, props->>'status' as status, (props->>'desk_study')::boolean as desk_study from ${assessmentCycleName}.country where country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
