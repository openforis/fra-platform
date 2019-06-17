class FraTableExporter {

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
    throw new Error('fetchData method not implemented')
  }

  parseResultRow (result, yearIdx, year) {
    throw new Error('parseResultRow method not implemented')
  }

}

module.exports = FraTableExporter
