// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
const RelativeDate = require('../../webapp/utils/relativeDate')

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Relative date', () => {
  const i18nMock = {
    t: (id: any) => {
      return id
    },
  }

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns null if input null', () => {
    const relativeDate = RelativeDate.getRelativeDate(null, {})
    assert.equal(relativeDate, null)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns moment ago if input is pointing to future', () => {
    const currentDate = new Date()
    const futureDate = new Date().setDate(currentDate.getDate() + 1)

    const relativeDate = RelativeDate.getRelativeDate(futureDate, i18nMock)

    assert.equal('time.aMomentAgo', relativeDate)
  })
})
