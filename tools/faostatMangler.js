const promise = require('bluebird')
const fs = promise.promisifyAll(require('fs'))
const R = require('ramda')

const countryIsoCol = 0
const yearCol = 3
const areaCol = 4

if (process.argv.length < 3) {
  console.log(`Usage: ${process.argv[0]} <name of the faostat csv file>`)
  process.exit()
}

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
        (result, row) => R.assocPath([row.countryIso, row.year], row.area, result),
        {},
        rowObjects
      )
      return groupedByCountry
    })

const fileName  = process.argv[2]
console.log('reading file', fileName)
getFaostatValues(fileName)
  .then(values=> console.log(values))
  .catch(err => console.log('Error: ', err))
