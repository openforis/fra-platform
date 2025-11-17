import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { MailService } from 'server/service'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB
const name = 'Scheduler-RemindReviewers'

export const remindReviewers = async (): Promise<void> => {
  Logger.info(`[${name}] ** started`)

  await client.tx(async (tx) => {
    const assessments = await AssessmentController.getAll({}, tx)
    await MailService.remindReviewers({ assessments })
  })
}
