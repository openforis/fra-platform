import * as RelativeDate from './dates'

const i18nMock = {
  t: (id: any) => {
    return id
  },
}

describe('Relative date tests: ', () => {
  test('Returns null if input null', () => {
    const relativeDate = RelativeDate.getRelativeDate(null, {})
    expect(relativeDate).toBeNull()
  })

  test('Returns moment ago if input is pointing to future', () => {
    const currentDate = new Date()
    const futureDate = new Date().setDate(currentDate.getDate() + 1)

    const relativeDate = RelativeDate.getRelativeDate(futureDate, i18nMock)

    expect(relativeDate).toEqual('time.aMomentAgo')
  })
})
