import { BaseProtocol, DB, Schemas } from '@server/db'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const getCountryISOs = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<Array<CountryIso>> => {
  const { name } = props

  const assessmentName = Schemas.getName({ props: { name: name as AssessmentName } })

  return client.map<CountryIso>(
    `
        select c2.country_iso
        from ${assessmentName}.country c
                 left join country c2 on c.country_iso = c2.country_iso;
    `,
    [],
    // eslint-disable-next-line camelcase
    ({ country_iso }) => country_iso
  )
}
