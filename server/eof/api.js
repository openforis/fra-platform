const eofRepository = require('./repository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../requestUtils')
const R = require("ramda")

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {

    app.post('/api/country/:countryIso/:year', (req, res) => {
        eofRepository.persistFraForestArea(req.params.countryIso, req.params.year, req.body.forestArea)
            .then(() => res.json({}))
            .catch(err => sendErr(res, err))
    })

    app.get('/api/country/:countryIso', (req, res) => {
      const fra = eofRepository.readFraForestAreas(req.params.countryIso)
      const odp = eofRepository.readOriginalDataPoints(req.params.countryIso)
  
      Promise.all([fra, odp])
        .then(result => {
          const forestAreas = R.pipe(
            R.merge(forestAreaTableResponse.fra),
            R.merge(result[1]),
            R.values,
            R.sort((a, b) => a.year - b.year)
          )(result[0])
          return res.json({fra: forestAreas})
        })
        .catch(err => sendErr(res, err))
    })

    app.get('/api/country/originalDataPoint/:odpId', (req, res) => {
        eofRepository.getOdp(req.params.odpId)
            .then(resp =>
                res.json({odpId: resp.odp_id, forestArea: resp.forest_area, year: resp.year})
            )
            .catch(err => sendErr(res, err))
    })

    app.post('/api/country/originalDataPoint/draft/:countryIso', (req, res) => {
        const countryIso = req.params.countryIso
        db.transaction(eofRepository.saveDraft, [countryIso, req.body])
            .then(result => res.json(result))
            .catch(err => sendErr(res, err))
    })

    app.post('/api/country/originalDataPoint/draft/markAsActual/:opdId', (req, res) =>
        db.transaction(eofRepository.markAsActual, [req.params.opdId])
            .then(() => res.json({}))
            .catch(err => sendErr(res, err))
    )
    
    const interpolate = (x, xa, ya, xb, yb) => {
        const y = ya + ( yb - ya) * (x - xa) / (xb - xa)
        return y
    }
    
    const extrapolate = (x, xa, ya, xb, yb) => {
        const y = ya + (x - xa) / (xb - xa) * (yb - ya)
        return y
    }
    
    const estimateFraValue = (countryIso, year) => {
        return new Promise( (resolve, reject) => {
            console.log("======= ESTIMATING FRA VALUE FOR COUNTRY " , countryIso , " FOR ", year )
            eofRepository.getOdpByYear(countryIso, year).then(odp =>{
                if(odp) {
                    // 1: if value exists , copy
                    console.log("======= COPY VALUE result", odp.forest_area )
                    eofRepository.persistFraForestArea(countryIso, year, odp.forest_area, true).then(()=>resolve(odp.forest_area))
                } else {
                    const previousValue = eofRepository.getPreviousValue(countryIso, year)
                    const nextValue = eofRepository.getNextValue(countryIso, year)
                
                    // 2: if value has 1 before and one after, interpolate
                    Promise.all([previousValue, nextValue]).then(result => {
                        if( result[0] && result[1] ){
                            const pointA = result[0]
                            const pointB = result[1]
                            console.log("======= INTERPOLATE point A" , pointA)
                            console.log("======= INTERPOLATE point B" , pointB)
                            const newValue = interpolate(year , Number(pointA.year), Number(pointA.forest_area), Number(pointB.year), Number(pointB.forest_area))
                            console.log("======= INTERPOLATE result" , newValue)
                            eofRepository.persistFraForestArea(countryIso, year, newValue, true).then(()=>resolve(newValue))
                        } else {
                            eofRepository.get2PreviousValues(countryIso,year).then(result => {
                                if(result && result.length == 2){
                                
                                    // 3: if value has 2 before extrapolate
                                    const pointA = result[1]
                                    const pointB = result[0]
                                    console.log("======= EXTRAPOLATE point A" , pointA)
                                    console.log("======= EXTRAPOLATE point B" , pointB)
                                    const newValue = extrapolate(year , Number(pointA.year), Number(pointA.forest_area), Number(pointB.year), Number(pointB.forest_area))
                                    console.log("======= EXTRAPOLATE result" , newValue)
                                    eofRepository.persistFraForestArea(countryIso, year, newValue, true).then(()=> resolve(newValue) )
                                } else {
                                    console.log("======= NO result" )
                                    resolve(null)
                                }
                            })
                        }
                    })
                
                }
            })
        })
    }
    
    app.get('/api/country/generateFraValues/:countryIso' , (req,res) => {
        const countryIso = req.params.countryIso

        const estimateFraValues = () => {
            return new Promise((resolve, reject) => {
                const   years = [ 1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020 ]
                let     idx = 0
                
                const estimate = (countryIso, year) =>
                    estimateFraValue(countryIso, year).then( (res) => {
                        if(idx == years.length-1)
                            resolve()
                        else
                            estimate(countryIso, years[++idx])
                    })
                
    
                estimate(countryIso, years[0])
            })
        }
    
        estimateFraValues().then( ()=>console.log("AAAAAAAAAAAAAAAA DONE!~!~! PERKELE") || res.json({}) )
        
    })
}