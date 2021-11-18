/**
 * Abstract class for export output
 */
class ExportOutput {
  // eslint-disable-next-line class-methods-use-this
  get output(): any {
    throw new Error('output method not implemented')
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  pushContent(_object: any) {
    throw new Error('pushContent method not implemented')
  }

  // eslint-disable-next-line class-methods-use-this
  pushContentDone() {
    throw new Error('pushContentDone method not implemented')
  }
}

export default ExportOutput
