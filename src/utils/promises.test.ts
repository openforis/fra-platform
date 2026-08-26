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

  test('each stops early when stopIfFn matches', async () => {
    const stopIfFn = (n: number): n is 3 => n === 3
    const res = await Promises.each([1, 2, 3, 4], async (n) => n, stopIfFn)
    expect(res).toEqual([1, 2])
  })
})
