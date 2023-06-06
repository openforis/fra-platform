import { CountryIso } from 'meta/area'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'

import handlePaste from './handlePaste'

const pick = (o: Record<string, string>, props: Array<string>) =>
  Object.assign({}, ...props.map((prop) => ({ [prop]: o[prop] })))

const countryIso = 'ATL' as CountryIso

const emptyOdp = { id: 1, countryIso, nationalClasses: [{ placeHolder: true }] } as OriginalDataPoint

const odpWithExistingClasses = {
  id: 1,
  countryIso,
  nationalClasses: [
    { name: 'Hardwood plantations', definition: 'Forest occurring below ...' },
    { name: 'Coconut plantations', definition: 'Areas under coconut ...' },
    { name: '', placeHolder: true },
  ],
} as OriginalDataPoint

const ncColumns = [
  { name: 'name', type: 'text' },
  { name: 'definition', type: 'text' },
]

const pasteDataForClasses = [
  ['Closed forest', 'Closed def'],
  ['Open forest', 'Open def'],
]

const digOnlyCertainFieldsOutOfOdp = (rowCount: number, odp: OriginalDataPoint, fields: Array<string>) =>
  odp.nationalClasses.slice(0, rowCount).map((nc: ODPNationalClass) => pick(nc as Record<string, string>, fields))

const digOnlyClassDataOutOfOdp = (rowCount: number, odp: OriginalDataPoint) =>
  digOnlyCertainFieldsOutOfOdp(rowCount, odp, ['name', 'definition'])

describe('OriginalDataPoint paste test:', () => {
  it('Pastes national classes and definitions', () => {
    const expected = [
      { name: 'Closed forest', definition: 'Closed def' },
      { name: 'Open forest', definition: 'Open def' },
    ]
    const pasteResult = handlePaste(ncColumns, () => true, emptyOdp, true, pasteDataForClasses, 0, 0)
    const nationalClassInfo = digOnlyClassDataOutOfOdp(2, pasteResult.updatedOdp)
    expect(nationalClassInfo).toEqual(expected)
  })

  it('Pastes to second row and column (nc definitions)', () => {
    const result = handlePaste(
      ncColumns,
      () => true,
      odpWithExistingClasses,
      true,
      [['Pasted def 1'], ['Pasted def 2']],
      1,
      1
    )
    const expected = [
      { name: 'Hardwood plantations', definition: 'Forest occurring below ...' },
      { name: 'Coconut plantations', definition: 'Pasted def 1' },
      { name: '', definition: 'Pasted def 2' },
    ] as Array<ODPNationalClass>
    expect(digOnlyClassDataOutOfOdp(3, result.updatedOdp)).toEqual(expected)
  })

  it('Skips rows which are not valid for certain table (and are not visible either in the UI', () => {
    const otherLandCharacteristicsCols = [
      { name: 'otherLandPalmsPercent', type: 'integer' },
      { name: 'otherLandTreeOrchardsPercent', type: 'integer' },
      { name: 'otherLandAgroforestryPercent', type: 'integer' },
      { name: 'otherLandTreesUrbanSettingsPercent', type: 'integer' },
    ]
    const originalOdp = {
      id: 1,
      countryIso,
      nationalClasses: [
        { name: 'Closed forest' },
        { name: 'Open forest', otherPlantedForestPercent: '10' },
        { name: 'Hardwood plantations' },
        { name: 'Coconut plantations', otherPlantedForestPercent: '25' },
        { name: '', placeHolder: true },
      ],
    } as OriginalDataPoint
    const expected = [
      { name: 'Closed forest' },
      {
        name: 'Open forest',
        otherPlantedForestPercent: '10',
        otherLandPalmsPercent: '10',
        otherLandTreeOrchardsPercent: '20',
      },
      { name: 'Hardwood plantations' },
      {
        name: 'Coconut plantations',
        otherPlantedForestPercent: '25',
        otherLandPalmsPercent: '30',
        otherLandTreeOrchardsPercent: '40',
      },
    ] as Array<ODPNationalClass>
    const result = handlePaste(
      otherLandCharacteristicsCols,
      (nc: ODPNationalClass) => Number(nc.otherPlantedForestPercent) > 0,
      originalOdp,
      false,
      [
        ['10', '20'],
        ['30', '40'],
      ],
      1, // Note: this is the index of the visible row in UI (first which matches otherLandPercent > 0)
      0
    )
    expect(
      digOnlyCertainFieldsOutOfOdp(4, result.updatedOdp, [
        'name',
        'otherPlantedForestPercent',
        'otherLandPalmsPercent',
        'otherLandTreeOrchardsPercent',
      ])
    ).toEqual(expected)
  })
})
