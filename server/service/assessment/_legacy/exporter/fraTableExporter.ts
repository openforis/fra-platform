import * as R from 'ramda'

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fetchData(_countryIso: any) {
    throw new Error('fetchData method not implemented')
  }

  // eslint-disable-next-line class-methods-use-this
  parseResultRow(_result: any, _yearIdx: any, _year: any, _countryConfig?: any) {
    throw new Error('parseResultRow method not implemented')
  }
}

export default FraTableExporter
