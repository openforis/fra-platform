import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinksVerificationEvent } from 'meta/socket/event/links'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { emitLinksVerificationEvent } from 'server/worker/tasks/verifyLinks/utils/emitLinksVerificationEvent'
import { insertLinksCheckActivityLog } from 'server/worker/tasks/verifyLinks/utils/insertLinksCheckActivityLog'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'
import { verifyAllLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/verifyAllLinks'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  user: User
}

const _getLogKey = (props: Props): string => {
  const { assessment, countryIso, cycle } = props
  const base = `${assessment.props.name}-${cycle.name}`
  const scope = Objects.isEmpty(countryIso) ? base : `${base}-${countryIso}`
  return `[verifyAllLinks-inProcess] [${scope}]`
}

export const verifyLinks = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, user } = props
  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })

  await verifyLinksJob.setRunning()

  try {
    emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.active })
    await insertLinksCheckActivityLog({ assessment, countryIso, cycle, status: 'started', user }, client)

    const logKey = _getLogKey(props)
    await verifyAllLinks({ assessment, countryIso, cycle, logKey }, client)
  } catch (error) {
    await verifyLinksJob.setFailed(error)
    emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.failed })
    await insertLinksCheckActivityLog({ assessment, countryIso, cycle, error, status: 'failed', user }, client)
    throw error
  }

  await verifyLinksJob.setSuccess()
  emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.completed })
  await insertLinksCheckActivityLog({ assessment, countryIso, cycle, status: 'completed', user }, client)
}
