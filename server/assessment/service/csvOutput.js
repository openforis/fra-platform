const R = require('ramda')
const { AsyncParser } = require('json2csv')

class CsvOutput {

  constructor (fileName, fields) {

    this.fileName = fileName + '.csv'
    this.content = ''
    this._key = fileName.split('/').join('_')

    const opts = {
      fields: [
        {
          value: 'region',
          label: 'region',
        },
        {
          value: 'countryIso',
          label: 'iso3',
        },
        {
          value: 'listNameEn',
          label: 'name',
        },
        ...fields
      ]
    }

    this._asyncParser = new AsyncParser(opts, {})
    this._asyncParser.processor
      .on('data', chunk => (this.content += chunk.toString()))
      // .on('end', () => console.log(csv))
      .on('error', err => { throw new Error(err) })
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
