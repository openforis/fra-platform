import { Promises } from './promises'

describe('Promises test:', () => {
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
