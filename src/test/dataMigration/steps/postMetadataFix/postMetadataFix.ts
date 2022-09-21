import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const postMetadataFix = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props

  const schema = Schemas.getName(assessment)

  // fix col names interval
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')
  await client.query(`
      update ${schema}."table" t
      set props = jsonb_set(
              t.props,
              '{columnNames}',
              '{
                "${cycle2025.uuid}": [
                  "1990-2000",
                  "2000-2010",
                  "2010-2015",
                  "2015-2020",
                  "2020-2025"
                ],
                "${cycle2020.uuid}": [
                  "1990-2000",
                  "2000-2010",
                  "2010-2015",
                  "2015-2020"
                ]
              }'
          )
      where t.props ->> 'name' in ('forestAreaChange', 'annualReforestation')
      ;

      update ${schema}.col
      set props = jsonb_set(
              props,
              '{colName}',
              to_jsonb(d.col_name)
          )
      from (select c.id                                     as col_id,
                   replace(c.props ->> 'colName', '_', '-') as col_name
            from ${schema}.col c
                     left join ${schema}.row r on r.id = c.row_id
                     left join ${schema}."table" t on t.id = r.table_id
            where t.props ->> 'name' in ('forestAreaChange', 'annualReforestation')
              and c.props ->> 'colName' is not null) as d
      where id = d.col_id
      ;
  `)
}
