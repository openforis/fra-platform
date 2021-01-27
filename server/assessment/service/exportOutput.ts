/**
 * Abstract class for export output
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExportOutp... Remove this comment to see the full error message
class ExportOutput {
  get output() {
    throw new Error('output method not implemented')
  }

  pushContent(object: any) {
    throw new Error('pushContent method not implemented')
  }

  pushContentDone() {
    throw new Error('pushContentDone method not implemented')
  }
}

module.exports = ExportOutput
