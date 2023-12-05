import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaAssessment = Schemas.getName(assessment)
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      const nodes = await client.map<NodeUpdate>(
        `
        update ${schemaCycle}.node n
        set value = jsonb_build_object('raw', null)
        from (select t.props ->> 'name'         as table_name,
                     r.props ->> 'variableName' as variable_name,
                     c.props ->> 'colName'      as col_name,
                     n.id                       as node_id
              from ${schemaCycle}.node n
                       left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                       left join ${schemaAssessment}.row r on r.id = c.row_id
                       left join ${schemaAssessment}."table" t on t.id = r.table_id
              where (n.value ->> 'raw' is null or n.value ->> 'raw' = '')
                and c.props ->> 'colType' = 'select') as n_src
        where n.id = n_src.node_id
        returning n_src.table_name,n_src.variable_name,n_src.col_name
        ;
    `,
        [],
        (res) => Objects.camelize(res)
      )

      await updateDependencies({ assessment, cycle, nodes }, client)
    })
  )
}
