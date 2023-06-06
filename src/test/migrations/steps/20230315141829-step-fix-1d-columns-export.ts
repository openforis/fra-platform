import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle: cycle2020 } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2020' }, client)

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.table
      set props = jsonb_set(
              props,
              '{columnsExport,${cycle2020.uuid}}',
              (props -> 'columnNames' -> '${cycle2020.uuid}')::jsonb
          )
      where props ->> 'name' = 'forestAreaChange'
  `)
}
