import * as R from 'ramda'
import * as countryConfig from '../server/country/countryConfig'
import * as promise from 'bluebird'
import * as fs = promise.promisifyAll(require('fs'))
import * as csv = promise.promisifyAll(require('csv'))

const exampleUsage =
  'node previousFraValuesFrom2015Updater.js exampleData/fra-2015-forest-areas.csv /tmp/countryConfigUpdatedWithFra2015ForestAreas.json'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the previous fra values file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const previousFraFile = process.argv[2]
console.log('reading file', previousFraFile)
const outputFile = process.argv[3]

const update = async (previousFraFile, outputFile) => {
  try {
    const rawData = await fs.readFileAsync(previousFraFile, {encoding: 'utf-8'})
    const parsedData = await csv.parseAsync(rawData)
    const years = parsedData[1].slice(1)
    const previousFraValuePairs = R.map(
      row =>
        [
          row[0],
          {fra2015ForestAreas: R.fromPairs(R.zip(years, row.slice(1)))}
        ]
      ,
      parsedData.slice(2)
    )
    const previousFraValues = R.fromPairs(previousFraValuePairs)
    const merged = R.mergeDeepLeft(previousFraValues, countryConfig)
    fs.writeFileSync(outputFile, JSON.stringify(merged, null, '  '), 'utf8')
    console.log('Wrote merged values into: ', outputFile)
    console.log('You should manually copy them over the countryConfig values')
  } catch (e) { console.log(e) }
}

update(previousFraFile, outputFile)


