export enum JobStatus {
  failed = 'failed',
  queued = 'queued',
  running = 'running',
  success = 'success',
}

export type JobStatusPayload = {
  date: string
  error?: string
  finishedAt?: string
  jobId?: string
  queuedAt?: string
  startedAt?: string
  status: JobStatus
}
