// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraTableEx... Remove this comment to see the full error message
class FraTableExporter {
  _fields: any

  _tableName: any

  _tableNo: any

  constructor(tableName: any, fields: any, tableNo = '') {
    this.tableName = tableName
    this.fields = fields
    this.tableNo = tableNo
  }

  get tableName() {
    return this._tableName
  }

  set tableName(tableName) {
    this._tableName = tableName
  }

  get fields() {
    return this._fields
  }

  set fields(fields) {
    this._fields = fields
  }

  get tableNo() {
    return this._tableNo
  }

  set tableNo(tableNo) {
    this._tableNo = tableNo
  }

  get fieldsWithLabels() {
    return this.fields.map((field: any) => ({
      value: field,

      label: R.isEmpty(this.tableNo) ? field : `${this.tableNo}_${field}`,
    }))
  }

  fetchData(countryIso: any) {
    throw new Error('fetchData method not implemented')
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    throw new Error('parseResultRow method not implemented')
  }
}

module.exports = FraTableExporter
