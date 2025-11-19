import IORedis from 'ioredis'
import Redlock, { Lock } from 'redlock'

import { ProcessEnv } from 'server/utils'
import { JobStatus } from 'server/worker/job/jobStatus'

export class JobLock {
  #name: string
  #lock: Lock
  static #redis: IORedis = new IORedis(ProcessEnv.redisQueueUrl)
  static #redlock: Redlock = new Redlock([JobLock.#redis], { retryCount: 0, retryDelay: 200 })

  constructor(name: string) {
    this.#name = name
  }

  private async setStatus(status: JobStatus, extra = {}): Promise<void> {
    const date = new Date()
    const payload = { status, date: date.toISOString(), ...extra }
    await JobLock.#redis.set(`job:${this.#name}`, JSON.stringify(payload))
  }

  private async releaseLock(): Promise<void> {
    if (this.#lock) {
      await JobLock.#redlock.release(this.#lock)
    }
  }

  public async acquireLock(): Promise<void> {
    this.#lock = await JobLock.#redlock.acquire([`lock:${this.#name}`], 5 * 60 * 1000)
    await this.setStatus(JobStatus.running)
  }

  public async releaseSuccess(): Promise<void> {
    await this.releaseLock()
    await this.setStatus(JobStatus.success)
  }

  public async releaseError(error: unknown): Promise<void> {
    await this.releaseLock()
    await this.setStatus(JobStatus.failed, { error: JSON.stringify(error) })
  }
}
