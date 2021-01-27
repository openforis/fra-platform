const ExportOutput = require('./exportOutput')

class JSONOutput extends ExportOutput {

  constructor (name) {
    super()

    this._name = name
    this._data = []
  }

  get output () {
    return {
      [this._name]: this._data
    }
  }

  pushContent (object) {
    this._data.push(...object)
  }

  pushContentDone () {
    //
  }
}

module.exports = JSONOutput
