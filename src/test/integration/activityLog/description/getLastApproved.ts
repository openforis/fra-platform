import { CountryStatus } from 'meta/area/countryStatus'

import { AreaController } from 'server/controller/area'
import { DescriptionController } from 'server/controller/cycleData/description'

import { descriptionParams } from 'test/integration/mock/description'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect last approved description to be read from activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const { name, sectionName, value } = descriptionParams

    const accepted = { ...country, props: { ...country.props, status: CountryStatus.accepted } }
    await AreaController.updateCountry({ assessment, country: accepted, cycle, user })

    const lastApproved = await DescriptionController.getLastApproved({ assessment, countryIso, cycle, sectionName })

    await AreaController.updateCountry({ assessment, country, cycle, user })

    expect(lastApproved[countryIso][sectionName][name]).toEqual(value)
  })
}
