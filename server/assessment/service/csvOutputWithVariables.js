const R = require('ramda')
const { format } = require('date-fns')

const CsvOutput = require('./csvOutput')
const VariablesUnit = require('./variablesUnit')

class CsvOutputWithVariables extends CsvOutput {

  constructor (fileName, fieldsVariables, fieldsCountryConfig, years) {
    super(fileName, ['year', ...fieldsCountryConfig, ...fieldsVariables])

    this._fieldsVariables = fieldsVariables
    this._fieldsCountryConfig = R.prepend({ value: 'forestArea2020', label: 'Forest area 2020' }, fieldsCountryConfig)
    this._years = years

    // singe variable output files
    this._variablesOutputFiles = {}
    this._fieldsVariables.forEach(field => {
      this._variablesOutputFiles[field.label] = new CsvOutput(
        `${fileName}_variables/${field.label}`,
        [
          ...this._fieldsCountryConfig,
          ...this._years.map(R.toString),
          '',
          field.label
        ]
      )
    })
  }

  get output () {
    let output = super.output

    this._fieldsVariables.forEach(field => {
      const variableOutputFile = this._variablesOutputFiles[field.label]
      output = {
        ...output,
        ...variableOutputFile.output
      }
    })

    return output
  }

  pushContent (object, idx) {
    super.pushContent(object)

    this._fieldsVariables.forEach(field => {

      // create row for variable output file
      const countryResultRowFirst = object[0]
      const rowVariableOutputFile = {
        ...R.pick(
          [
            ...this.fieldsCommon,
            ...this._fieldsCountryConfig
          ].map(R.prop('value')),
          countryResultRowFirst
        )
      }

      object.forEach((rowResult, i) => {
        const year = this._years[i]
        rowVariableOutputFile[R.toString(year)] = rowResult[field.value]
      })

      if (idx === 0) {
        rowVariableOutputFile[field.label] = format(new Date(), 'YYYY_MM_DD')
      } else if (idx === 1) {
        rowVariableOutputFile[field.label] = VariablesUnit[field.label]
      }

      const variableOutputFile = this._variablesOutputFiles[field.label]
      variableOutputFile.pushContent(rowVariableOutputFile)
    })
  }

  pushContentDone () {
    super.pushContentDone()

    Object.values(this._variablesOutputFiles)
      .forEach(
        variableOutputFiles => {
          variableOutputFiles.pushContentDone()
        }
      )
  }

}

module.exports = CsvOutputWithVariables
