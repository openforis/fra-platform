// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validateDa... Remove this comment to see the full error message
const { validateDataPoint } = require('../../common/validateOriginalDataPoint')

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('validateOriginalDataPoint', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('validate odp', () => {
    const odp = {
      odpId: '109',
      year: '1991',
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'description' implicitly... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLandPercent' impli... Remove this comment to see the full error message
          otherLandPercent: null,
          naturalForestPercent: '70',
          plantationPercent: '30',
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherPlantedPercent' im... Remove this comment to see the full error message
          otherPlantedPercent: null,
          uuid: '024791ec-be91-41ca-b862-fe45bb9c5772',
        },
      ],
    }
    const validation = validateDataPoint(odp)

    assert.equal(true, validation.valid)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('validate year', () => {
    const odp = {
      odpId: '109',
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'year' implicitly has an... Remove this comment to see the full error message
      year: null,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'description' implicitly... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLandPercent' impli... Remove this comment to see the full error message
          otherLandPercent: null,
          uuid: '024791ec-be91-41ca-b862-fe45bb9c5772',
        },
      ],
    }
    const validation = validateDataPoint(odp)

    assert.equal(false, validation.year.valid)
    assert.equal(false, validation.valid)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('validate no classes', () => {
    const odp = {
      odpId: '109',
      year: 1992,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'description' implicitly... Remove this comment to see the full error message
      description: null,
      nationalClasses: [
        {
          className: '',
          definition: '',
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'area' implicitly has an... Remove this comment to see the full error message
          area: null,
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'forestPercent' implicit... Remove this comment to see the full error message
          forestPercent: null,
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherWoodedLandPercent'... Remove this comment to see the full error message
          otherWoodedLandPercent: null,
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLandPercent' impli... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('validate percent', () => {
    const odp = {
      odpId: '109',
      year: 1990,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'description' implicitly... Remove this comment to see the full error message
      description: null,
      nationalClasses: [
        {
          className: 'forest',
          definition: '',
          area: 45,
          forestPercent: '100',
          otherWoodedLandPercent: '10',
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLandPercent' impli... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('validate area', () => {
    const odp = {
      odpId: '109',
      year: 1990,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'description' implicitly... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLandPercent' impli... Remove this comment to see the full error message
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
