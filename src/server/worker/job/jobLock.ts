import IORedis from 'ioredis'
import Redlock, { Lock } from 'redlock'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { JobStatus, JobStatusPayload } from 'server/worker/job/jobStatus'

const defaultLockDurationMs = 5 * 60 * 1000

export class JobLock {
  #lock: Lock
  #lockDurationMs: number
  #name: string
  static #redis: IORedis = new IORedis(ProcessEnv.redisQueueUrl)
  static #redlock: Redlock = new Redlock([JobLock.#redis], { retryCount: 0, retryDelay: 200 })

  constructor(name: string, lockDurationMs = defaultLockDurationMs) {
    this.#name = name
    this.#lockDurationMs = lockDurationMs
  }

  public async getStatus(): Promise<JobStatusPayload | null> {
    const status = await JobLock.#redis.get(`job:${this.#name}`)
    if (!status) return null

    try {
      return JSON.parse(status) as JobStatusPayload
    } catch (error) {
      Logger.error(`[JobLock] failed parsing status for ${this.#name}: ${JSON.stringify(error)}`)
      return null
    }
  }

  public async setStatus(status: JobStatus, details: Partial<JobStatusPayload> = {}): Promise<void> {
    const date = new Date().toISOString()
    const existing = await this.getStatus()
    const payload: JobStatusPayload = { ...(existing ?? {}), status, date, ...details }

    if (status !== JobStatus.failed) {
      delete payload.error
    }
    if (status === JobStatus.queued) {
      delete payload.startedAt
      delete payload.finishedAt
    }
    if (status === JobStatus.running) {
      delete payload.finishedAt
    }

    await JobLock.#redis.set(`job:${this.#name}`, JSON.stringify(payload))
  }

  private async releaseLock(): Promise<void> {
    if (this.#lock) {
      await JobLock.#redlock.release(this.#lock)
    }
  }

  public static async disconnect(): Promise<void> {
    await JobLock.#redlock.quit()
  }

  public async acquireLock(): Promise<void> {
    this.#lock = await JobLock.#redlock.acquire([`lock:${this.#name}`], this.#lockDurationMs)
    await this.setStatus(JobStatus.running, { startedAt: new Date().toISOString() })
  }

  public async releaseSuccess(): Promise<void> {
    await this.releaseLock()
    await this.setStatus(JobStatus.success, { finishedAt: new Date().toISOString() })
  }

  public async releaseError(error: unknown): Promise<void> {
    await this.releaseLock()
    await this.setStatus(JobStatus.failed, { error: JSON.stringify(error), finishedAt: new Date().toISOString() })
  }
}
