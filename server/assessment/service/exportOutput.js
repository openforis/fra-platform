/**
 * Abstract class for export output
 */
class ExportOutput {

  get output () {
    throw new Error('output method not implemented')
  }

  pushContent (object) {
    throw new Error('pushContent method not implemented')
  }

  pushContentDone () {
    throw new Error('pushContentDone method not implemented')
  }
}


module.exports = ExportOutput
