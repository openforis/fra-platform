import * as promise from 'bluebird'
import * as R from 'ramda'
import * as csv = promise.promisifyAll(require('csv'))
import * as fs = promise.promisifyAll(require('fs'))

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the country db export csv file> <path to faostat file>`)
  process.exit()
}

const countryDataDiff = (dataset1, dataset2) => {
    const moreInDataset1 = R.difference(
        R.pluck(0, dataset1),
        R.pluck(0, dataset2)
    )
    const dataset1ObjectWithNames = R.fromPairs(dataset1)
    return R.map(iso => [iso, dataset1ObjectWithNames[iso]], moreInDataset1)
}

const compareWithFaoStat = async (countryDbExportFile, faostatCsvFile) => {
    try {
        const countryData = await fs.readFileAsync(countryDbExportFile, {encoding: 'utf-8'})
        const dbCountries = await csv.parseAsync(countryData)
        const faostatRawData = await fs.readFileAsync(faostatCsvFile, {encoding: 'utf-8'})
        const parsedFaostatData = await csv.parseAsync(faostatRawData)
        const faoStatCountryIsoAndName = R.pipe(
            R.slice(1, undefined),
            R.map(row => [R.nth(-2, row), R.nth(1, row)]),
            R.uniqWith(([iso, name], [iso2, name2]) => iso === iso2)
        )(parsedFaostatData)
        console.log('These countries are in faostat data but not in DB')
        console.log(countryDataDiff(faoStatCountryIsoAndName, dbCountries))
        console.log('These countries are in DB but not in faostat')
        console.log(countryDataDiff(dbCountries, faoStatCountryIsoAndName))
    } catch (e) { console.log(e) }
}

compareWithFaoStat(process.argv[2], process.argv[3])
