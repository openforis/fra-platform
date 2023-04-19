import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, DataSource } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  sectionName: string
  variableNames: Array<string>
}

type Returned = {
  dataSources?: Array<DataSource>
}

export const getDataSources = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { countryIso, assessment, cycle, sectionName, variableNames } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      with elements as
               (select d.id, jsonb_array_elements(d.value -> 'dataSources') as data_sources
                from ${schemaCycle}.descriptions d
                where d.name = 'dataSources'
                  and d.country_iso = $1
                  and d.section_name = $2)
      select jsonb_agg(e.data_sources) as data_sources
      from elements e
      where e.data_sources -> 'fraVariables' @> '[${variableNames
        .map((variableName) => `"${variableName}"`)
        .join(',')}]'::jsonb
      ;
  `

  return client.one<Returned>(query, [countryIso, sectionName], Objects.camelize)
}
