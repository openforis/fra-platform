import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { CountryIso } from '@meta/area'
import { AssessmentName, CountryStatus, Cycle } from '@meta/assessment'

export const updateCountryStatus = async (
  props: { countryStatus: CountryStatus; countryIso: CountryIso | string; name: AssessmentName; cycleName: string },
  client: BaseProtocol = DB
): Promise<CountryStatus | undefined> => {
  const { countryStatus, countryIso, name, cycleName } = props

  const assessmentCycleName = Schemas.getNameCycle({ props: { name } }, { name: cycleName } as Cycle)

  return client.oneOrNone<CountryStatus>(
    `
        update ${assessmentCycleName}.country_status
        set status = $2, desk_study = $3
        where country_iso = $1
        returning *;

    `,
    [countryIso, countryStatus.status, countryStatus.deskStudy],
    Objects.camelize
  )
}
