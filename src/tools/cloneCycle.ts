import 'tsconfig-paths/register'
import 'dotenv/config'

import * as process from 'process'

import { Assessment, AssessmentNames, ColProps, ColType, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'
import { DB } from 'server/db'
import { TableRedisRepository } from 'server/repository/redis/table'
import { Logger } from 'server/utils/logger'

const close = async () => {
  await DB.$pool.end()
}

const client = DB
const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const cycleNameClone = 'latest'
// const cycleNameCloneRenamed = '2026'

// const _removeColumns = async (props: { assessment: Assessment }): Promise<void> => {
//   const { assessment } = props
//
//   const schemaAssessment = Schemas.getName(assessment)
//   await client.query(`
//       delete
//       from ${schemaAssessment}.col
//       where id in
//             (select c.id
//              from ${schemaAssessment}.col c
//                       left join ${schemaAssessment}.row r on r.id = c.row_id
//                       left join ${schemaAssessment}."table" t on r.table_id = t.id
//              where c.props ->> 'colName' = '2024'
//                and t.props ->> 'name' in ('areaAffectedByFire', 'disturbances'))
//   `)
//   await AssessmentController.generateMetadataCache({ assessment }, client)
// }

// const removeCycle = async (): Promise<void> => {
//   const { assessment, cycle } = await AssessmentController.getOneWithCycle(
//     {
//       assessmentName,
//       cycleName: cycleNameClone,
//     },
//     client
//   )
//   const user = await UserController.getOne({ email: 'fra@fao.org' }, client)
//   const update = await AssessmentController.removeCycle({ assessment, cycle, user }, client)
//
//   await _removeColumns({ assessment: update.assessment })
// }

const _addColumns = async (props: { assessment: Assessment; cycle: Cycle }): Promise<void> => {
  const { assessment, cycle } = props
  // add 2024 column to disturbances and areaAffectedByFire tables
  const tables = await Promise.all([
    TableRedisRepository.getOne({ assessment, cycle, tableName: 'disturbances' }),
    TableRedisRepository.getOne({ assessment, cycle, tableName: 'areaAffectedByFire' }),
  ])
  await Promise.all(
    tables.map(async (table) => {
      const colProps: ColProps = { colName: '2024', colType: ColType.decimal }
      await MetadataController.addColumn({ assessment, cycles: [cycle], table, colProps }, client)
    })
  )
  await AssessmentController.generateMetadataCache({ assessment }, client)
}

const cloneCycle = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const user = await UserController.getOne({ email: 'fra@fao.org' }, client)
  const clone = await AssessmentController.cloneCycle({ assessment, cycle, name: cycleNameClone, user }, client)

  await _addColumns(clone)
}

// const renameCycle = async (): Promise<void> => {
//   const { assessment, cycle } = await AssessmentController.getOneWithCycle(
//     { assessmentName, cycleName: cycleNameClone },
//     client
//   )
//   const user = await UserController.getOne({ email: 'fra@fao.org' }, client)
//   await AssessmentController.renameCycle({ assessment, cycle, name: cycleNameCloneRenamed, user }, client)
// }

const start = new Date().getTime()
Logger.info(`========== ******** Starting ${start}`)

cloneCycle().then(async () => {
  // removeCycle().then(async () => {
  // renameCycle().then(async () => {
  await close()
  const end = new Date().getTime()
  Logger.info(`========== ******** Executed ${end} elapsed ${(end - start) / 1000}s`)
  process.exit(0)
})
