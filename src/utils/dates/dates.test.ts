import { TFunction } from 'i18next'

import { Dates } from './dates'

const t = ((id: string) => id) as unknown as TFunction

describe('Relative date tests: ', () => {
  test('Returns null if input null', () => {
    const relativeDate = Dates.getRelativeDate(null, t)
    expect(relativeDate).toBeNull()
  })

  test('Returns moment ago if input is pointing to future', () => {
    const currentDate = new Date()
    const futureDate = new Date().setDate(currentDate.getDate() + 1)

    const relativeDate = Dates.getRelativeDate(futureDate, t)

    expect(relativeDate).toEqual('time.aMomentAgo')
  })
})
