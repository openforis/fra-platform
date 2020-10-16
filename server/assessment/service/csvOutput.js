const { format } = require('date-fns')

const { AsyncParser } = require('json2csv')

const ExportOutput = require('./exportOutput')

class CsvOutput extends ExportOutput {

  constructor (fileName, fields) {
    super()

    this.fileName = `${fileName}_${format(new Date(), 'yyyy_MM_dd')}.csv`
    this.content = ''
    this._key = fileName.split('/').join('_')

    const opts = {
      fields: [
        ...this.fieldsCommon,
        ...fields
      ]
    }

    this._asyncParser = new AsyncParser(opts, {})
    this._asyncParser.processor
      .on('data', chunk => (this.content += chunk.toString()))
      // .on('end', () => console.log(csv))
      .on('error', err => { throw new Error(err) })
  }

  get fieldsCommon () {
    return [
      {
        value: 'regionCodes',
        label: 'regions',
      },
      {
        value: 'countryIso',
        label: 'iso3',
      },
      {
        value: 'listNameEn',
        label: 'name',
      }
    ]
  }

  get fileName () {
    return this._fileName
  }

  set fileName (fileName) {
    this._fileName = fileName
  }

  get content () {
    return this._content
  }

  set content (content) {
    this._content = content
  }

  get output () {
    return {
      [this._key]: {
        fileName: this.fileName,
        content: this.content
      }
    }
  }

  pushContent (object) {
    this._asyncParser.input.push(JSON.stringify(object))
  }

  pushContentDone () {
    this._asyncParser.input.push(null)
  }
}

module.exports = CsvOutput
