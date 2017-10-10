const R = require('ramda')
const {add, mul, div, sub, toFixed} = require('../../common/bignumberUtils')

const linearInterpolation = (x, xa, ya, xb, yb) => toFixed(
  add(ya,
    div(
      mul(
        sub(yb, ya),
        sub(x, xa)
      ),
      sub(xb, xa)
    )
  )
)

const linearExtrapolation = (x, xa, ya, xb, yb) => toFixed(
  add(ya,
    mul(
      div(
        sub(x, xa),
        sub(xb, xa)
      ),
      sub(yb, ya)
    )
  )
)

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) => toFixed(
  add(yb,
    mul(
      div(
        sub(xb, x),
        sub(xb, xa)
      ),
      sub(ya, yb)
    )
  )
)

const eofFields = ['forestArea', 'otherWoodedLand', 'otherLand', 'otherLandPalms', 'otherLandTreeOrchards', 'otherLandAgroforestry', 'otherLandTreesUrbanSettings']
const focFields = ['naturalForestArea', 'naturalForestPrimaryArea', 'plantationForestArea', 'plantationForestIntroducedArea', 'otherPlantedForestArea']

const estimate = (year, pointA, pointB, fieldsToEstimate, estFunction) => {
  const estimateField = (field) => {
    let estimated = estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field])
    return estimated < 0 ? 0 : Number(estimated)
  }
  const newFraValues = R.reduce(
    (newFraObj, field) => R.assoc([field], estimateField(field), newFraObj),
    {},
    fieldsToEstimate)
  return R.pipe(
    R.assoc('year', year),
    R.assoc('store', true))
  (newFraValues)
}

const extrapolate = (year, values, fieldsToExtrapolate) => {
  const previous2Values = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values).slice(0, 2)
  if (previous2Values.length === 2) {
    return estimate(year, previous2Values[1], previous2Values[0], fieldsToExtrapolate, linearExtrapolation)
  } else {
    const next2Values = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values).slice(0, 2)
    if (next2Values.length === 2)
      return estimate(year, next2Values[0], next2Values[1], fieldsToExtrapolate, linearExtrapolationBackwards)
    else return null
  }
}

const estimateFraValue = (year, values, fieldsToEstimate) => {
  const odp = R.find(R.propEq('year', year))(values)
  if (odp) {
    return R.assoc('store', true, odp)
  } else {
    // Filter out duplicate values generated because FRA year and ODP year both exist:
    const valuesWithoutOdpFraDuplicates = R.reject(val => val.store && val.type === 'odp', values)
    const previousValue = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(valuesWithoutOdpFraDuplicates)[0]
    const nextValue = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(valuesWithoutOdpFraDuplicates)[0]
    if (previousValue && nextValue) {
      return estimate(year, previousValue, nextValue, fieldsToEstimate, linearInterpolation)
    } else {
      return extrapolate(year, valuesWithoutOdpFraDuplicates, fieldsToEstimate)
    }
  }
}

// Pure function, no side-effects
const estimateFraValues = (years, odpValues, fieldstoEstimate) => {
  const pickFieldsAndRoundEstimates = (estimatedValues) =>
    R.pipe(
      R.pick([...fieldstoEstimate, 'year']),
      R.toPairs,
      R.map(([name, value]) => R.contains(name, fieldstoEstimate) ? [name, toFixed(value)] : [name, value]),
      R.fromPairs)(estimatedValues)

  const allEstimatedValues =
    R.reduce(
      (values, year) => {
        const newValue = estimateFraValue(year, values, fieldstoEstimate)
        return newValue ? [...values, newValue] : values
      },
      odpValues,
      years)

  const addEstimatedFlags = fieldsToFlag => x => {
    R.forEach(fraField => x = R.assoc(`${fraField}Estimated`, true, x), fieldsToFlag)
    return x
  }

  return R.pipe(
    R.filter(estimatedValues => estimatedValues.store),
    R.map(pickFieldsAndRoundEstimates),
    R.map(addEstimatedFlags(fieldstoEstimate)))(allEstimatedValues)
}

module.exports.eofFields = eofFields
module.exports.focFields = focFields

module.exports.estimateFraValues = estimateFraValues

module.exports.estimateAndWrite = (odpReader, fraWriter, fieldsToEstimate, countryIso, years) => {
  return odpReader(countryIso).then(values => {
    const estimated = estimateFraValues(years, R.values(values), fieldsToEstimate)
    return Promise.all(
      R.map(
        estimatedValues => fraWriter(countryIso, estimatedValues.year, estimatedValues, true),
        estimated))
  })
}
