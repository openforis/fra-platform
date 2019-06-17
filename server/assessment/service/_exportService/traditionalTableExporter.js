const R = require('ramda')

const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')

class TraditionalTableExporter {

  constructor (tableName, fields) {
    this.tableName = tableName
    this.fields = fields
  }

  get tableName () {
    return this._tableName
  }

  set tableName (tableName) {
    this._tableName = tableName
  }

  get fields () {
    return this._fields
  }

  set fields (fields) {
    this._fields = fields
  }

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
