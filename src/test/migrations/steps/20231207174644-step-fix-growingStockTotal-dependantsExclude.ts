import { CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // -- remove erroneous dependantsExclude prop in growingStockTotal rows
  await client.query(`
      update ${schemaAssessment}.row r
      set props = src.props
      from (select r.id
                 , jsonb_delete(r.props, 'dependantsExclude') as props
            from ${schemaAssessment}.row r
                     left join ${schemaAssessment}."table" t on r.table_id = t.id
            where t.props ->> 'name' = 'growingStockTotal'
              and r.props -> 'dependantsExclude' is not null) as src
      where r.id = src.id;
  `)

  const countryNodes = await client.one<Record<CountryIso, Array<NodeUpdate>>>(
    `
      with odp1 as
          (select d.country_iso
                , 'forestCharacteristics' as table_name
                , 'primaryForest'         as variable_name
                , d.year::text            as col_name
           from ${schemaCycle}.original_data_point_data d
           where d.primary_forest is not null)

         , odp2 as
          (select d.country_iso
                , 'forestCharacteristics'          as table_name
                , 'plantationForestIntroducedArea' as variable_name
                , d.year::text                     as col_name
           from ${schemaCycle}.original_data_point_data d
           where d.plantation_forest_introduced_area is not null)
         , src as (select n.country_iso
                        , t.props ->> 'name'         as table_name
                        , r.props ->> 'variableName' as variable_name
                        , c.props ->> 'colName'      as col_name
                   from ${schemaCycle}.node n
                            left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                            left join ${schemaAssessment}.row r on r.id = c.row_id
                            left join ${schemaAssessment}."table" t on t.id = r.table_id
                   where t.props ->> 'name' = 'forestCharacteristics'
                     and r.props ->> 'variableName' in ('primaryForest', 'plantationForestIntroducedArea')
                   intersect
                   (select * from odp1 union select * from odp2))
         , data as
          (select s.country_iso
                , jsonb_agg(
                      jsonb_build_object('tableName', s.table_name, 'variableName', s.variable_name, 'colName',
                                         s.col_name)
                  ) as variables
           from src s
           group by s.country_iso)
      select jsonb_object_agg(d.country_iso, d.variables) as data
      from data d
  `,
    [],
    ({ data }) => data
  )

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)

  // re-fetch assessment since metacache has been updated
  const { assessment: assessmentUpdated, cycle: cycleUpdated } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true },
    client
  )

  await updateDependencies(
    { assessment: assessmentUpdated, cycle: cycleUpdated, countryNodes, isODP: false, includeSourceNodes: false },
    client
  )
}
