const R = require('ramda')
const { sum, lessThanOrEqualTo } = require('./bignumberUtils')

module.exports.validateDataPoint = odp => {
  const defaultTo0 = R.defaultTo(0)

  const validYear = R.pipe(
    defaultTo0,
    R.partialRight(R.gt, [0])
  )(odp.year)

  const validateEofPercentage = cls => {
    const percentSum = sum([defaultTo0(cls.forestPercent), defaultTo0(cls.otherWoodedLandPercent)])
    return lessThanOrEqualTo(percentSum, 100)
  }

  const validateFocPercentage = cls =>
    cls.forestPercent <= 0 ? true : R.pipe(
      c => R.sum([defaultTo0(c.naturalForestPercent), defaultTo0(c.plantationPercent), defaultTo0(c.otherPlantedPercent)]) <= 100
    )(cls)

  const validatePlantationIntroducedPercentage = cls =>
    cls.plantationIntroducedPercent <= 0 ? true : R.pipe(
      c => R.sum([defaultTo0(c.plantationIntroducedPercent)]) <= 100
    )(cls)

  const validateClassName = c =>
    !(R.isEmpty(c.className) || R.length(c.className) > 1024)

  const nationalClasses = R.map(
    c => R.pipe(
      R.assoc('uuid', c.uuid),
      R.assoc('validClassName', validateClassName(c)),
      v => R.assoc('validArea', c.placeHolder || !v.validClassName ? true : !isNaN(parseFloat(c.area)), v),
      v => R.assoc('validEofPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateEofPercentage(c), v),
      v => R.assoc('validFocPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateFocPercentage(c), v),
      v => R.assoc('validPlantationIntroducedPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validatePlantationIntroducedPercentage(c), v),
      v => R.assoc('valid', v.validClassName && v.validArea && v.validEofPercentage && v.validFocPercentage && v.validPlantationIntroducedPercentage, v)
    )({})
    , odp.nationalClasses.length === 1 ? odp.nationalClasses : R.filter(c => !c.placeHolder, odp.nationalClasses))

  return {
    year: {valid: validYear},
    nationalClasses,
    valid: !validYear || R.filter(c => !c.valid, nationalClasses).length !== 0 ? false : true
  }
}
