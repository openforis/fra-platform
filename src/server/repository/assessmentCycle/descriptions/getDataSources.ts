import { CountryIso } from '@meta/area'
import { Assessment, Cycle, DataSourceLinked } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  sectionName: string
  tableName: string
  variableName: string
}

export const getDataSources = async (props: Props, client: BaseProtocol = DB): Promise<Array<DataSourceLinked>> => {
  const { countryIso, assessment, cycle, sectionName, variableName } = props

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      with elements as
               (select d.id,
                       jsonb_array_elements(d.value -> 'dataSources') as data,
                       jsonb_extract_path(
                               s.props,
                               'descriptions',
                               '${cycle.uuid}',
                               'nationalData',
                               'dataSources'
                           )                                          as meta
                from ${schemaCycle}.descriptions d
                         left join ${schemaAssessment}.section s
                                   on d.section_name = s.props ->> 'name'
                where d.name = 'dataSources'
                  and d.country_iso = $1
                  and d.section_name = $2)
      select e.data, e.meta
      from elements e
      where e.data -> 'variables' @> '["${variableName}"]'::jsonb;
  `

  return client.manyOrNone<DataSourceLinked>(query, [countryIso, sectionName])
}
