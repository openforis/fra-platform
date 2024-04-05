import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'
import { MailService } from 'server/service'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export const initRemindReviewers = (connection: IORedis): Worker => {
  const name = 'Scheduler-RemindReviewers'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async () => {
      Logger.info(`[${name}] ** started`)

      await client.tx(async (tx) => {
        const assessments = await AssessmentController.getAll({}, tx)
        await MailService.remindReviewers({ assessments })
      })
    },
    { concurrency: 1, connection, lockDuration: 10_000, maxStalledCount: 0 }
  )

  queue.add(`${name}-scheduler`, undefined, {
    // once a day, one minute past midnight
    repeat: { pattern: '1 0 * * *' },
    removeOnComplete: true,
    removeOnFail: false,
  })

  return worker
}
