import { AssessmentNames, TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const assessmentName = AssessmentNames.fra
const cycleName = '2020'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const { uuid: cycleUuid } = cycle
  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      with src as
               (select c.id
                from ${schemaAssessment}.col c
                         left join ${schemaAssessment}.row r on r.id = c.row_id
                         left join ${schemaAssessment}."table" t on t.id = r.table_id
                where t.props ->> 'name' = '${TableNames.sustainableDevelopment15_2_1_1}'
                  and c.props ->> 'colType' = 'header'
                  and r.props ->> 'index' = 'header_1'
                  and c.props ->> 'index' = '10')
      update ${schemaAssessment}.col c
      set props = c.props #- '{style,${cycleUuid}}'
                      #- '{labels,${cycleUuid}}'
          || jsonb_build_object('cycles', (c.props -> 'cycles') - '${cycleUuid}')
      from src
      where c.id = src.id;

      with src as
               (select c.id
                from ${schemaAssessment}.col c
                         left join ${schemaAssessment}.row r on r.id = c.row_id
                         left join ${schemaAssessment}."table" t on t.id = r.table_id
                where t.props ->> 'name' = '${TableNames.sustainableDevelopment15_2_1_2}'
                  and c.props ->> 'colName' = '2020'
                order by c.props -> 'index')
      update ${schemaAssessment}.col c
      set props = jsonb_set(
                          jsonb_set(
                                  c.props, '{style,${cycleUuid}}', '{}'::jsonb
                          ),
                          '{calculateFn,${cycleUuid}}',
                          '"biomassStock.forest_above_ground"'
                  )
          ||
                  jsonb_build_object('cycles', (c.props -> 'cycles') || '["${cycleUuid}"]')
      from src
      where c.id = src.id;
  `)

  await AssessmentController.generateMetadataCache({ assessment }, client)

  const update = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache: true }, client)
  await updateDependencies(
    {
      ...update,
      includeSourceNodes: true,
      nodes: [
        {
          tableName: TableNames.sustainableDevelopment15_2_1_2,
          variableName: 'aboveGroundBiomassStockForests',
          colName: '2020',
          value: { raw: undefined },
        },
      ],
    },
    client
  )
}
