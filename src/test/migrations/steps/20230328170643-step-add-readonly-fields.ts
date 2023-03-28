import { BaseProtocol } from '@server/db'

export default async (client: BaseProtocol) => {
  // tables
  const queryTables = `
      update
          assessment_fra."table" t
      set props = props || '{"readOnly": true}'::jsonb
      where t.props ->> 'name' in
            ('extentOfForest_forestAreaStatusAndTrend_Description', 'growingStock_growingStockStatus_Description',
             'biomassStock_biomassStockStatus_Description');
  `

  // rows only total land area

  // cols
  const queryCols = `
      update
          assessment_fra.col c
      set props = props || '{"readOnly": true}'::jsonb
      where c.uuid in (select c.uuid
             from assessment_fra.col c
                      left join assessment_fra.row r on c.row_id = r.id
                      left join assessment_fra.table t on r.table_id = "t".id
             where t.props ->> 'name' = 'climaticDomain'
               and c.props ->> 'colName' ilike '%Default')`

  await client.query(queryTables)
  await client.query(queryCols)
}
