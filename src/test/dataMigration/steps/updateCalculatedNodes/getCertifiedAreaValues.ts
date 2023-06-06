import { Cycle } from 'meta/assessment'

import { BaseProtocol } from 'server/db'

import { NodeRow } from 'test/dataMigration/types'

export const getCertifiedAreaValues = async (props: { cycle: Cycle }, client: BaseProtocol): Promise<Array<NodeRow>> => {
  const { cycle } = props
  const cycleCondition = `props -> 'cycles' ? '${cycle.uuid}'`

  return client.many<NodeRow>(
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
                       c.config, 'certifiedAreas', cl.props ->> 'colName'
                   )
                   )   as value
--        c.config -> 'faoStat' ->
        from country c
                 left join assessment_fra."table" t
                           on t.props ->> 'name' = 'sustainableDevelopment15_2_1_5'
                 left join assessment_fra.row r
                           on r.table_id = t.id
                               and r.props ->> 'variableName' = 'forestAreaVerifiedForestManagement'
                 left join assessment_fra.col cl
                           on r.id = cl.row_id
                               and cl.props ->> 'colName' is not null
        where t.${cycleCondition}
          and r.${cycleCondition}
          and cl.${cycleCondition}
    `
  )
}
