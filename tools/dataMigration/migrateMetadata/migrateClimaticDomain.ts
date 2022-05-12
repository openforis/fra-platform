import { Assessment } from '../../../meta/assessment/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'

export const migrateClimaticDomain = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const assessmentSchema = DBNames.getAssessmentSchema(assessment.props.name)

  await client.query(
    `
      update ${assessmentSchema}.col
      set props = jsonb_set(props, '{colName}', '"percentOfForestArea2015Default"')
      where id in (
          select c.id
          from ${assessmentSchema}.col c
                   left join ${assessmentSchema}.row r on r.id = c.row_id
                   left join ${assessmentSchema}."table" t on t.id = r.table_id
          where t.props ->> 'name' = 'climaticDomain'
            and c.props ->> 'index' = '-1'
      );

      update ${assessmentSchema}.col
      set props = jsonb_set(props, '{index}', '1')
      where id in (
          select c.id
          from ${assessmentSchema}.col c
                   left join ${assessmentSchema}.row r on r.id = c.row_id
                   left join ${assessmentSchema}."table" t on t.id = r.table_id
          where t.props ->> 'name' = 'climaticDomain'
            and c.props ->> 'colName' = 'percentOfForestArea2015'
      );

      update ${assessmentSchema}.col
      set props = jsonb_set(props, '{index}', '0')
      where id in (
          select c.id
          from ${assessmentSchema}.col c
                   left join ${assessmentSchema}.row r on r.id = c.row_id
                   left join ${assessmentSchema}."table" t on t.id = r.table_id
          where t.props ->> 'name' = 'climaticDomain'
            and c.props ->> 'colName' = 'percentOfForestArea2015Default'
      );
  `
  )
}
