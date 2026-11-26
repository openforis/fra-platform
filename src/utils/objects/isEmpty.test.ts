import { isEmpty } from 'utils/objects/isEmpty'

const tests: Array<{ empty: boolean; value: any }> = [
  { empty: true, value: undefined },
  { empty: true, value: null },
  { empty: true, value: '' },
  { empty: true, value: '  ' },
  { empty: false, value: '  fdsafd a' },
  { empty: false, value: 'fdsafd ' },
  { empty: false, value: 'fdsafd' },
  { empty: false, value: { a: '' } },
  { empty: false, value: { a: '', b: '' } },
  { empty: false, value: { a: undefined } },
  { empty: true, value: {} },
  { empty: false, value: [1] },
  { empty: false, value: [1, 2, 3] },
  { empty: true, value: [] },
  { empty: false, value: [undefined] },
  { empty: false, value: [null] },
  { empty: false, value: [undefined, null] },
  { empty: false, value: new Date('2023-08-17 09:44:56.06838+00') },
  { empty: true, value: new Date('x') },
  { empty: true, value: new Set() },
  { empty: false, value: new Set([1]) },
  { empty: true, value: new Map() },
  { empty: false, value: new Map([['a', 1]]) },
]

describe('isEmpty', () => {
  tests.forEach(({ empty, value }) => {
    test(`${JSON.stringify(value)}-${empty}`, () => {
      const result = isEmpty(value)
      expect(result).toEqual(empty)
    })
  })
})
