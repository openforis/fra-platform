import { Assessment } from '../../../meta/assessment/assessment'
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
      );

      update ${schema}.row r
      set props = props || '{"variableName":"does_country_monitor"}'
      where r.table_id = (select t.id from ${schema}."table" t where t.props ->> 'name' = 'degradedForest')
        and r.props ->> 'index' = '0'
      ;

      update ${schema}.row r
      set props = props || '{"variableName":"national_definition"}'
      where r.table_id = (select t.id from ${schema}."table" t where t.props ->> 'name' = 'degradedForest')
        and r.props ->> 'index' = '1'
      ;

      update ${schema}.row r
      set props = props || '{"variableName":"how_monitored"}'
      where r.table_id = (select t.id from ${schema}."table" t where t.props ->> 'name' = 'degradedForest')
        and r.props ->> 'index' = '2'
      ;
  `)
}
