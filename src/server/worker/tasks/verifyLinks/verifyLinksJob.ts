import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { Job } from 'server/worker/job/job'
import { JobStatus, JobStatusPayload } from 'server/worker/job/jobStatus'
import { insertLinksCheckActivityLog } from 'server/worker/tasks/verifyLinks/utils/insertLinksCheckActivityLog'
import { VerifyAllLinksJob } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import workerProcessor from 'server/worker/tasks/verifyLinks/visitCycleLinks/worker'

type VerifyLinksJobContext = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

const jobNamePrefix = 'VerifyLinks'

export class VerifyLinksJob extends Job {
  #queueJob?: VerifyAllLinksJob

  public constructor(context: VerifyLinksJobContext) {
    super(VerifyLinksJob.getJobName(context))
  }

  public static getJobName(context: VerifyLinksJobContext): string {
    const { assessment, countryIso, cycle } = context
    const baseJobName = `${jobNamePrefix}/${assessment.props.name}/${cycle.name}`
    return Objects.isEmpty(countryIso) ? baseJobName : `${baseJobName}/${countryIso}`
  }

  public async runFromQueue(job: VerifyAllLinksJob): Promise<void> {
    const jobId = job.id?.toString()
    this.#queueJob = job

    try {
      const { assessment, countryIso, cycle, user } = job.data

      // Update redis to sync with BullMQ job status.
      await this.setRunning(jobId)
      await insertLinksCheckActivityLog({ assessment, countryIso, cycle, status: 'started', user })

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
    const startedAt = new Date().toISOString()
    const details: Partial<JobStatusPayload> = Objects.isEmpty(jobId)
      ? { jobId, queuedAt: undefined, startedAt }
      : { jobId, startedAt }
    await this.setStatus(JobStatus.running, details)
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
