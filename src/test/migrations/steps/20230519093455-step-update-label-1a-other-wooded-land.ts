import { BaseProtocol, Schemas } from '@server/db'

import { AssessmentCycleUtil } from '@test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  // update label for col header
  await client.query(`update ${schemaName}.col
        set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.extentOfForest.otherWoodedLand"')
        where id in (
            select c.id
            from  ${schemaName}.table t
                      left join ${schemaName}.row r on t.id = r.table_id
                      left join ${schemaName}.col c on r.id = c.row_id
            where t.props ->> 'name' = 'extentOfForest'
              and r.props ->> 'variableName' = 'otherWoodedLand'
              and c.props ->> 'colType' = 'header'
            );`)

  // update label for row chart
  await client.query(`
    update ${schemaName}.row
    set props = jsonb_set(props, '{chart,"${cycle.uuid}",labelKey}', '"fra.extentOfForest.otherWoodedLand"')
    where id in (
        select r.id
        from  ${schemaName}.table t
                  left join ${schemaName}.row r on t.id = r.table_id
        where t.props ->> 'name' = 'extentOfForest'
          and r.props ->> 'variableName' = 'otherWoodedLand'
    )`)
}
