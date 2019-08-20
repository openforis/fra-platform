const R = require('ramda')
const CsvOutput = require('../csvOutput')
const { format } = require('date-fns')
const variablesUnit = require('./variablesUnit')

class FRAYearsCsvOutput extends CsvOutput {

  constructor (fieldsFraYears, fieldsVariables, fieldsCountryConfig, YEARS_FRA) {
    super('FRA_Years', fieldsFraYears)

    this._fieldsVariables = fieldsVariables
    this._fieldsCountryConfig = R.prepend({ value: 'forestArea2020', label: 'Forest area 2020' }, fieldsCountryConfig)
    this._YEARS_FRA = YEARS_FRA

    // singe variable outout files
    this._variablesOutputFiles = {}
    this._fieldsVariables.forEach(field => {
      this._variablesOutputFiles[field.label] = new CsvOutput(
        `FRA_Years_variables/${field.label}`,
        [
          ...this._fieldsCountryConfig,
          ...this._YEARS_FRA.map(R.toString),
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
            'region', 'countryIso', 'listNameEn',
            ...this._fieldsCountryConfig.map(R.prop('value'))
          ],
          countryResultRowFirst
        )
      }

      object.forEach((rowResult, i) => {
        const year = this._YEARS_FRA[i]
        rowVariableOutputFile[R.toString(year)] = rowResult[field.value]
      })

      if (idx === 0) {
        rowVariableOutputFile[field.label] = format(new Date(), 'YYYY_MM_DD')
      } else if (idx === 1) {
        rowVariableOutputFile[field.label] = variablesUnit[field.label]
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

module.exports = FRAYearsCsvOutput
