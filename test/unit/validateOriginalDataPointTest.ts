import { assert } from 'chai'
import { validateDataPoint } from '../../common/validateOriginalDataPoint'

describe('validateOriginalDataPoint', () => {
  it('validate odp', () => {
    const odp: any = {
      odpId: '109',
      year: '1991',
      description: null,
      nationalClasses: [
        {
          className: 'forest',
          definition: '',
          area: 45,
          forestPercent: '100',
          otherWoodedLandPercent: null,
          otherLandPercent: null,
          naturalForestPercent: '80',
          plantationPercent: '20',
          otherPlantedPercent: null,
          uuid: '0d1e9964-d1be-4daf-826a-6a39e8eb5d5e',
        },
        {
          className: 'owl',
          definition: '',
          area: 45,
          forestPercent: '80',
          otherWoodedLandPercent: '20',
          otherLandPercent: null,
          naturalForestPercent: '70',
          plantationPercent: '30',
          otherPlantedPercent: null,
          uuid: '024791ec-be91-41ca-b862-fe45bb9c5772',
        },
      ],
    }
    const validation = validateDataPoint(odp)

    assert.equal(true, validation.valid)
  })

  it('validate year', () => {
    const odp: any = {
      odpId: '109',
      year: null,
      description: null,
      nationalClasses: [
        {
          className: 'forest',
          definition: '',
          area: 45,
          forestPercent: '100',
          otherWoodedLandPercent: null,
          otherLandPercent: null,
          uuid: '0d1e9964-d1be-4daf-826a-6a39e8eb5d5e',
        },
        {
          className: 'owl',
          definition: '',
          area: 45,
          forestPercent: '80',
          otherWoodedLandPercent: '20',
          otherLandPercent: null,
          uuid: '024791ec-be91-41ca-b862-fe45bb9c5772',
        },
      ],
    }
    const validation: any = validateDataPoint(odp)

    assert.equal(false, validation.year.valid)
    assert.equal(false, validation.valid)
  })

  it('validate no classes', () => {
    const odp: any = {
      odpId: '109',
      year: 1992,
      description: null,
      nationalClasses: [
        {
          className: '',
          definition: '',
          area: null,
          forestPercent: null,
          otherWoodedLandPercent: null,
          otherLandPercent: null,
          uuid: '38766840-3e91-4930-933e-918101f90fe9',
          placeHolder: true,
        },
      ],
    }
    const validation = validateDataPoint(odp)

    assert.equal(false, validation.nationalClasses[0].validClassName)
    assert.equal(false, validation.nationalClasses[0].valid)
    assert.equal(false, validation.valid)
  })

  it('validate percent', () => {
    const odp: any = {
      odpId: '109',
      year: 1990,
      description: null,
      nationalClasses: [
        {
          className: 'forest',
          definition: '',
          area: 45,
          forestPercent: '100',
          otherWoodedLandPercent: '10',
          otherLandPercent: null,
          uuid: '0d1e9964-d1be-4daf-826a-6a39e8eb5d5e',
        },
        {
          className: 'owl',
          definition: '',
          area: 45,
          forestPercent: '80',
          otherWoodedLandPercent: '20',
          otherLandPercent: null,
          uuid: '024791ec-be91-41ca-b862-fe45bb9c5772',
        },
      ],
    }
    const validation = validateDataPoint(odp)

    assert.equal(false, validation.nationalClasses[0].validEofPercentage)
    assert.equal(false, validation.nationalClasses[0].valid)
    assert.equal(false, validation.valid)
  })

  it('validate area', () => {
    const odp: any = {
      odpId: '109',
      year: 1990,
      description: null,
      nationalClasses: [
        {
          className: 'forest',
          definition: '',
          area: null,
          forestPercent: '100',
          otherWoodedLandPercent: '10',
          otherLandPercent: null,
          uuid: '0d1e9964-d1be-4daf-826a-6a39e8eb5d5e',
        },
        {
          className: 'owl',
          definition: '',
          area: 45,
          forestPercent: '80',
          otherWoodedLandPercent: '20',
          otherLandPercent: null,
          uuid: '024791ec-be91-41ca-b862-fe45bb9c5772',
        },
      ],
    }
    const validation = validateDataPoint(odp)

    assert.equal(false, validation.nationalClasses[0].validArea)
    assert.equal(false, validation.nationalClasses[0].valid)
    assert.equal(false, validation.valid)
  })
})
