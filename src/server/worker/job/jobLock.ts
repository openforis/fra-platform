import IORedis from 'ioredis'
import { createLock, IoredisAdapter, type Lock, LockAcquisitionError, type LockHandle } from 'redlock-universal'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { RedisClient } from 'server/utils/redis/client'
import { JobStatus, JobStatusPayload } from 'server/worker/job/jobStatus'

export class JobLock {
  #lock?: LockHandle
  #lockManager: Lock
  #name: string
  static #redis: IORedis = RedisClient.newInstance(ProcessEnv.redisQueueUrl)
  static #redisAdapter = new IoredisAdapter(JobLock.#redis)

  constructor(name: string) {
    this.#name = name
    this.#lockManager = createLock({
      adapter: JobLock.#redisAdapter,
      key: `lock:${this.#name}`,
      ttl: 10 * 60 * 1000,
      retryAttempts: 0,
      retryDelay: 200,
      circuitBreaker: false,
    })
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
    if (!this.#lock) return

    const released = await this.#lockManager.release(this.#lock)
    if (!released) throw new Error(`Lock for job ${this.#name} was not released`)

    this.#lock = undefined
  }

  public static async disconnect(): Promise<void> {
    await JobLock.#redis.quit()
  }

  public async acquireLock(): Promise<boolean> {
    try {
      this.#lock = await this.#lockManager.acquire()
    } catch (error) {
      // Note: redlock-universal throws when acquire() fails for any reason (lock already held, but also
      // Redis errors). So return false (skip) only when the lock is actually held, otherwise re-throw.
      if (error instanceof LockAcquisitionError && error.cause?.message.includes('already held')) return false

      throw error
    }
    await this.setStatus(JobStatus.running, { startedAt: new Date().toISOString() })
    return true
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
