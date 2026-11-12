import { Country } from 'meta/area/country'
import { ActivityLogTargets } from 'meta/assessment/activityLog/target'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { getLastActivityLog } from 'test/integration/activityLog/getLastActivityLog'

// Only mapped messages: don't allow messages outside message map
type TestedMessage = keyof ActivityLogTargets

type ExpectLastActivityLogProps<Message extends TestedMessage> = {
  assessment: Assessment
  country?: Country
  cycle?: Cycle
  message: Message
  section: string
  target: ActivityLogTargets[Message] // No partials allowed - this is the core of the activity log test
  user: User
}

const expectLastActivityLog = async <Message extends TestedMessage>(
  props: ExpectLastActivityLogProps<Message>
): Promise<void> => {
  const { assessment, country, cycle, message, section, target, user } = props
  const countryIso = country?.countryIso ?? null

  const activityLog = await getLastActivityLog<ActivityLogTargets[Message]>({ assessment, countryIso, cycle, message })

  expect(activityLog).toMatchObject({
    assessmentUuid: assessment.uuid,
    countryIso,
    cycleUuid: cycle?.uuid ?? null,
    message,
    section,
    userId: user.id,
  })
  expect(activityLog.target).not.toBeNull()
  expect(activityLog.target).toMatchObject(JSON.parse(JSON.stringify(target)))
}

export const ActivityLogAssertions = {
  expectLastActivityLog,
}
