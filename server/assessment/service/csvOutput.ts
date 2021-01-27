// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'format'.
const { format } = require('date-fns')

const { AsyncParser } = require('json2csv')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExportOutp... Remove this comment to see the full error message
const ExportOutput = require('./exportOutput')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CsvOutput'... Remove this comment to see the full error message
class CsvOutput extends ExportOutput {
  constructor(fileName: any, fields: any) {
    super()

    this.fileName = `${fileName}_${format(new Date(), 'yyyy_MM_dd')}.csv`
    this.content = ''
    this._key = fileName.split('/').join('_')

    const opts = {
      fields: [...this.fieldsCommon, ...fields],
    }

    this._asyncParser = new AsyncParser(opts, {})
    this._asyncParser.processor
      .on('data', (chunk: any) => (this.content += chunk.toString()))
      // .on('end', () => console.log(csv))
      .on('error', (err: any) => {
        throw new Error(err)
      })
  }

  get fieldsCommon() {
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
      },
    ]
  }

  get fileName() {
    return this._fileName
  }

  set fileName(fileName) {
    this._fileName = fileName
  }

  get content() {
    return this._content
  }

  set content(content) {
    this._content = content
  }

  get output() {
    return {
      [this._key]: {
        fileName: this.fileName,
        content: this.content,
      },
    }
  }

  pushContent(object: any) {
    this._asyncParser.input.push(JSON.stringify(object))
  }

  pushContentDone() {
    this._asyncParser.input.push(null)
  }
}

module.exports = CsvOutput
