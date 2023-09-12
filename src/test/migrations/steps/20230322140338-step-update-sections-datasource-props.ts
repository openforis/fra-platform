import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: 'fra',
      cycleName: '2025',
    },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const query1 = `
  update ${schemaName}.section s
  set props = jsonb_set(props, '{descriptions,${cycle.uuid},nationalData,dataSources,table,columns,1}', '"typeOfDataSourceText"')
  where s.props ->> 'name' in ('forestPolicy', 'areaOfPermanentForestEstate', 'nonWoodForestProductsRemovals')
  `

  const query2 = `
      update ${schemaName}.section s
      set props = jsonb_set(props, '{descriptions,${cycle.uuid},nationalData,dataSources,table,dataSourceVariables}', '{
      "include": [
        "common.otherSpecifyInComments"
      ],
      "exclude": []
    }')
          where s.props ->> 'name'
                    in ('extentOfForest', 'forestCharacteristics', 'specificForestCategories', 'forestAreaChange',
                        'otherLandWithTreeCover', 'growingStock', 'growingStockComposition', 'biomassStock', 'carbonStock',
                        'designatedManagementObjective', 'forestAreaWithinProtectedAreas', 'forestRestoration', 'forestOwnership',
                        'holderOfManagementRights', 'disturbances', 'areaAffectedByFire');
  `

  await client.query(query1)
  await client.query(query2)
}
