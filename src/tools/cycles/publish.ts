import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentNames } from 'meta/assessment/assessment'

import { DB } from 'server/db/db'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

const client = DB
const assessmentName = AssessmentNames.fra
const cycleName = '2025'

export const publishCycle = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const user = await UserController.getUserRobot(client)
  await AssessmentController.publishCycle({ assessment, cycle, user }, client)
}

ToolsUtils.exec(publishCycle)
