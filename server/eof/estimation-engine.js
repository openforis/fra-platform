const eofRepository = require('./repository')
const R = require('ramda')

const linearInterpolation = (x, xa, ya, xb, yb) => {
  const y = ya + ( yb - ya) * (x - xa) / (xb - xa)
  return y
}

const linearExtrapolation = (x, xa, ya, xb, yb) => {
  const y = ya + (x - xa) / (xb - xa) * (yb - ya)
  return y
}

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) => {
  const y = yb + (xb - x) / (xb - xa) * (ya - yb)
  return y
}

const estimate = (countryIso, year, pointA, pointB, estFunction) =>
  new Promise((resolve) => {
    let newValue = R.call(estFunction, year, pointA.year, pointA.forest_area, pointB.year, pointB.forest_area)
    newValue = newValue < 0 ? 0 : Number(newValue.toFixed(3))
    eofRepository
      .persistFraForestArea(countryIso, year, newValue, true)
      .then(() => resolve(newValue))
  })

const estimateFraValue = (countryIso, year, values) => {
  return new Promise((resolve, reject) => {

    const odp = R.find(R.propEq('year', year))(values)
    if (odp) {
      eofRepository.persistFraForestArea(countryIso, year, odp.forest_area, true).then(() => resolve(odp.forest_area))
    } else {
      const previousValue = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values)[0]
      const nextValue = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values)[0]

      if (previousValue && nextValue) {
        estimate(countryIso, year, previousValue, nextValue, linearInterpolation).then(res => {
          values.push({year: year, forest_area: res})
          resolve(res)
        })
      } else {
        const previous2Values = R.pipe(R.filter(v => v.year < year), R.sort((a, b) => b.year - a.year))(values).slice(0, 2)

        if (previous2Values.length === 2)
          estimate(countryIso, year, previous2Values[1], previous2Values[0], linearExtrapolation).then(res => {
            values.push({year: year, forest_area: res})
            resolve(res)
          })
        else {
          const next2Values = R.pipe(R.filter(v => v.year > year), R.sort((a, b) => a.year - b.year))(values).slice(0, 2)

          if (next2Values.length === 2)
            estimate(countryIso, year, next2Values[0], next2Values[1], linearExtrapolationBackwards).then(res => {
              values.push({year: year, forest_area: res})
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
  return new Promise((resolve, reject) => {
    let idx = 0

    const estimate = (countryIso, year, values) =>
      estimateFraValue(countryIso, year, values).then((res) => {
        if (idx === years.length - 1)
          resolve()
        else
          estimate(countryIso, years[++idx], values)
      })

    eofRepository
      .getOdpValues(countryIso)
      .then(values => estimate(countryIso, years[0], values))
  })
}
