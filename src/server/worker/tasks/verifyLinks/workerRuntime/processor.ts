import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { VerifyLinksQueueJob } from 'server/worker/tasks/verifyLinks/props'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'
import { VerifyAllLinksJob } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import { VerifyDescriptionLinksJob } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'
import visitDescriptionLinksWorker from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/worker'
import { VerifyNationalDataPointLinksJob } from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/props'
import visitNationalDataPointLinksWorker from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/worker'

export const verifyLinksWorkerProcessor = async (job: VerifyLinksQueueJob): Promise<void> => {
  if (job.name === VerifyLinksJobName.verifyDescriptionLinks) {
    await visitDescriptionLinksWorker(job as VerifyDescriptionLinksJob)
    return
  }

  if (job.name === VerifyLinksJobName.verifyNationalDataPointLinks) {
    await visitNationalDataPointLinksWorker(job as VerifyNationalDataPointLinksJob)
    return
  }

  const { assessment, countryIso, cycle } = (job as VerifyAllLinksJob).data
  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })
  await verifyLinksJob.runFromQueue(job as VerifyAllLinksJob)
}
