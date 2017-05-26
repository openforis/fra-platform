const eofRepository = require('./fraRepository')
const odpRepository = require('./odpRepository')
const R = require('ramda')

const linearInterpolation = (x, xa, ya, xb, yb) => {
  const y = ya + ( yb - ya) * (x - xa) / (xb - xa)
  return y
}

const linearExtrapolation = (x, xa, ya, xb, yb) => {
  const y = ya + (x - xa) / (xb - xa) * (yb - ya)
  return y
}

const interpolate = (countryIso, year, pointA, pointB) =>
  new Promise((resolve) => {
    let newValue = linearInterpolation(year, pointA.year, pointA.forestArea, pointB.year, pointB.forestArea)
    newValue = newValue < 0 ? 0 : Number(newValue.toFixed(3))
    eofRepository
      .persistFraForestArea(countryIso, year, newValue, true)
      .then(() => resolve(newValue))
  })

const extrapolate = (countryIso, year, pointA, pointB) =>
  new Promise((resolve) => {
    let newValue = linearExtrapolation(year, pointA.year, pointA.forestArea, pointB.year, pointB.forestArea)
    newValue = newValue < 0 ? 0 : Number(newValue.toFixed(3))
    eofRepository
      .persistFraForestArea(countryIso, year, newValue, true)
      .then(() => resolve(newValue))
  })

const estimateFraValue = (countryIso, year, values) => {
  return new Promise((resolve, reject) => {

    const odp = R.find(R.propEq('year', year))(values)
    if (odp) {
      eofRepository.persistFraForestArea(countryIso, year, odp.forestArea, true).then(() => resolve(odp.forestArea))
    } else {
      const previousValue = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values)[0]
      const nextValue = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values)[0]

      if (previousValue && nextValue) {
        interpolate(countryIso, year, previousValue, nextValue).then(res => {
          values.push({year: year, forestArea: res})
          resolve(res)
        })
      } else {
        const previous2Values = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values).slice(0, 2)

        if (previous2Values.length === 2)
          extrapolate(countryIso, year, previous2Values[1], previous2Values[0]).then(res => {
            values.push({year: year, forestArea: res})
            resolve(res)
          })
        else
          resolve(null)

      }
    }

  })
}

module.exports.estimateFraValues = (countryIso, years) => {
  return new Promise((resolve, reject) => {
    let idx = 0

    const estimate = (countryIso, year, values) =>
      estimateFraValue(countryIso, year, values).then((res) => {
        if (idx === years.length - 1)
          resolve()
        else
          estimate(countryIso, years[++idx], values)
      })

    odpRepository
      .readOriginalDataPoints(countryIso)
      .then(values => estimate(countryIso, years[0], R.values(values)))
  })
}
