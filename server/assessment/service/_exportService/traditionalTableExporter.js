const R = require('ramda')

const FraTableExporter = require('./fraTableExporter')
const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')

class TraditionalTableExporter extends FraTableExporter {

  fetchData (countryIso) {
    return TraditionalTableService.read(countryIso, this.tableName)
  }

  parseResultRow (result, yearIdx) {
    let resultRow = {}

    this.fields.forEach((field, fieldIdx) => {

      resultRow[field] = R.path([fieldIdx, yearIdx], result)

    })

    return resultRow
  }

}

module.exports = TraditionalTableExporter
