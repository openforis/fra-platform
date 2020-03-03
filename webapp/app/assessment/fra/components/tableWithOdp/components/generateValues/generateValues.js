import React from 'react'
import * as R from 'ramda'

import { hasOdps } from '@common/extentOfForestHelper'

const mapIndexed = R.addIndex(R.map)

const hasTableValues = (fra, rows) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rows))
  const flattenedFraValues = R.pipe(
    R.filter(value => value.type === 'fra'),
    R.map(column => R.props(valueFieldNames, column)),
    R.flatten,
    R.reject(R.isNil)
  )(fra)
  return flattenedFraValues.length > 0
}


export class GenerateValues extends React.Component {

  constructor (props) {
    super(props)
    this.fieldNames = R.reject(R.isNil, R.pluck('field', props.rows))
    const annualChangeRates = R.pipe(
      R.map(fieldName => [fieldName, { ratePast: '', rateFuture: '' }]),
      R.fromPairs
    )(this.fieldNames)
    this.state = {
      generateMethod: '', annualChangeRates,
      selectedFields: []
    }
  }

  render () {
    const { i18n, fra, generatingFraValues, useOriginalDataPoints } = this.props
    return <div className="table-with-odp__generate-control">
      <select
        className="select-s"
        value={this.state.generateMethod}
        onChange={evt => this.setState({ ...this.state, generateMethod: evt.target.value })}>
        <option value='' disabled>{i18n.t('tableWithOdp.placeholderSelect')}</option>
        {
          hasOdps(fra) && !!useOriginalDataPoints
            ? [
              <option key="linear" value="linear">{i18n.t('tableWithOdp.linearExtrapolation')}</option>,
              <option key="repeatLast" value="repeatLast">{i18n.t('tableWithOdp.repeatLastExtrapolation')}</option>,
              <option key="annualChange" value="annualChange">{i18n.t('tableWithOdp.annualChangeExtrapolation')}</option>,
              <option key="divider" disabled>---</option>
            ]
            : null
        }
        <option value="clearTable">{i18n.t('tableWithOdp.clearTable')}</option>
      </select>
      <button
        className={`btn-s ${this.state.generateMethod === 'clearTable' ? 'btn-secondary' : 'btn-primary'}`}
        disabled={this.disableGenerateFraValues(fra, generatingFraValues)}
        onClick={() => this.generateFraValues(this.state.generateMethod)}>
        {
          this.state.generateMethod === 'clearTable'
            ? i18n.t('tableWithOdp.clearTable')
            : i18n.t('tableWithOdp.generateFraValues')
        }
      </button>
      {
        R.isEmpty(this.state.generateMethod) || this.state.generateMethod === 'clearTable'
          ? null
          : this.rowSelections()
      }
    </div>
  }

  rowSelections () {
    const { i18n, rows } = this.props
    const rateValidationClass = rate => this.validRate(rate) || R.isEmpty(rate) ? '' : 'validation-error'
    const rowHeaders = R.reject(R.isNil, R.pluck('rowHeader', rows))
    return <table className="table-with-odp__generate-inputs-table">
      <tbody>
      {
        this.state.generateMethod === 'annualChange'
          ? <tr>
            <td colSpan={2}></td>
            <td style={{ textAlign: 'center' }}>{i18n.t('tableWithOdp.placeholderPast')}</td>
            <td style={{ textAlign: 'center' }}>{i18n.t('tableWithOdp.placeholderFuture')}</td>
          </tr>
          : null
      }
      {
        mapIndexed((field, i) =>
            <tr key={i}>
              <td className="table-with-odp__generate-inputs-row-selection-cell">
                <div
                  className={`fra-checkbox ${R.contains(field, this.state.selectedFields) ? 'checked' : ''}`}
                  onClick={
                    evt => R.contains(field, this.state.selectedFields)
                      ? this.setState({
                        ...this.state,
                        selectedFields: R.reject(f => f === field, this.state.selectedFields)
                      })
                      : this.setState({ ...this.state, selectedFields: R.append(field, this.state.selectedFields) })
                  }
                />
              </td>
              <td className="table-with-odp__generate-input-header">{rowHeaders[i]}</td>
              {
                this.state.generateMethod === 'annualChange'
                  ? [
                    <td key="ratePast" className="table-with-odp__generate-input-cell">
                      <input
                        type="text"
                        className={`text-input-s ${rateValidationClass(this.state.annualChangeRates[field].ratePast)}`}
                        value={this.state.annualChangeRates[field].ratePast}
                        onChange={(evt) => this.setState(R.assocPath(['annualChangeRates', field, 'ratePast'], evt.target.value, this.state))}/>
                    </td>,
                    <td key="rateFuture" className="table-with-odp__generate-input-cell">
                      <input
                        type="text"
                        className={`text-input-s ${rateValidationClass(this.state.annualChangeRates[field].rateFuture)}`}
                        value={this.state.annualChangeRates[field].rateFuture}
                        onChange={(evt) => this.setState(R.assocPath(['annualChangeRates', field, 'rateFuture'], evt.target.value, this.state))}
                      />
                    </td>,
                    <td key="unit"
                        className="table-with-odp__generate-comment-cell">{i18n.t('tableWithOdp._1000haYear')}</td>
                  ]
                  : null
              }
            </tr>
          , R.keys(this.state.annualChangeRates))
      }
      </tbody>
    </table>
  }

  disableGenerateFraValues (fra, generatingFraValues) {
    if (this.state.generateMethod === '') return true
    if (this.state.generateMethod === 'clearTable') return false
    if (this.state.generateMethod === 'annualChange' && !this.validRates()) return true
    if (R.isEmpty(this.state.selectedFields)) return true

    const noRequiredOdps = this.state.generateMethod === 'linear' ? 2 : 1
    const odps = R.pipe(
      R.values,
      R.filter(value => value.type === 'odp')
    )(fra)
    return generatingFraValues || odps.length < noRequiredOdps
  }

  generateFraValues (generateMethod) {
    const { section, countryIso, i18n, fra, rows, generateFraValues } = this.props
    const generateAnnualChange = () => {
      if (!this.validRates()) { throw new Error('Validation errors rates') }
      generateFraValues(
        section,
        countryIso,
        {
          method: generateMethod,
          fields: this.state.selectedFields,
          changeRates: this.selectedRates()
        }
      )
    }
    const generate = () => {
      if (generateMethod === 'annualChange') {
        generateAnnualChange()
      } else {
        generateFraValues(
          section,
          countryIso,
          {
            method: generateMethod,
            fields: generateMethod === 'clearTable' ? this.fieldNames : this.state.selectedFields
          }
        )
      }
    }
    if (hasTableValues(fra, rows)) {
      if (window.confirm(i18n.t('tableWithOdp.confirmGenerateFraValues'))) {
        generate()
      }
    } else {
      generate()
    }
  }

  selectedRates () {
    return R.pipe(
      R.toPairs,
      R.filter(([field, _]) => R.contains(field, this.state.selectedFields)),
      R.fromPairs
    )(this.state.annualChangeRates)
  }

  validRates () {
    const valids = R.map(value =>
      this.validRate(value.ratePast) && this.validRate(value.rateFuture)
      , R.values(this.selectedRates()))
    return R.all(R.identity, valids)
  }

  validRate (rate) {
    return !isNaN(rate) && !R.isNil(rate) && !R.isEmpty(R.trim(rate))
  }
}

export default GenerateValues
