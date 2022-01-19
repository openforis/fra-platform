import { Assessment } from '../../../meta/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'

export const migrateDegradedForest = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  await client.query(`
      update ${schema}.col c
      set props = props || '{"index":0, "colName":"answer"}'
      where c.id in (
          select cc.id
          from ${schema}.col cc
                   left join ${schema}.row r
                             on cc.row_id = r.id
                   left join ${schema}."table" t
                             on r.table_id = t.id
          where t.props ->> 'name' = 'degradedForest'
            and cc.props ->> 'colType' in ('select', 'textarea')
      )
  `)
}
