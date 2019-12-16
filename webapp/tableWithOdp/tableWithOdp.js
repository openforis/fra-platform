import './style.less'
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import clipboard from 'clipboard-polyfill'
import { Link } from 'react-router-dom'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import Icon from '../reusableUiComponents/icon'
import ReviewIndicator from '../review/reviewIndicator'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { acceptNextDecimal } from '../utils/numberInput'
import { formatNumber, toFixed } from '../../common/bignumberUtils'
import { hasOdps } from '../../common/extentOfForestHelper'
import defaultYears from '../../server/eof/defaultYears'
import { isPrintingMode } from '../printAssessment/printAssessment'

const mapIndexed = R.addIndex(R.map)

const getFraValues = (fra, rows) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rows))
  const fraValues = R.pipe(
    R.filter(value => R.contains(value.year, defaultYears)),
    R.map(column => R.props(valueFieldNames, column))
  )(fra)
  return fraValues
}

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

export class TableWithOdp extends React.Component {

  clipboardTable (tableValues) {
    return <table>
      <tbody>
      {mapIndexed((row, i) =>
          <tr key={i}>
            {mapIndexed((value, i) =>
                <td key={i}> {toFixed(value)} </td>
              , row)}
          </tr>
        , tableValues)}
      </tbody>
    </table>
  }

  copyTableAsHtml () {
    const transposedFraValues = R.transpose(getFraValues(this.props.fra, this.props.rows))
    const htmlTable = ReactDOMServer.renderToString(this.clipboardTable(transposedFraValues))
    const dataTransfer = new clipboard.DT()
    dataTransfer.setData('text/plain', this.props.i18n.t('forestCharacteristics.forestCharacteristics'))
    dataTransfer.setData('text/html', htmlTable)
    clipboard.write(dataTransfer)
  }

  render () {
    const { copyValues = true, disabled = false } = this.props

    return <div className="fra-table__container table-with-odp">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">{this.props.categoryHeader}</th>
            <th className="fra-table__header-cell" colSpan={R.values(this.props.fra).length}>
              <div>
                {this.props.tableHeader}
                {copyValues
                  ? <button className="fra-table__header-button btn-xs btn-primary no-print"
                            onClick={() => this.copyTableAsHtml()}>
                    {this.props.i18n.t('tableWithOdp.copyToClipboard')}
                  </button>
                  : null}
              </div>
            </th>
          </tr>
          <tr>
            {
              R.values(this.props.fra).map(value =>
                <th className={value.type === 'odp' && !isPrintingMode() ? 'odp-header-cell' : 'fra-table__header-cell'}
                    key={`${value.type}_${value.name}`}>
                  {
                    value.type === 'odp'
                      ? <OdpHeading countryIso={this.props.countryIso} odpValue={value} section={this.props.section}
                                    disabled={disabled}/>
                      : value.name
                  }
                </th>
              )
            }
          </tr>
          </thead>
          <tbody>
          {buildRows(this.props.rows, this.props)}
          </tbody>
        </table>
      </div>
    </div>
  }
}

export class GenerateFraValuesControl extends React.Component {

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
    const { i18n, fra, generatingFraValues, rows, useOriginalDataPoints } = this.props
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

const buildRows = (rows, props) => {
  const save = R.partial(props.save, [props.section])
  const saveMany = R.partial(props.saveMany, [props.section])
  const pasteUpdate = R.partial(updatePastedValues, [R.pluck('field', rows)])

  return mapIndexed((row, rowIdx) =>
      <TableRow {...props} key={rowIdx} row={row} save={save} saveMany={saveMany} pasteUpdate={pasteUpdate}
                rowIdx={rowIdx}/>
    , rows)
}

const OdpHeading = ({ countryIso, odpValue, section }) =>
    <Link className="link" to={`/country/${countryIso}/odp/${section}/${odpValue.odpId}`}>
      {odpValue.draft ? <Icon className="icon-sub icon-margin-right" name="pencil"/> : ''}
      {odpValue.name}
    </Link>

const fraValueCell = (fraValue, fra, countryIso, save, saveMany, pasteUpdate, field, rowIdx, colIdx, disabled) =>
  <ThousandSeparatedDecimalInput
    numberValue={fraValue[field]}
    onPaste={e => saveMany(countryIso, pasteUpdate(e, rowIdx, colIdx, fra))}
    onChange={e => { save(countryIso, fraValue.name, e.target.value, fraValue, field, acceptNextDecimal) }}
    disabled={disabled}/>

const validationErrorRow = columnErrorMsgs => {
  if (R.all(R.isNil, columnErrorMsgs)) return null
  return <tr key="validationError" className="no-print">
    {
      mapIndexed((errorMsgs, colIdx) =>
          <td className="fra-table__validation-cell" key={colIdx}>
            <div className="fra-table__validation-container">
              {
                mapIndexed(
                  (errorMsg, errorIdx) =>
                    <div className="fra-table__validation-error" key={errorIdx}>{errorMsg}</div>
                  ,
                  errorMsgs
                )
              }
            </div>
          </td>
        , columnErrorMsgs)
    }
  </tr>
}

const alwaysOkValidator = () => true

const renderFieldRow = ({ row, countryIso, fra, save, saveMany, pasteUpdate, rowIdx, openCommentThread, section, disabled }) => {
  const {
    rowHeader,
    field,
    className,
    rowVariable
  } = row
  const validator = row.validator || alwaysOkValidator
  return <tr
    key={field}
    className={`${openCommentThread && R.isEmpty(R.difference(openCommentThread.target, [field])) ? 'fra-row-comments__open' : ''}`}>
    <th className={className ? className : 'fra-table__category-cell'}>
      {rowHeader} {rowVariable}
    </th>
    {
      mapIndexed(
        (fraColumn, colIdx) => {

          const className = 'fra-table__cell'
            + (fraColumn.type === 'odp' && !isPrintingMode() ? ' odp-value-cell' : '')
            + (validator(fraColumn, field) ? '' : ' validation-error')

          return (
            <td className={className} key={`${fraColumn.type}_${fraColumn.name}`}>
              {
                fraColumn.type === 'odp'
                  ? (
                    <div className="number-input__container validation-error-sensitive-field">
                      <div className="number-input__readonly-view">
                        {formatNumber(fraColumn[field])}
                      </div>
                    </div>
                  )
                  : fraValueCell(fraColumn, fra, countryIso, save, saveMany, pasteUpdate, field, rowIdx, colIdx, disabled)
              }
            </td>
          )
        },
        R.values(fra))
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        {
          disabled
            ? null
            : <ReviewIndicator key={`${field}_ri`}
                               section={section}
                               title={rowHeader}
                               target={[field]}
                               countryIso={countryIso}/>
        }

      </div>
    </td>
  </tr>
}

const rowRenderers = {
  field: renderFieldRow,
  custom: ({ row, fra }) => row.render(fra),
  validationErrors: ({ row, fra }) => validationErrorRow(row.validationErrorMessages(fra))
}

const TableRow = props => {
  const rowType = props.row.type
  const renderer = rowRenderers[rowType]
  if (!renderer) {
    console.error('Missing renderer for table row', renderer)
  }
  return renderer(props)
}

const updatePastedValues = (rowNames, evt, rowIdx, colIdx, fra) => {
  // Pasted values are not to be consumed if column is odp -- i.e. odp columns are to be skipped.
  // This is achieved by constructing correct 'view' on the fra data in two steps.
  // First odp values values that appear after where paste begins are filtered out.
  const fraOnly = R.filter(R.pipe(R.prop('type'), R.equals('fra')))(R.drop(colIdx, fra))
  // Second both fra and odp columns before where paste begins are concatenated together
  // with the filtered part to preserve correct index.
  const readFrom = R.concat(R.take(colIdx, fra), fraOnly)

  let toPaste = {}
  mapIndexed((r, i) => {
    const row = rowIdx + i
    mapIndexed((c, j) => {
      const col = colIdx + j
      if (R.isNil(readFrom[col])) return
      toPaste = R.mergeDeepRight({ [readFrom[col].year]: { [rowNames[row]]: c } }, toPaste)
    }, r)
  }, readPasteClipboard(evt, 'decimal'))

  const pasted = R.pipe(
    R.map(fra => {
      // Validates pasted values and filters out values that are not accepted
      const acceptedValues = R.pipe(
        R.keys,
        R.map(k => {
          return { [k]: acceptNextDecimal(String(toPaste[fra.year][k]), fra[k]) }
        }),
        R.reduce(R.merge, {})
      )(R.defaultTo({}, toPaste[fra.year]))

      return toPaste[fra.year] ? R.merge(fra, acceptedValues) : null
    }),
    R.reject(R.isNil))(fra)

  return pasted
}
