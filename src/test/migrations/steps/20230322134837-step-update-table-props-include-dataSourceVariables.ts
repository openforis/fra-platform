import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)
  const schemaName = Schemas.getName(assessment)
  const query = `update
    ${schemaName}.table t
    set
        props = jsonb_set(props, '{dataSourceVariables}', '{"include": ["common.otherSpecifyInComments"], "exclude": []}')
    where
        t.id in (select t.id
                 from ${schemaName}.section s
                          left join ${schemaName}.table_section ts on ts.section_id = s.id
                          left join ${schemaName}.table t on ts.id = t.table_section_id
                 where s.props ->> 'name' in (
                                              'extentOfForest', 'forestCharacteristics', 'specificForestCategories', 'forestAreaChange', 'otherLandWithTreeCover', 'growingStock', 'growingStockComposition', 'biomassStock', 'carbonStock', 'designatedManagementObjective', 'forestAreaWithinProtectedAreas', 'forestRestoration', 'forestOwnership', 'holderOfManagementRights', 'disturbances', 'areaAffectedByFire'
                     ))
                 `
  await client.query(query)
}
