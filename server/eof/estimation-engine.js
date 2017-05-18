const eofRepository = require('./repository')

const interpolate = (x, xa, ya, xb, yb) => {
  const y = ya + ( yb - ya) * (x - xa) / (xb - xa)
  return y
}

const extrapolate = (x, xa, ya, xb, yb) => {
  const y = ya + (x - xa) / (xb - xa) * (yb - ya)
  return y
}

const estimateFraValue = (countryIso, year) => {
  return new Promise((resolve, reject) => {
    
    eofRepository.getOdpByYear(countryIso, year).then(odp => {
      if (odp) {
        // 1: if value exists , copy
        eofRepository.persistFraForestArea(countryIso, year, odp.forest_area, true).then(() => resolve(odp.forest_area))
      } else {
        const previousValue = eofRepository.getPreviousValue(countryIso, year)
        const nextValue     = eofRepository.getNextValue(countryIso, year)
        
        // 2: if value has 1 before and one after, interpolate
        Promise.all([previousValue, nextValue]).then(result => {
          if (result[0] && result[1]) {
            const pointA   = result[0]
            const pointB   = result[1]
            let newValue = interpolate(year, Number(pointA.year), Number(pointA.forest_area), Number(pointB.year), Number(pointB.forest_area))
            newValue = newValue < 0 ? 0 : newValue
            eofRepository.persistFraForestArea(countryIso, year, newValue, true).then(() => resolve(newValue))
          } else {
            eofRepository.get2PreviousValues(countryIso, year).then(result => {
              if (result && result.length == 2) {
                
                // 3: if value has 2 before extrapolate
                const pointA   = result[1]
                const pointB   = result[0]
                let newValue = extrapolate(year, Number(pointA.year), Number(pointA.forest_area), Number(pointB.year), Number(pointB.forest_area))
                newValue = newValue < 0 ? 0 : newValue
                eofRepository.persistFraForestArea(countryIso, year, newValue, true).then(() => resolve(newValue))
              } else {
                resolve(null)
              }
            })
          }
        })
        
      }
    })
  })
}

module.exports.estimateFraValues = (countryIso, years) => {
  return new Promise((resolve, reject) => {
    let idx = 0
    
    const estimate = (countryIso, year) =>
      estimateFraValue(countryIso, year).then((res) => {
        if (idx == years.length - 1)
          resolve()
        else
          estimate(countryIso, years[++idx])
      })
    
    estimate(countryIso, years[0])
  })
}