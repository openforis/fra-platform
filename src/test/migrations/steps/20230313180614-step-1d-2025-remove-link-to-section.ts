import { Section, Table, TableSection } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2020' }, client)

  const schemaName = Schemas.getName(assessment)

  const section = await client.one<Section>(`select * from ${schemaName}.section where props->>'name' = 'forestAreaChange';`)

  const tableSection = await client.one<TableSection>(`select * from ${schemaName}.table_section where section_id = $1;`, [section.id])

  const table = await client.one<Table>(`select * from ${schemaName}.table where table_section_id = $1;`, [tableSection.id])

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{linkToSection}', $1::jsonb) where r.props->>'index' = '4' and table_id = $2;`,
    [JSON.stringify({ [cycle.uuid]: 'extentOfForest' }), table.id]
  )
}
