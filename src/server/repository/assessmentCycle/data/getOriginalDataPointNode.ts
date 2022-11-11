import { Strings } from '@utils/strings'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, NodeValue } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  colName: string
  variableName: string
}

export const getOriginalDataPointNode = (props: Props, client: BaseProtocol = DB): Promise<NodeValue> => {
  const { assessment, cycle, countryIso, colName, variableName } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<NodeValue>(
    `
        select
            json_build_object('raw', o.${Strings.snakeCase(variableName)}::varchar, 'odp', true) as "nodeValue"
        from ${schemaCycle}.original_data_point_data o
        where o.year = $2
          and o.country_iso = $1
    `,
    [countryIso, colName],
    ({ nodeValue }) => nodeValue
  )
}
