import { describe, expect, test } from 'vitest'

import { Promises } from './promises'

describe('Promises.pool', () => {
  test('should map every item and keep the input order', async () => {
    const items = [1, 2, 3, 4, 5]

    const results = await Promises.pool<number, number>(items, async (item) => item * 2, 2)

    expect(results).toEqual([2, 4, 6, 8, 10])
  })

  test('should pass the item index to the callback', async () => {
    const items = ['a', 'b', 'c']

    const results = await Promises.pool<string, string>(items, async (item, index) => `${item}${index}`, 2)

    expect(results).toEqual(['a0', 'b1', 'c2'])
  })

  test('should never run more callbacks than the concurrency limit', async () => {
    const items = [1, 2, 3, 4, 5, 6]
    let active = 0
    let maxActive = 0

    await Promises.pool<number, void>(
      items,
      async () => {
        active += 1
        maxActive = Math.max(maxActive, active)
        await new Promise((resolve) => {
          setTimeout(resolve, 0)
        })
        active -= 1
      },
      2
    )

    expect(maxActive).toBe(2)
  })

  test('should handle an empty item list', async () => {
    const results = await Promises.pool<number, number>([], async (item) => item, 5)

    expect(results).toEqual([])
  })

  test('should handle a concurrency larger than the item count', async () => {
    const results = await Promises.pool<number, number>([1, 2], async (item) => item + 1, 10)

    expect(results).toEqual([2, 3])
  })
})
