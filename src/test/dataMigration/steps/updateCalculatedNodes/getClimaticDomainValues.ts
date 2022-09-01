import { NodeRow } from '@test/dataMigration/types'

import { BaseProtocol } from '@server/db'

export const getClimaticDomainValues = async (client: BaseProtocol): Promise<Array<NodeRow>> => {
  const query = ['boreal', 'temperate', 'sub_tropical', 'tropical'].map(
    (domain) =>
      `
          select c.country_iso,
--        c.config -> 'faoStat'      as fao_stat,
--        t.props ->> 'name'         as table_name,
--        r.props ->> 'variableName' as variable_name,
                 r.uuid  as row_uuid,
--        cl.props ->> 'colName'     as col_name,
                 cl.uuid as col_uuid,
                 jsonb_build_object(
                         'raw', jsonb_extract_path(
                         c.config, 'climaticDomainPercents2015', '${domain.replace('_', '')}'
                     )::varchar
                     )   as value
--        c.config -> 'faoStat' ->
          from country c
                   left join assessment_fra."table" t
                             on t.props ->> 'name' = 'climaticDomain'
                   left join assessment_fra.row r
                             on r.table_id = t.id
                                 and r.props ->> 'variableName' = '${domain}'
                   left join assessment_fra.col cl
                             on r.id = cl.row_id
                                 and cl.props ->> 'colName' = 'percentOfForestArea2015Default'
      `
  ).join(`
    union
  `)

  return client.many<NodeRow>(query)
}
