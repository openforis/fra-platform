import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { ActivityLogRow } from 'test/integration/activityLog/getLastActivityLog'

type ExpectActivityLogProps = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  message: ActivityLogMessage
  section: string
  user: User
}

const expectActivityLog = (activityLog: ActivityLogRow<unknown>, props: ExpectActivityLogProps): void => {
  const { assessment, country, cycle, message, section, user } = props

  expect(activityLog).toMatchObject({
    assessmentUuid: assessment.uuid,
    countryIso: country.countryIso,
    cycleUuid: cycle.uuid,
    message,
    section,
    userId: user.id,
  })
}

const expectTarget = <Target extends object>(target: Target, expected: Target): void => {
  expect(target).not.toBeNull()
  expect(target).toMatchObject(expected)
}

export const ActivityLogAssertions = {
  expectActivityLog,
  expectTarget,
}
