import { Cycle, Section, SubSection } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

const updateLabel = async (section: Section | SubSection, cycle: Cycle, schemaName: string, client: BaseProtocol) => {
  // if they key doesnt contain 'fra.<key>2025 then add it
  if (!section.props.labels[cycle.uuid].key.match(/^fra\..*2025$/)) {
    // eslint-disable-next-line no-param-reassign
    section.props.labels[cycle.uuid].key = `fra.${section.props.labels[cycle.uuid].key}2025`
  }

  await client.query(`update ${schemaName}.section set props = $1::jsonb where id = $2`, [JSON.stringify(section.props), section.id])
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const section1 = await client.one<Section>(`select * from ${schemaName}.section where id in (select parent_id
                                                  from ${schemaName}.section s
                                                  where s.props ->> 'name' = 'extentOfForest')`)

  const section1a = await client.one(`select * from ${schemaName}.section s where s.props ->> 'name' = 'extentOfForest'`)

  const section1e = await client.one(`select * from ${schemaName}.section s where s.props ->> 'name' = 'annualReforestation'`)

  const section3b = await client.one(`select * from ${schemaName}.section s where s.props ->> 'name' = 'forestAreaWithinProtectedAreas'`)

  const section5b = await client.one(`select * from ${schemaName}.section s where s.props ->> 'name' = 'areaAffectedByFire'`)

  const section6 = await client.one(
    `select * from ${schemaName}.section where id in (select parent_id from ${schemaName}.section s where s.props ->> 'name' = 'forestPolicy')`
  )

  await updateLabel(section1, cycle, schemaName, client)
  await updateLabel(section1a, cycle, schemaName, client)
  await updateLabel(section1e, cycle, schemaName, client)
  await updateLabel(section3b, cycle, schemaName, client)
  await updateLabel(section5b, cycle, schemaName, client)
  await updateLabel(section6, cycle, schemaName, client)
}
