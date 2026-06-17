import { QueueEvents } from 'bullmq'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { LinksController } from 'server/controller/cycleData/links'
import { UserController } from 'server/controller/user'
import { MailService } from 'server/service'
import { ProcessEnv } from 'server/utils'
import { Job } from 'server/worker/job/job'
import { triggerVerifyLinksWorker } from 'server/worker/tasks/verifyLinks/triggerVerifyLinksWorker'
import { VerifyLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'

const name = 'Scheduler-NotifyLinksInvalid'
const cycleName = CycleNames.latest
const assessmentName = AssessmentNames.fra

export class NotifyLinksInvalid extends Job {
  constructor() {
    super(name)
  }

  protected async execute(): Promise<void> {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
    })

    const user = await UserController.getUserRobot()

    // get existing job or create new job and process it
    const existingJob = await VerifyLinksQueueFactory.getQueuedOrActiveVerifyAllLinksJob({ assessment, cycle })
    const job = existingJob ?? (await LinksController.verify({ assessment, cycle, user }))
    await triggerVerifyLinksWorker()

    const connection = { url: ProcessEnv.redisQueueUrl }
    const queueEvents = new QueueEvents(VerifyLinksQueueFactory.queueName, { connection })

    try {
      await job.waitUntilFinished(queueEvents)
      await MailService.notifyLinksInvalid({ assessment, cycle })
    } finally {
      await queueEvents.close()
    }
  }
}
