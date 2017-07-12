import R from 'ramda'

export const validateDataPoint = odp => {
  const defaultTo0 = R.defaultTo(0)

  const validYear = R.pipe(
    defaultTo0,
    R.partialRight(R.gt, [0])
  )(odp.year)

  const validateNationalClassPercentage = cls => R.pipe(
    c => R.sum([defaultTo0(c.forestPercent), defaultTo0(c.otherWoodedLandPercent), defaultTo0(c.otherLandPercent)]),
    R.equals(100)
  )(cls)

  const nationalClasses = R.map(
    c => R.pipe(
      R.assoc('uuid', c.uuid),
      R.assoc('validClassName', R.not(R.isEmpty(c.className))),
      v => R.assoc('validArea', c.placeHolder || !v.validClassName ? true : !isNaN(parseFloat(c.area)), v),
      v => R.assoc('validPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateNationalClassPercentage(c), v),
      v => R.assoc('valid', v.validClassName && v.validArea && v.validPercentage, v)
    )({})
    , odp.nationalClasses.length === 1 ? odp.nationalClasses : R.filter(c => !c.placeHolder, odp.nationalClasses))

  return {
    year: {valid: validYear},
    nationalClasses,
    valid: !validYear || R.filter(c => !c.valid, nationalClasses).length !== 0 ? false : true
  }
}
