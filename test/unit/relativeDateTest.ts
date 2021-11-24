import { assert } from 'chai'
import * as RelativeDate from '../../_legacy_webapp/utils/relativeDate'

describe('Relative date', () => {
  const i18nMock = {
    t: (id: any) => {
      return id
    },
  }

  it('Returns null if input null', () => {
    const relativeDate = RelativeDate.getRelativeDate(null, {})
    assert.equal(relativeDate, null)
  })

  it('Returns moment ago if input is pointing to future', () => {
    const currentDate = new Date()
    const futureDate = new Date().setDate(currentDate.getDate() + 1)

    const relativeDate = RelativeDate.getRelativeDate(futureDate, i18nMock)

    assert.equal('time.aMomentAgo', relativeDate)
  })
})
