import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/assessment/section'
import { ContactField } from 'meta/cycleData/contact/field'

import { ContactController } from 'server/controller/cycleData/contact'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { activityLogContact } = testContext
    const nodeExt = activityLogContact[ContactField.name]
    const raw = 'Updated name'

    await ContactController.update({ assessment, countryIso: country.countryIso, cycle, nodeExt, raw, user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.contactUpdate,
      section: SectionNames.contacts,
      target: { ...nodeExt, value: { ...nodeExt.value, raw } },
    })
  })
}
