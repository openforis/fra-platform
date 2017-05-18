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
    console.log('======= ESTIMATING FRA VALUE FOR COUNTRY ', countryIso, ' FOR ', year)
    eofRepository.getOdpByYear(countryIso, year).then(odp => {
      if (odp) {
        // 1: if value exists , copy
        console.log('======= COPY VALUE result', odp.forest_area)
        eofRepository.persistFraForestArea(countryIso, year, odp.forest_area, true).then(() => resolve(odp.forest_area))
      } else {
        const previousValue = eofRepository.getPreviousValue(countryIso, year)
        const nextValue     = eofRepository.getNextValue(countryIso, year)
        
        // 2: if value has 1 before and one after, interpolate
        Promise.all([previousValue, nextValue]).then(result => {
          if (result[0] && result[1]) {
            const pointA = result[0]
            const pointB = result[1]
            console.log('======= INTERPOLATE point A', pointA)
            console.log('======= INTERPOLATE point B', pointB)
            const newValue = interpolate(year, Number(pointA.year), Number(pointA.forest_area), Number(pointB.year), Number(pointB.forest_area))
            console.log('======= INTERPOLATE result', newValue)
            eofRepository.persistFraForestArea(countryIso, year, newValue, true).then(() => resolve(newValue))
          } else {
            eofRepository.get2PreviousValues(countryIso, year).then(result => {
              if (result && result.length == 2) {
                
                // 3: if value has 2 before extrapolate
                const pointA = result[1]
                const pointB = result[0]
                console.log('======= EXTRAPOLATE point A', pointA)
                console.log('======= EXTRAPOLATE point B', pointB)
                const newValue = extrapolate(year, Number(pointA.year), Number(pointA.forest_area), Number(pointB.year), Number(pointB.forest_area))
                console.log('======= EXTRAPOLATE result', newValue)
                eofRepository.persistFraForestArea(countryIso, year, newValue, true).then(() => resolve(newValue))
              } else {
                console.log('======= NO result')
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