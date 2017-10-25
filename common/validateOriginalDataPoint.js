const R = require('ramda')

module.exports.validateDataPoint = odp => {
  const defaultTo0 = R.defaultTo(0)

  const validYear = R.pipe(
    defaultTo0,
    R.partialRight(R.gt, [0])
  )(odp.year)

  const validateEofPercentage = cls => R.pipe(
    c => R.sum([defaultTo0(c.forestPercent), defaultTo0(c.otherWoodedLandPercent), defaultTo0(c.otherLandPercent)]),
    R.equals(100)
  )(cls)

  const validateFocPercentage = cls =>
    cls.forestPercent <= 0 ? true : R.pipe(
      c => R.sum([defaultTo0(c.naturalForestPercent), defaultTo0(c.plantationPercent), defaultTo0(c.otherPlantedPercent)]),
      R.equals(100)
    )(cls)

  const validateOtherLandPercentage = cls =>
    cls.otherLandPercent <= 0 ? true : R.pipe(
      c => R.sum([defaultTo0(c.otherLandPalmsPercent), defaultTo0(c.otherLandTreeOrchardsPercent), defaultTo0(c.otherLandAgroforestryPercent), defaultTo0(c.otherLandTreesUrbanSettingsPercent)]) <= 100
    )(cls)

  const validatePlantationIntroducedPercentage = cls =>
    cls.plantationIntroducedPercent <= 0 ? true : R.pipe(
      c => R.sum([defaultTo0(c.plantationIntroducedPercent)]) <= 100
    )(cls)

  const nationalClasses = R.map(
    c => R.pipe(
      R.assoc('uuid', c.uuid),
      R.assoc('validClassName', R.not(R.isEmpty(c.className))),
      v => R.assoc('validArea', c.placeHolder || !v.validClassName ? true : !isNaN(parseFloat(c.area)), v),
      v => R.assoc('validEofPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateEofPercentage(c), v),
      v => R.assoc('validFocPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateFocPercentage(c), v),
      v => R.assoc('validOtherLandPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateOtherLandPercentage(c), v),
      v => R.assoc('validPlantationIntroducedPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validatePlantationIntroducedPercentage(c), v),
      v => R.assoc('valid', v.validClassName && v.validArea && v.validEofPercentage && v.validFocPercentage && v.validOtherLandPercentage && v.validPlantationIntroducedPercentage, v)
    )({})
    , odp.nationalClasses.length === 1 ? odp.nationalClasses : R.filter(c => !c.placeHolder, odp.nationalClasses))

  return {
    year: {valid: validYear},
    nationalClasses,
    valid: !validYear || R.filter(c => !c.valid, nationalClasses).length !== 0 ? false : true
  }
}
