import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { getLastActivityLog } from 'test/integration/activityLog/getLastActivityLog'

type ExpectLastActivityLogProps<Target> = {
  assessment: Assessment
  country?: Country
  cycle?: Cycle
  message: ActivityLogMessage
  section: string
  target: NoInfer<Target> // NoInfer: No partials allowed - this is the core of the activity log test
  user: User
}

const expectLastActivityLog = async <Target extends object = never>(
  props: ExpectLastActivityLogProps<Target>
): Promise<void> => {
  const { assessment, country, cycle, message, section, target, user } = props
  const countryIso = country?.countryIso ?? null

  const activityLog = await getLastActivityLog<Target>({ assessment, countryIso, cycle, message })

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
