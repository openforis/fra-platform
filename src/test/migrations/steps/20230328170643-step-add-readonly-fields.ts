import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  // tables
  const queryTables = `
      update
          assessment_fra."table" t
      set props = props || '{"readonly": true}'::jsonb
      where t.props ->> 'name' in
            ('extentOfForest_forestAreaStatusAndTrend_Description',
             'growingStock_growingStockStatus_Description',
             'biomassStock_biomassStockStatus_Description',
             'sustainableDevelopment15_1_1',
             'sustainableDevelopmentAgencyIndicator',
             'sustainableDevelopment15_2_1_1',
             'sustainableDevelopmentAgencySubIndicator1',
             'sustainableDevelopment15_2_1_2',
             'sustainableDevelopmentAgencySubIndicator2',
             'sustainableDevelopment15_2_1_3',
             'sustainableDevelopmentAgencySubIndicator3',
             'sustainableDevelopment15_2_1_4',
             'sustainableDevelopmentAgencySubIndicator4',
             'sustainableDevelopment15_2_1_5');
  `

  // rows
  const queryRows = `
      update
        assessment_fra.row
    set
        props = props || '{"readonly": true}'::jsonb
      where
        uuid in (
    select r.uuid from assessment_fra.row r left join assessment_fra.table t on r.table_id = t.id where
          (r.props ->> 'variableName' = 'forestAreaNetChangeFrom1a' and t.props ->> 'name' = 'forestAreaChange')
             or
         (r.props ->> 'variableName' = 'totalForestArea' and t.props ->> 'name' = 'primaryDesignatedManagementObjective')
    )
    `

  // cols
  const queryCols = `
      update
          assessment_fra.col c
      set props = props || '{"readonly": true}'::jsonb
      where c.uuid in (select c.uuid
             from assessment_fra.col c
                      left join assessment_fra.row r on c.row_id = r.id
                      left join assessment_fra.table t on r.table_id = "t".id
             where t.props ->> 'name' = 'climaticDomain'
               and c.props ->> 'colName' ilike '%Default')`

  await client.query(queryTables)
  await client.query(queryRows)
  await client.query(queryCols)
}
