import { QueueEvents } from 'bullmq'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { MailService } from 'server/service'
import { LinksService } from 'server/service/links'
import { ProcessEnv } from 'server/utils'
import { Job } from 'server/worker/job/job'
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

    const job = await LinksService.enqueueAllLinksValidation({ assessment, cycle, user })

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
