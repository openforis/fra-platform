import { Assessment, Cycle, SubSection } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from './utils/getAssessmentCycle'

const _removeVariable = async (
  {
    sectionName,
    variableName,
    assessment,
    cycle,
  }: { assessment: Assessment; cycle: Cycle; sectionName: string; variableName: string },
  client: BaseProtocol
) => {
  const schemaName = Schemas.getName(assessment)

  const subSection = await client.one<SubSection>(
    `select * from ${schemaName}.section s where s.props ->> 'name' = '${sectionName}'`
  )

  subSection.props.descriptions[cycle.uuid].nationalData.dataSources.table.variables = subSection.props.descriptions[
    cycle.uuid
  ].nationalData.dataSources.table.variables.filter((v) => v.variableName !== variableName)

  const query = `update ${schemaName}.section set props = props || '{"descriptions": ${JSON.stringify(
    subSection.props.descriptions
  )}}' where id = ${subSection.id}`

  await client.query(query)
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)

  // Remove extra variables:
  // 2a
  await _removeVariable(
    { sectionName: 'growingStockComposition', variableName: 'mostRecentYear', cycle, assessment },
    client
  )
  // 4a
  await _removeVariable({ sectionName: 'forestOwnership', variableName: 'unknown', cycle, assessment }, client)
  // 4b
  await _removeVariable({ sectionName: 'holderOfManagementRights', variableName: 'unknown', cycle, assessment }, client)
  // 7a
  await _removeVariable(
    { sectionName: 'nonWoodForestProductsRemovals', variableName: 'totalValue', cycle, assessment },
    client
  )
}
