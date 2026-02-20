import { MailService } from 'server/service'
import { Job } from 'server/worker/job/job'

const name = 'Scheduler-NotifyLinksInvalid'

export class NotifyLinksInvalid extends Job {
  constructor() {
    super(name)
  }

  protected async execute(): Promise<void> {
    await MailService.notifyLinksInvalid()
  }
}
