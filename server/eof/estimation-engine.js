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
  return eofRepository
    .persistFraValues(countryIso, year, newFraValues, true)
    .then(() => R.assoc('year', year, newFraValues))
}

const estimateFraValue = (countryIso, year, values) => {
  return new Promise((resolve) => {

    const odp = R.find(R.propEq('year', year))(values)
    if (odp) {
      eofRepository.persistFraValues(countryIso, year, odp, true).then(() => resolve(null))
    } else {
      const previousValue = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values)[0]
      const nextValue = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values)[0]

      if (previousValue && nextValue) {
        estimate(countryIso, year, previousValue, nextValue, linearInterpolation).then(res => {
          resolve(res)
        })
      } else {
        const previous2Values = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values).slice(0, 2)

        if (previous2Values.length === 2) {
          estimate(countryIso, year, previous2Values[1], previous2Values[0], linearExtrapolation).then(res => {
            resolve(res)
          })
        }
        else {
          const next2Values = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values).slice(0, 2)
          if (next2Values.length === 2)
            estimate(countryIso, year, next2Values[0], next2Values[1], linearExtrapolationBackwards).then(res => {
              resolve(res)
            })
          else
            resolve(null)
        }
      }
    }

  })
}

module.exports.estimateFraValues = (countryIso, years) => {
  return new Promise((resolve) => {
    let idx = 0

    const estimate = (countryIso, year, values) =>
      estimateFraValue(countryIso, year, values).then((newValue) => {
        if (idx === years.length - 1)
          resolve()
        else {
          const newValues = newValue ? [...values, newValue] : values
          estimate(countryIso, years[++idx], newValues)
        }
      })

    odpRepository
      .readOriginalDataPoints(countryIso)
      .then(values => estimate(countryIso, years[0], R.values(values)))
  })
}
