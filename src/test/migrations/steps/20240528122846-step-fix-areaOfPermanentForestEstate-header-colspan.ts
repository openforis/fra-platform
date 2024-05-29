import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2020' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(
    `
        update ${schemaAssessment}.col c
        set props = jsonb_set( props, '{style,${cycle.uuid}}', '{"colSpan": 6}', true)
        where c.props ->> 'colType' = 'header'
          and c.props ->> 'index' = '1'
          and c.row_id in (
            select r.id from ${schemaAssessment}.row r
            left join ${schemaAssessment}."table" t on t.id = r.table_id
            where r.props ->> 'type' = 'header'
          and r.props ->> 'index' = 'header_0'
          and t.props ->> 'name' = 'areaOfPermanentForestEstate'
            )
  `
  )
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
