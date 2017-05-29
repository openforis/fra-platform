const eofRepository = require('./fraRepository')
const odpRepository = require('./odpRepository')
const R = require('ramda')

const linearInterpolation = (x, xa, ya, xb, yb) => ya + ( yb - ya) * (x - xa) / (xb - xa)

const linearExtrapolation = (x, xa, ya, xb, yb) => ya + (x - xa) / (xb - xa) * (yb - ya)

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) => yb + (xb - x) / (xb - xa) * (ya - yb)

const fraFields = ['forestArea', 'otherWoodenLand', 'otherLand']

const estimate = (countryIso, year, pointA, pointB, estFunction) => {
  const estimateField = (field) => {
    let estimated = estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field])
    return estimated < 0 ? 0 : Number(estimated.toFixed(3))
  }
  const newFraValues = R.reduce(
    (newFraObj, field) => R.assoc([field], estimateField(field), newFraObj),
    {},
    fraFields)
  return R.assoc('year', year, newFraValues)
}

const extrapolate = (countryIso, year, values) => {
  const previous2Values = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values).slice(0, 2)
  if (previous2Values.length === 2) {
    return estimate(countryIso, year, previous2Values[1], previous2Values[0], linearExtrapolation)
  } else {
    const next2Values = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values).slice(0, 2)
    if (next2Values.length === 2)
      return estimate(countryIso, year, next2Values[0], next2Values[1], linearExtrapolationBackwards)
    else return null
  }
}

const estimateFraValue = (countryIso, year, values) => {
  const odp = R.find(R.propEq('year', year))(values)
  if (odp) {
    return null
//    return eofRepository.persistFraValues(countryIso, year, odp, true).then(() => null)
  } else {
    const previousValue = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values)[0]
    const nextValue = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values)[0]
    if (previousValue && nextValue) {
      return estimate(countryIso, year, previousValue, nextValue, linearInterpolation)
    } else {
      return extrapolate(countryIso, year, values)
    }
  }
}

// Pure function, no side-effects
const estimateFraValues = (countryIso, years, odpValues) => {
  console.log("years", years)
  let idx = 0
  const estimate = (countryIso, year, values) => {
    console.log("estimating for year", year)
    const newValue = estimateFraValue(countryIso, year, values)
    if (idx === years.length) { console.log("€€€ returning values", values); return values }
    else {
      const newValues = newValue ? [...values, newValue] : values
      return estimate(countryIso, years[++idx], newValues)
    }
  }
  return estimate(countryIso, years[0], odpValues)
}

module.exports.estimateAndPersistFraValues = (countryIso, years) => {
  return odpRepository
    .readOriginalDataPoints(countryIso)
    .then(values => {
      const estimated = estimateFraValues(countryIso, years, R.values(values))
      console.log("@@ estimated in then", estimated)
      return Promise.all(R.map(estimatedValues =>
          console.log("storing", estimatedValues) || eofRepository.persistFraValues(countryIso, estimatedValues.year, estimatedValues, true),
        estimated))
    })
}
