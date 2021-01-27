// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExportOutp... Remove this comment to see the full error message
const ExportOutput = require('./exportOutput')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'JSONOutput... Remove this comment to see the full error message
class JSONOutput extends ExportOutput {
  constructor(name: any) {
    super()

    this._name = name
    this._data = []
  }

  get output() {
    return {
      [this._name]: this._data,
    }
  }

  pushContent(object: any) {
    this._data.push(...object)
  }

  pushContentDone() {
    //
  }
}

module.exports = JSONOutput
