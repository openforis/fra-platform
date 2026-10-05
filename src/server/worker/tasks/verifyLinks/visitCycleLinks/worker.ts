import { Objects } from 'utils/objects'

import { VerifyAllLinksJob } from './props'
import { verifyAllLinks } from './verifyAllLinks'

const _getLogKey = (job: VerifyAllLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const scope = Objects.isEmpty(countryIso)
    ? `${assessmentName}-${cycleName}`
    : `${assessmentName}-${cycleName}-${countryIso}`
  return `[visitCycleLinks-workerThread] [${scope}] [job-${job.id}]`
}

export default async (job: VerifyAllLinksJob): Promise<void> => {
  const { assessment, countryIso, cycle } = job.data
  const logKey = _getLogKey(job)

  return verifyAllLinks({ assessment, countryIso, cycle, logKey })
}
