const assert = require('chai').assert
const RelativeDate = require('../../webapp/utils/relativeDate');

describe('Relative date', () => {

  const i18nMock = {
    t: id => {
      return id
    }
  }

  it('Returns null if input null', () => {
    const relativeDate = RelativeDate.getRelativeDate(null, {})
    assert.equal(relativeDate, null)
  })

  it('Returns moment ago if input is pointing to future', () => {
    const currentDate = new Date()
    const futureDate = (new Date()).setDate(currentDate.getDate() + 1)

    const relativeDate = RelativeDate.getRelativeDate(futureDate, i18nMock)

    assert.equal('time.aMomentAgo', relativeDate)
  })
})
