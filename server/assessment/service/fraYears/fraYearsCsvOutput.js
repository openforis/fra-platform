const R = require('ramda')
const CsvOutput = require('../csvOutput')

class FRAYearsCsvOutput extends CsvOutput {

  constructor (fieldsFraYears, fieldsVariables, fieldsCountryConfig, YEARS_FRA) {
    super('FRA_Years', fieldsFraYears)

    this._fieldsVariables = fieldsVariables
    this._fieldsCountryConfig = fieldsCountryConfig
    this._YEARS_FRA = YEARS_FRA

    // singe variable outout files
    this._variablesOutputFiles = {}
    this._fieldsVariables.forEach(field => {
      this._variablesOutputFiles[field.label] = new CsvOutput(
        `FRA_Years_variables/${field.label}`,
        [
          ...this._fieldsCountryConfig,
          ...this._YEARS_FRA.map(R.toString)
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

  pushContent (object) {
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
