import { BaseProtocol, DB, Schemas } from '@server/db'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

export const getCountryISOs = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<CountryIso>> => {
  const { assessment, cycle } = props

  const assessmentName = Schemas.getNameCycle(assessment, cycle)

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
