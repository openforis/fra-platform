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
]

describe('isEmpty', () => {
  tests.forEach(({ empty, value }) => {
    test(`${JSON.stringify(value)}-${empty}`, () => {
      const result = isEmpty(value)
      expect(result).toEqual(empty)
    })
  })
})
