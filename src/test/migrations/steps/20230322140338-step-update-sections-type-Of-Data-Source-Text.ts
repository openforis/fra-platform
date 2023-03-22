import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: 'fra',
      cycleName: '2025',
    },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const query = `
  update ${schemaName}.section s
  set props = jsonb_set(props, '{descriptions,${cycle.uuid},nationalData,dataSources,table,columns,1}', '"typeOfDataSourceText"')
  where s.props ->> 'name' in ('forestPolicy', 'areaOfPermanentForestEstate', 'nonWoodForestProductsRemovals')
  `

  await client.query(query)
}
