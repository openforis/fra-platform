import { i18n } from 'i18next'

import { Dates } from './dates'

const i18nMock: Pick<i18n, 't'> = {
  t: (id) => {
    return id
  },
}

describe('Relative date tests: ', () => {
  test('Returns null if input null', () => {
    const relativeDate = Dates.getRelativeDate(null, i18nMock)
    expect(relativeDate).toBeNull()
  })

  test('Returns moment ago if input is pointing to future', () => {
    const currentDate = new Date()
    const futureDate = new Date().setDate(currentDate.getDate() + 1)

    const relativeDate = Dates.getRelativeDate(futureDate, i18nMock)

    expect(relativeDate).toEqual('time.aMomentAgo')
  })
})
