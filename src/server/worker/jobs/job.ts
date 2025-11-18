import { Logger } from 'server/utils/logger'
import { JobLock } from 'server/worker/jobs/jobLock'

export abstract class Job {
  #name: string
  #jobLock: JobLock

  protected constructor(name: string) {
    this.#name = name
    this.#jobLock = new JobLock(this.#name)
  }

  protected abstract execute(): Promise<void>

  public async run(): Promise<void> {
    try {
      Logger.info(`JOB:${this.#name}]**** started`)

      await this.#jobLock.acquireLock()
      await this.execute()
      await this.#jobLock.releaseSuccess()
    } catch (error) {
      await this.#jobLock.releaseError(error)
      throw error
    } finally {
      Logger.info(`JOB:${this.#name} **** terminated`)
    }
  }
}
