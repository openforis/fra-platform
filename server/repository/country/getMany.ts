import { BaseProtocol, DB, Schemas } from '@server/db'
import { Country } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { Objects } from '@core/utils'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Country>> => {
  const { assessment, cycle } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.map<Country>(
    `
        select c.country_iso,
               c.props - 'faoStat' - 'certifiedAreas' - 'fra2015ForestAreas' as props,
               jsonb_agg(cr.region_code)                                     as region_codes
        from ${cycleSchema}.country c
                 left join ${cycleSchema}.country_region cr
                           on c.country_iso = cr.country_iso
        group by 1, 2
        order by 1
    `,
    [],
    // @ts-ignore
    Objects.camelize
  )
}
