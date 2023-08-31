import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
  -- delete 2025 row validations
  update ${schemaAssessment}.row r
  set props = jsonb_delete_path(props, '{validateFns,${cycle.uuid}}')
  from (select r2.id
        from ${schemaAssessment}.row r2
                 left join ${schemaAssessment}."table" t on t.id = r2.table_id
        where t.props ->> 'name' = 'nonWoodForestProductsRemovals'
          and r2.props ->> 'variableName' like 'product%') as r2
  where r.id = r2.id;
  
  -- update 2025 col validations
  update ${schemaAssessment}.col c
  set props = jsonb_set(
          c.props,
          '{validateFns}',
          jsonb_build_object('${cycle.uuid}',
                             jsonb_build_array(
                                concat(
                                     'validatorNWFPProductAndCategory(nonWoodForestProductsRemovals.',
                                     c2.variable_name,
                                     '.',
                                     col_name,
                                     ',[',
                                     concat('nonWoodForestProductsRemovals.', c2.variable_name, '.key_species, '),
                                     concat('nonWoodForestProductsRemovals.', c2.variable_name, '.quantity, '),
                                     concat('nonWoodForestProductsRemovals.', c2.variable_name, '.unit, '),
                                     concat('nonWoodForestProductsRemovals.', c2.variable_name, '.value, '),
                                     concat('nonWoodForestProductsRemovals.', c2.variable_name,
                                            case
                                                when col_name = 'product_name' then '.category'
                                                else '.product_name' end),
                                     ']'
                                         ')'
                                 )
                             )
              ),
          true
      )
  from (select c.id,
               c.props ->> 'colName'      as col_name,
               r.props ->> 'variableName' as variable_name,
               c.props ->> 'validateFns'
        from ${schemaAssessment}.col c
                 left join ${schemaAssessment}.row r on r.id = c.row_id
                 left join ${schemaAssessment}."table" t on t.id = r.table_id
        where t.props ->> 'name' = 'nonWoodForestProductsRemovals'
          and r.props ->> 'variableName' like 'product%'
          and c.props ->> 'colName' in ('product_name', 'category')) as c2
  where c.id = c2.id;
  `)

  await AssessmentController.generateMetaCache({ assessment, cycle }, client)
}
