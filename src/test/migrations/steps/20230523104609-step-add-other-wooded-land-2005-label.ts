import { SubSection } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

import { AssessmentCycleUtil } from '@test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)

  const schemaName = Schemas.getName(assessment)

  const sectionName = 'growingStock'

  const subSection = await client.one<SubSection>(
    `select * from ${schemaName}.section s where s.props ->> 'name' = '${sectionName}'`
  )

  const variables = subSection.props.descriptions[cycle.uuid].nationalData.dataSources.table.variables.reduce(
    (acc, curr) => [
      ...acc,
      curr.variableName === 'otherWoodedLand'
        ? { ...curr, label: { ...curr.label, key: 'fra.otherWoodedLand.otherWoodedLand2025' } }
        : curr,
    ],
    []
  )

  const query = `
      update ${schemaName}.section
      set props = jsonb_set(props, '{descriptions,"${
        cycle.uuid
      }",nationalData,dataSources,table,variables}', '${JSON.stringify(variables)}')
      where id = ${subSection.id};
    `

  await client.query(query)

  await client.query(
    `
      update ${schemaName}.col c
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.otherWoodedLand.otherWoodedLand2025"')
      where id in (
        select c.id
        from ${schemaName}.table t
          left join ${schemaName}.row r on t.id = r.table_id
          left join ${schemaName}.col c on r.id = c.row_id
        where t.props ->> 'name' = 'growingStockTotal'
          and r.props ->> 'variableName' = 'otherWoodedLand'
          and c.props->>'index' = 'header_0'
      );
    `
  )

  await client.query(
    `
      update ${schemaName}.col c
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.otherWoodedLand.otherWoodedLand2025"')
      where id in (
        select c.id
        from ${schemaName}.table t
          left join ${schemaName}.row r on t.id = r.table_id
          left join ${schemaName}.col c on r.id = c.row_id
        where t.props ->> 'name' = 'growingStockAvg'
          and r.props ->> 'variableName' = 'otherWoodedLand'
          and c.props->>'index' = 'header_0'
      );
    `
  )
}
