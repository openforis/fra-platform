import { Logger } from 'server/utils/logger'
import { JobLock } from 'server/worker/job/jobLock'

export abstract class Job {
  #name: string
  #jobLock: JobLock

  protected constructor(name: string) {
    this.#name = name
    this.#jobLock = new JobLock(this.#name)
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

  public async run(): Promise<void> {
    try {
      this.logInfo(`**** started`)

      await this.#jobLock.acquireLock()
      await this.execute()
      await this.#jobLock.releaseSuccess()
    } catch (error) {
      await this.#jobLock.releaseError(error)
      this.logError(JSON.stringify(error))
      throw error
    } finally {
      this.logInfo(`**** terminated`)
    }
  }
}
