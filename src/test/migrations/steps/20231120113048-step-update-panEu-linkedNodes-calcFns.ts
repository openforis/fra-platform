import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentNames, SectionName, VariableCache } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { DataRepository } from 'server/repository/assessmentCycle/data'

import { updateCalculatedVariable } from 'test/migrations/steps/utils/updateCalculatedVariable'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: AssessmentNames.panEuropean,
      cycleName: '2025',
      metaCache: true,
    },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const tables = await TableRepository.getMany({ assessment, cycle }, client)
  await Promise.all(
    tables.map((table) => DataRepository.createOrReplaceTableDataView({ assessment, cycle, table }, client))
  )

  const variables = await client.map<VariableCache & { sectionName: SectionName }>(
    `
        update ${schemaAssessment}.col c
        set props = props || jsonb_build_object(
                'calculateFn', jsonb_build_object(
                                '${cycle.uuid}', c2.calc_fn
                    )
            )
        from (select c.id,
                     s.props ->> 'name'         as section_name,
                     t.props ->> 'name'         as table_name,
                     r.props ->> 'variableName' as variable_name,
                     c.props ->> 'colName'      as col_name,
                     (c.props -> 'linkedNodes' -> '${cycle.uuid}' ->> 'assessmentName')::text
                         || '['''
                         || (c.props -> 'linkedNodes' -> '${cycle.uuid}' ->> 'cycleName')::text
                         || '''].'
                         || (c.props -> 'linkedNodes' -> '${cycle.uuid}' ->> 'tableName')::text
                         || '.'
                         || (c.props -> 'linkedNodes' -> '${cycle.uuid}' ->> 'variableName')::text
                         || '['''
                         || (c.props -> 'linkedNodes' -> '${cycle.uuid}' ->> 'colName')::text
                         || ''']'
                                                as calc_fn
              from ${schemaAssessment}.col c
                       left join ${schemaAssessment}.row r on r.id = c.row_id
                       left join ${schemaAssessment}."table" t on t.id = r.table_id
                       left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                       left join ${schemaAssessment}.section s on s.id = ts.section_id
              where c.props ->> 'linkedNodes' is not null) c2
        where c.id = c2.id
        returning c2.id, c2.section_name, c2.table_name, c2.variable_name, c2.col_name;
    `,
    [],
    (res) => Objects.camelize(res)
  )

  await Promises.each(variables, async (variable) => {
    const { sectionName, tableName, variableName } = variable
    await updateCalculatedVariable({ assessment, cycle, sectionName, tableName, variableName }, client)
  })
}
