import 'tsconfig-paths/register'
import 'dotenv/config'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { DB } from 'server/db'

const client = DB
const assessmentName = AssessmentNames.fra
// const cycleName = '2025'
const cycleNameClone = 'latest'
const cycleNameCloneRenamed = '2026'

export const renameCycle = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName: cycleNameClone },
    client
  )
  const user = await UserController.getOne({ email: 'fra@fao.org' }, client)
  await AssessmentController.renameCycle({ assessment, cycle, name: cycleNameCloneRenamed, user }, client)
}

ToolsUtils.exec(renameCycle)
