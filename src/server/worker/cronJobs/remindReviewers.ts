import { AssessmentController } from 'server/controller/assessment'
import { MailService } from 'server/service'
import { Job } from 'server/worker/job/job'

const name = 'Scheduler-RemindReviewers'

export class RemindReviewers extends Job {
  constructor() {
    super(name)
  }

  protected async execute(): Promise<void> {
    const assessments = await AssessmentController.getAll({})
    await MailService.remindReviewers({ assessments })
  }
}
