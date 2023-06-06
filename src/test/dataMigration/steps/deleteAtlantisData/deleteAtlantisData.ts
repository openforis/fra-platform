import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const deleteAtlantisData = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')

  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(
    `
      delete
      from ${schemaCycle}.descriptions d
      where d.country_iso like $1;

      delete
      from ${schemaCycle}.node d
      where d.country_iso like $1
        and id not in (select n.id
                       from ${schemaCycle}.node n
                                left join ${schema}.row r on n.row_uuid = r.uuid
                                left join ${schema}."table" t on r.table_id = t.id
                       where n.country_iso like 'X%'
                         and t.props ->> 'name' = 'extentOfForest'
                         and r.props ->> 'variableName' = 'totalLandArea');

      delete
      from ${schemaCycle}.message_topic d
      where d.country_iso like $1;

      delete
      from ${schemaCycle}.original_data_point d
      where d.country_iso like $1;

      delete
      from public.activity_log d
      where d.country_iso like $1
        and d.assessment_uuid = $2
        and d.cycle_uuid = $3;
  `,
    ['X%', assessment.uuid, cycle2025.uuid]
  )
}
