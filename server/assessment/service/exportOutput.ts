/**
 * Abstract class for export output
 */
class ExportOutput {
  get output(): any {
    throw new Error('output method not implemented')
  }

  pushContent(object: any) {
    throw new Error('pushContent method not implemented')
  }

  pushContentDone() {
    throw new Error('pushContentDone method not implemented')
  }
}

export default ExportOutput
