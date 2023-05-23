import { Row, SubSection } from '@meta/assessment'

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

  const rowGrowingStockTotal = await client.one<Row>(
    `
      select * from ${schemaName}.row r
      where table_id = (select id from ${schemaName}.table where props->>'name' = $1)
        and props->>'type' = 'data'
        and props->>'index' = '7';
    `,
    'growingStockTotal'
  )

  await client.query(
    `
      update ${schemaName}.col c set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.otherWoodedLand.otherWoodedLand2025"')
      where row_id = $1
        and props->>'index' = 'header_0';
    `,
    rowGrowingStockTotal.id
  )

  const rowGrowingStockAvg = await client.one<Row>(
    `
      select * from ${schemaName}.row r
      where table_id = (select id from ${schemaName}.table where props->>'name' = $1)
        and props->>'type' = 'data'
        and props->>'index' = '7';
    `,
    'growingStockAvg'
  )

  await client.query(
    `
      update ${schemaName}.col c set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.otherWoodedLand.otherWoodedLand2025"')
      where row_id = $1
        and props->>'index' = 'header_0';
    `,
    rowGrowingStockAvg.id
  )
}
