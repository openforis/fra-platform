// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'format'.
const { format } = require('date-fns')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CsvOutput'... Remove this comment to see the full error message
const CsvOutput = require('./csvOutput')
const VariablesUnit = require('./variablesUnit')

class CsvOutputWithVariables extends CsvOutput {
  constructor(
    fileName: any,
    fieldsVariables: any,
    fieldsCountryConfig: any,
    years: any,
    includeVariableFolders = true
  ) {
    super(fileName, ['year', ...fieldsCountryConfig, ...fieldsVariables])
    this._fieldsVariables = fieldsVariables
    this._fieldsCountryConfig = R.prepend({ value: 'forestArea2020', label: 'Forest area 2020' }, fieldsCountryConfig)
    this._years = years
    this._variablesOutputFiles = {}
    this._includeVariableFolders = includeVariableFolders
    // singe variable output files
    this._fieldsVariables.forEach((field: any) => {
      this._variablesOutputFiles[field.label] = new CsvOutput(`${fileName}_variables/${field.label}`, [
        ...this._fieldsCountryConfig,
        ...this._years.map(R.toString),
        '',
        field.label,
      ])
    })
  }

  get output() {
    let output = super.output
    if (!this._includeVariableFolders) {
      return output
    }
    this._fieldsVariables.forEach((field: any) => {
      const variableOutputFile = this._variablesOutputFiles[field.label]
      output = {
        ...output,
        ...variableOutputFile.output,
      }
    })
    return output
  }

  // @ts-expect-error ts-migrate(2416) FIXME: Property 'pushContent' in type 'CsvOutputWithVaria... Remove this comment to see the full error message
  pushContent(object: any, idx: any) {
    super.pushContent(object)
    this._fieldsVariables.forEach((field: any) => {
      // create row for variable output file
      const countryResultRowFirst = object[0]
      const rowVariableOutputFile = {
        ...R.pick([...this.fieldsCommon, ...this._fieldsCountryConfig].map(R.prop('value')), countryResultRowFirst),
      }
      object.forEach((rowResult: any, i: any) => {
        const year = this._years[i]
        rowVariableOutputFile[R.toString(year)] = rowResult[field.value]
      })
      if (idx === 0) {
        rowVariableOutputFile[field.label] = format(new Date(), 'yyyy_MM_dd')
      } else if (idx === 1) {
        rowVariableOutputFile[field.label] = VariablesUnit[field.label]
      }
      const variableOutputFile = this._variablesOutputFiles[field.label]
      variableOutputFile.pushContent(rowVariableOutputFile)
    })
  }

  pushContentDone() {
    super.pushContentDone()
    Object.values(this._variablesOutputFiles).forEach((variableOutputFiles) => {
      ;(variableOutputFiles as any).pushContentDone()
    })
  }
}
module.exports = CsvOutputWithVariables
