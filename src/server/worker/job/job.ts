import { ResourceLockedError } from 'redlock'

import { Logger } from 'server/utils/logger'
import { JobLock } from 'server/worker/job/jobLock'
import { JobStatus, JobStatusPayload } from 'server/worker/job/jobStatus'

type JobOptions = {
  lockDurationMs?: number
}

export abstract class Job {
  #name: string
  #jobLock: JobLock

  protected constructor(name: string, options?: JobOptions) {
    this.#name = name
    this.#jobLock = new JobLock(this.#name, options?.lockDurationMs)
  }

  protected abstract execute(): Promise<void>

  private getLogMessage(message: string): string {
    return `JOB-${this.#name}: ${message}`
  }

  protected logInfo(message: string): void {
    Logger.info(this.getLogMessage(message))
  }

  protected logDebug(message: string): void {
    Logger.debug(this.getLogMessage(message))
  }

  protected logError(message: string): void {
    Logger.error(this.getLogMessage(message))
  }

  protected async setStatus(status: JobStatus, details: Partial<JobStatusPayload> = {}): Promise<void> {
    await this.#jobLock.setStatus(status, details)
  }

  public async getStatus(): Promise<JobStatusPayload | null> {
    return this.#jobLock.getStatus()
  }

  public async run(): Promise<void> {
    try {
      this.logInfo(`**** started`)

      await this.#jobLock.acquireLock()
      await this.execute()
      await this.#jobLock.releaseSuccess()
    } catch (error) {
      if (error instanceof ResourceLockedError) {
        this.logInfo(`**** already running - skipped`)
        return
      }

      await this.#jobLock.releaseError(error)
      this.logError(JSON.stringify(error))
      throw error
    } finally {
      this.logInfo(`**** terminated`)
    }
  }
}
