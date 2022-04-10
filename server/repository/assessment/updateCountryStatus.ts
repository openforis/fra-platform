import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { CountryIso } from '@meta/area'
import { AssessmentName, Cycle } from '@meta/assessment'
import { CountryStatus } from '@meta/area/country'

export const updateCountryStatus = async (
  props: {
    countryStatus: CountryStatus
    countryIso: CountryIso | string
    assessmentName: AssessmentName
    cycleName: string
  },
  client: BaseProtocol = DB
): Promise<CountryStatus | undefined> => {
  const { countryStatus, countryIso, assessmentName, cycleName } = props

  const assessmentCycleName = Schemas.getNameCycle({ props: { name: assessmentName } }, { name: cycleName } as Cycle)

  return client.oneOrNone<CountryStatus>(
    `
        update ${assessmentCycleName}.country
        set props = props || $2
        where country_iso = $1
        returning country_iso, props->>'status' as status, (props->>'desk_study')::boolean as desk_study;

    `,
    [countryIso, JSON.stringify({ status: countryStatus.status, desk_study: countryStatus.deskStudy })],
    Objects.camelize
  )
}
