import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'
import { VisitCycleLinksJob } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'

export const verifyLinksWorkerProcessor = async (job: VisitCycleLinksJob): Promise<void> => {
  const { assessment, countryIso, cycle } = job.data
  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })
  await verifyLinksJob.runFromQueue(job)
}
