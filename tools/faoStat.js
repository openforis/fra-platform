const promise = require('bluebird')
const fs = promise.promisifyAll(require('fs'))
const csv = promise.promisifyAll(require('csv'))
const R = require('ramda')

const countryIsoCol = 6
const yearCol = 3
const areaCol = 5
const estimateCol = 7

const getFaostatValues = async (fileName) => {
  const rawFaostatData = await fs.readFileAsync(fileName, {encoding: 'utf-8'})
  const parsedFaostatData = await csv.parseAsync(rawFaostatData)
  const faoStatData = R.slice(1, undefined, parsedFaostatData)
  const rowObjects = R.map(
    row => ({
      countryIso: row[countryIsoCol],
      year: row[yearCol],
      area: row[areaCol],
      estimate: row[estimateCol] === 'EST'
    }),
    faoStatData
  )
  const groupedByCountry = R.reduce(
    (result, row) => R.assocPath(
      [row.countryIso, 'faoStat', row.year],
      {area: row.area, estimate: row.estimate},
      result
    ),
    {},
    rowObjects
  )
  return groupedByCountry
}

module.exports.getFaostatValues = getFaostatValues
