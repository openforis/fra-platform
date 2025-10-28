import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'

import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { CacheController } from 'server/cache/controller'

const client = DB
const assessmentName = AssessmentNames.fra
// const cycleName = '2025'
const cycleNameClone = 'latest'
// const cycleNameCloneRenamed = '2026'

const _removeColumns = async (props: { assessment: Assessment }): Promise<void> => {
  const { assessment } = props

  const schemaAssessment = Schemas.getName(assessment)
  await client.query(`
      delete
      from ${schemaAssessment}.col
      where id in
            (select c.id
             from ${schemaAssessment}.col c
                      left join ${schemaAssessment}.row r on r.id = c.row_id
                      left join ${schemaAssessment}."table" t on r.table_id = t.id
             where c.props ->> 'colName' = '2024'
               and t.props ->> 'name' in ('areaAffectedByFire', 'disturbances'))
  `)
  await CacheController.generateMetadata({ assessment }, client)
}

export const removeCycle = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName,
      // cycleName: cycleNameCloneRenamed,
      cycleName: cycleNameClone,
    },
    client
  )
  const user = await UserController.getOne({ email: 'fra@fao.org' }, client)
  const update = await AssessmentController.removeCycle({ assessment, cycle, user }, client)

  await _removeColumns({ assessment: update.assessment })
}

ToolsUtils.exec(removeCycle)
