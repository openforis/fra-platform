import '../scriptInit'

import http from 'http'

import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { UserController } from 'server/controller/user'
import { BaseProtocol, DB } from 'server/db/db'
import { LinksService } from 'server/service/links'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

import { Failures } from './common/failures'
import { getAssessmentCycles } from './common/getAssessmentCycles'
import { Failure } from './common/types'

const toolName = 'validateLinks'

// Run this only when no link verification is queued or running: it verifies directly, without the queue dedup or lock,
// so two runs would have conflicting status and activity logs, and race to rebuild the links validation cache.
export const validateLinks = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  await SocketServer.init(http.createServer())

  const failures: Array<Failure> = []
  const user = await UserController.getUserRobot(client)
  const assessmentCycles = await getAssessmentCycles(client)

  await Promises.each(assessmentCycles, async ({ assessment, cycle }) => {
    const assessmentName = assessment.props.name
    const { name: cycleName } = cycle
    Logger.info(`${toolName}: ${assessmentName}/${cycleName}`)

    try {
      await LinksService.verifyLinks({ assessment, cycle, user }, client)
    } catch (error) {
      Logger.error(`${toolName} failed for ${assessmentName}/${cycleName}`)
      failures.push({ assessmentName, cycleName, error })
    }
  })

  return failures
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateLinks()))
}
