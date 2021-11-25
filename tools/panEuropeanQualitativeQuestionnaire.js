const Promise = require('bluebird')
const R = require('ramda')
const countryConfig = require('../server/controller/country/countryConfig')

const fs = Promise.promisifyAll(require('fs'))
const csv = Promise.promisifyAll(require('csv'))

const exampleUsage =
  'node faostatUpdater.js exampleData/panEuropeanQualitativeQuestionnaire.csv /tmp/countryConfigWithPanEuropeanQualitativeQuestionnaire.json'

if (process.argv.length < 4) {
  console.log(`Usage: ${process.argv[0]} <path of the climaticDomain csv file> <path of the output file>`)
  console.log(`example:\n${exampleUsage}`)
  process.exit()
}

const climaticDomainCsvFile = process.argv[2]
console.log('reading file', climaticDomainCsvFile)
const outputFile = process.argv[3]

const update = async (panEuropeanQualitativeQuestionnaireCsvFile, outputFile) => {
  try {
    const rawPanEuropeanQualitativeQuestionnaireData = await fs.readFileAsync(
      panEuropeanQualitativeQuestionnaireCsvFile,
      { encoding: 'utf-8' }
    )
    const parsedPanEuropeanQualitativeQuestionnaireData = await csv.parseAsync(
      rawPanEuropeanQualitativeQuestionnaireData
    )
    const panEuropeanQualitativeQuestionnaireData = R.slice(1, undefined, parsedPanEuropeanQualitativeQuestionnaireData)
    const countryPanEuropeanQualitativeQuestionnaireData = R.reduce(
      (result, row) => {
        const panEuropean = {
          qualitativeQuestionnaireUrl: row[3],
        }
        return R.assoc(row[0], { panEuropean }, result)
      },
      {},
      panEuropeanQualitativeQuestionnaireData
    )

    const merged = R.mergeDeepRight(countryConfig, countryPanEuropeanQualitativeQuestionnaireData)
    await fs.writeFileAsync(outputFile, JSON.stringify(merged, null, '  '), 'utf8')

    console.log('Wrote merged values into: ', outputFile)
    console.log('You should manually copy them over the countryConfig values')
  } catch (e) {
    console.log(e)
  }
}

update(climaticDomainCsvFile, outputFile)
