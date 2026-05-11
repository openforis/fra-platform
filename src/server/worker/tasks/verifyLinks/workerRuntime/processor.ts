import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
// import { VisitDescriptionLinksJob } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'
// import visitDescriptionLinksWorker from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/worker'
import { VerifyLinksQueueJob } from 'server/worker/tasks/verifyLinks/props'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'
import { VisitCycleLinksJob } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'

export const verifyLinksWorkerProcessor = async (job: VerifyLinksQueueJob): Promise<void> => {
  if (job.name === VerifyLinksJobName.verifyDescriptionLinks) {
    // TODO: await visitDescriptionLinksWorker(job as VisitDescriptionLinksJob)
    return
  }

  const { assessment, countryIso, cycle } = (job as VisitCycleLinksJob).data
  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })
  await verifyLinksJob.runFromQueue(job as VisitCycleLinksJob)
}
