import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { Job } from 'server/worker/job/job'
import { JobStatus } from 'server/worker/job/jobStatus'
import { VisitCycleLinksJob } from 'server/worker/tasks/verifyLinks/visitCycleLinks'
import workerProcessor from 'server/worker/tasks/verifyLinks/visitCycleLinks/worker'

type VerifyLinksJobContext = {
  assessment: Assessment
  cycle: Cycle
}

const jobNamePrefix = 'VerifyLinks'

export class VerifyLinksJob extends Job {
  #queueJob?: VisitCycleLinksJob

  public constructor(context: VerifyLinksJobContext) {
    super(VerifyLinksJob.getJobName(context))
  }

  public static getJobName(context: VerifyLinksJobContext): string {
    const { assessment, cycle } = context
    return `${jobNamePrefix}/${assessment.props.name}/${cycle.name}`
  }

  public async runFromQueue(job: VisitCycleLinksJob): Promise<void> {
    const jobId = job.id?.toString()
    this.#queueJob = job

    try {
      // Update redis to sync with BullMQ job status.
      await this.setRunning(jobId)
      await this.execute()
      await this.setSuccess(jobId)
    } catch (error) {
      await this.setFailed(error, jobId)
      throw error
    } finally {
      this.#queueJob = undefined
    }
  }

  public async setQueued(jobId?: string): Promise<void> {
    await this.setStatus(JobStatus.queued, { jobId, queuedAt: new Date().toISOString() })
  }

  public async setRunning(jobId?: string): Promise<void> {
    await this.setStatus(JobStatus.running, { jobId, startedAt: new Date().toISOString() })
  }

  public async setSuccess(jobId?: string): Promise<void> {
    await this.setStatus(JobStatus.success, { jobId, finishedAt: new Date().toISOString() })
  }

  public async setFailed(error: unknown, jobId?: string): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    await this.setStatus(JobStatus.failed, {
      error: errorMessage,
      finishedAt: new Date().toISOString(),
      jobId,
    })
  }

  protected async execute(): Promise<void> {
    if (!this.#queueJob) {
      throw new Error('VerifyLinksJob.execute requires a BullMQ job payload')
    }

    await workerProcessor(this.#queueJob)
  }
}
