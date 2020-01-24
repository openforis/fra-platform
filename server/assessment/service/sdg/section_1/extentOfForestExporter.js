const R = require('ramda')

const FraValueService = require('../../../../eof/fraValueService')

const FraTableExporter = require('../../exporter/fraTableExporter')

class ExtentOfForestExporter extends FraTableExporter {

  constructor () {
    super(
      'extentOfForest',
      ['forestArea', 'landArea'],
      '1a'
    )
  }

  fetchData (countryIso) {
    return FraValueService.getFraValues(this.tableName, countryIso)
  }

  parseResultRow (result, yearIdx, year, countryConfig) {
    const eofYear = R.pipe(
      R.prop('fra'),
      R.find(R.propEq('year', year)),
      R.defaultTo({})
    )(result)

    return ({
      forestArea: R.prop('forestArea', eofYear),
      landArea: R.path(['faoStat', year, 'area'], countryConfig)
    })
  }
}

const instance = new ExtentOfForestExporter()

module.exports = instance
