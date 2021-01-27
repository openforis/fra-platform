import * as R from 'ramda'
import * as countryConfig from '../server/country/countryConfig'

import * as fs from 'fs'
import * as csv from 'csv'

const exampleUsage =
  'node faostatUpdater.js exampleData/climaticDomain.csv /tmp/countryConfigWithClimaticDomain.json'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the climaticDomain csv file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const climaticDomainCsvFile = process.argv[2]
console.log('reading file', climaticDomainCsvFile)
const outputFile = process.argv[3]

const update = async (climaticDomainCsvFile, outputFile) => {
  try {
    const rawClimaticDomainData = await fs.readFileAsync(climaticDomainCsvFile, {encoding: 'utf-8'})
    const parsedClimaticDomainData = await csv.parseAsync(rawClimaticDomainData)
    const climaticDomainData = R.slice(1, undefined, parsedClimaticDomainData)
    const countryClimaticDomainData = R.reduce(
      (result, row) => {
        const climaticDomainPercents2015 = {
          tropical: Number(row[2]),
          subtropical: Number(row[3]),
          temperate: Number(row[4]),
          boreal: Number(row[5]) + Number(row[6])
        }
        return R.assoc(row[1], {climaticDomainPercents2015}, result)
      },
      {},
      climaticDomainData
    )

    const merged = R.mergeDeepLeft(countryClimaticDomainData, countryConfig)
    await fs.writeFileAsync(outputFile, JSON.stringify(merged, null, '  '), 'utf8')

    console.log('Wrote merged values into: ', outputFile)
    console.log('You should manually copy them over the countryConfig values')

  } catch (e) { console.log(e) }
}

update(climaticDomainCsvFile, outputFile)

