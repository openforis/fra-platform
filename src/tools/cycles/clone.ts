import '../scriptInit'

import { AssessmentNames } from 'meta/assessment/assessment'
import { UserEmails } from 'meta/user/emails'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const client = DB
const assessmentName = AssessmentNames.fra
const cycleName = 'latest'
const cycleNameClone = '2030'

// const _addColumns = async (props: { assessment: Assessment; cycle: Cycle }): Promise<void> => {
//   const { assessment, cycle } = props
//   // add 2024 column to disturbances and areaAffectedByFire tables
//   const tables = await Promise.all([
//     TableRedisRepository.getOne({ assessment, cycle, tableName: 'disturbances' }),
//     TableRedisRepository.getOne({ assessment, cycle, tableName: 'areaAffectedByFire' }),
//   ])
//   await Promise.all(
//     tables.map(async (table) => {
//       const colProps: ColProps = { colName: '2024', colType: ColType.decimal }
//       await MetadataController.addColumn({ assessment, cycles: [cycle], table, colProps }, client)
//       const tableProps: Partial<Table['props']> = {
//         style: {
//           ...table.props.style,
//           [cycle.uuid]: { gridTemplateColumns: `minmax(150px, auto) repeat(25, minmax(min-content, 1fr))` },
//         },
//       }
//       await TableRepository.update({ assessment, tableId: table.id, tableProps }, client)
//     })
//   )
//   await CacheController.generateMetadata({ assessment }, client)
// }

export const cloneCycle = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  await DB.query(`drop schema if exists ${Schemas.getNameCycle(assessment, { name: cycleNameClone })} cascade;`)

  const user = await UserController.getOne({ email: UserEmails.robot, allowDisabled: true }, client)
  const clone = await AssessmentController.cloneCycle({ assessment, cycle, name: cycleNameClone, user }, client)

  await client.query(`
    delete
    from assessment_fra_2030.country
    where country_iso not in
          (select c.country_iso
           from assessment_fra_2030.country c
           where c.props ->> 'deskStudy' = 'true')
  `)
  await CacheController.generateArea({ assessment, cycle: clone.cycle }, client)
  // await _addColumns(clone)
}

ToolsUtils.exec(cloneCycle)
