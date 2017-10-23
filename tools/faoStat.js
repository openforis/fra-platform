const promise = require('bluebird')
const fs = promise.promisifyAll(require('fs'))
const R = require('ramda')

const countryIsoCol = 0
const yearCol = 3
const areaCol = 4

const getFaostatValues = (fileName) =>
  fs.readFileAsync(process.argv[2], {encoding: 'utf-8'})
    .then(data => {
      //slice removes first header line (-1) and some crap in the end (-2)
      //^ these might change when source-data changes
      const lines = R.slice(1, -2, data.split('\n'))
      const parsedData = R.map(line => line.split(','), lines)
      const rowObjects = R.map(
        row => ({
          countryIso: row[countryIsoCol],
          year: row[yearCol],
          area: row[areaCol]
        }),
        parsedData
      )
      const groupedByCountry = R.reduce(
        (result, row) => R.assocPath([row.countryIso, 'faoStat', row.year], row.area, result),
        {},
        rowObjects
      )
      return groupedByCountry
    })

module.exports.getFaostatValues = getFaostatValues
