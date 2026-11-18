import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/assessment/section'
import { Contacts } from 'meta/cycleData/contacts'

import { ContactController } from 'server/controller/cycleData/contact'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getContactRow } from 'test/integration/activityLog/contact/getContactRow'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const contact = Contacts.newContact({ countryIso, rowIndex: 0 })

    await ContactController.create({ assessment, contact, countryIso, cycle, user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.contactCreate,
      section: SectionNames.contacts,
      target: getContactRow(contact),
    })

    testContext.activityLogContact = contact
  })
}
