import { Promises } from './promises'

describe('Promises.each', () => {
  test('each resolves items in order', async () => {
    const res = await Promises.each([1, 2, 3], async (n) => n * 10)
    expect(res).toEqual([10, 20, 30])
  })

  test('each does not leak results between separate calls', async () => {
    const res1 = await Promises.each([1, 2], async (n) => n * 10)
    const res2 = await Promises.each(['a', 'b'], async (s) => s.toUpperCase())

    expect(res1).toEqual([10, 20])
    expect(res2).toEqual(['A', 'B'])
  })

  test('each awaits every callback before starting the next one', async () => {
    const started: Array<number> = []
    const finished: Array<number> = []

    const delays = [20, 0, 10]
    await Promises.each(delays, async (delay, index) => {
      started.push(index)
      await new Promise((resolve) => {
        setTimeout(resolve, delay)
      })
      finished.push(index)
    })

    expect(started).toEqual([0, 1, 2])
    expect(finished).toEqual([0, 1, 2])
  })
})

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
