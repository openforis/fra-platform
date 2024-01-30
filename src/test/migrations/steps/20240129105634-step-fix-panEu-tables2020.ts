import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { Assessment, AssessmentNames, Cycle, Section, SectionName, Table, TableName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { Logger } from 'server/utils/logger'

type Check = {
  sectionName: SectionName
  sectionProps: Section['props']
  tableName: TableName
  tableProps: Table['props']
}

const _fix2020 = async (
  props: { assessment: Assessment; cycle: Cycle; check: Check },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle, check } = props
  const { tableName, sectionName } = check
  const tableName2020 = `${tableName}_2020`

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // -- 1. fix unique table name
  const res = await client.oneOrNone<{ id: number }>(`
      update ${schemaAssessment}."table" t
      set props = jsonb_set(t.props, '{name}', '"${tableName2020}"')
      from (select t2.id
            from ${schemaAssessment}."table" t2
                     left join ${schemaAssessment}.table_section ts on t2.table_section_id = ts.id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = '${sectionName}'
              and t2.props ->> 'name' = '${tableName}') as src
      where t.id = src.id
      returning t.id;`)

  if (res) {
    // -- 2. fix unique row variable names
    await client.query(`
        update ${schemaAssessment}.row r
        set props = r.props || jsonb_build_object('variableName', src.variable_name)
        from (select r.id
                   , '_2020_' || (r.props ->> 'variableName') as variable_name
              from ${schemaAssessment}.row r
              where r.props ->> 'variableName' is not null
                and r.table_id = ${res.id}) as src
        where r.id = src.id
    `)

    // -- 3. generate table 2020 view and drop old view
    const table = await MetadataController.getTable({ assessment, cycle, tableName: tableName2020 }, client)
    await DataRepository.createOrReplaceTableDataView({ assessment, cycle, table })
    await DB.query(`drop view if exists ${schemaCycle}.${tableName}`)
  }
}

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.panEuropean }, client)
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')

  const schemaAssessment = Schemas.getName(assessment)

  const checks = await client.map<Check>(
    `
      select s.props ->> 'name' as section_name
           , s.props            as section_props
           , t.props ->> 'name' as table_name
           , t.props            as table_props
      from ${schemaAssessment}."table" t
               left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
               left join ${schemaAssessment}.section s on s.id = ts.section_id

  `,
    [],
    (res) => Objects.camelize(res)
  )
  const checksMap: Record<TableName, Check> = {}

  await Promises.each(checks, async (check) => {
    const checkDuplicate = checksMap[check.tableName]

    if (checkDuplicate) {
      const checksArray = [checkDuplicate, check]
      const check2020 = checksArray.find(
        (c) => c.tableProps.cycles.length === 1 && c.tableProps.cycles[0] === cycle2020.uuid
      )
      const check2025 = checksArray.find(
        (c) => c.tableProps.cycles.length === 1 && c.tableProps.cycles[0] === cycle2025.uuid
      )

      if (check2020 && check2025) {
        Logger.debug(
          `Found duplicate 2020-${check2020.sectionName}-${check2020.tableName} and 2025-${check2025.sectionName}-${check2025.tableName}`
        )
        await _fix2020({ assessment, cycle: cycle2020, check: check2020 }, client)
      } else {
        throw new Error(
          `Missing check for duplicate ${checkDuplicate.sectionName}-${checkDuplicate.tableName} ${check.sectionName}-${check.tableName}`
        )
      }
    } else {
      checksMap[check.tableName] = check
    }
  })

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
  await AssessmentController.generateDataCache({ assessment, cycle: cycle2020, force: true }, client)
}
