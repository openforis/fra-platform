import React from 'react'
import * as R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import clipboard from 'clipboard-polyfill'
import './style.less'
import assert from 'assert'
import { Link } from '../reusableUiComponents/link'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import Icon from '../reusableUiComponents/icon'
import ReviewIndicator from '../review/reviewIndicator'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { acceptNextDecimal} from '../utils/numberInput'
import { formatNumber, toFixed } from '../../common/bignumberUtils'
import { hasOdps } from '../assessmentFra/extentOfForest/extentOfForestHelper'

const mapIndexed = R.addIndex(R.map)

const getFraValues = (fra, rowsSpecs) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rowsSpecs))
  const fraValues = R.pipe(
    R.values,
    R.filter(value => value.type !== 'odp'),
    R.map(column => R.props(valueFieldNames, column))
  )(fra)
  return fraValues
}

const hasFraValues = (fra, rowsSpecs) => {
  const fraValues = getFraValues(fra, rowsSpecs)
  const flattenedFraValues = R.pipe(
    R.flatten,
    R.reject(R.isNil)
  )(fraValues)
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

  copyTableAsHtml (rowsSpecs) {
    const transposedFraValues = R.transpose(getFraValues(this.props.fra, rowsSpecs))
    const htmlTable = ReactDOMServer.renderToString(this.clipboardTable(transposedFraValues))
    const dataTransfer = new clipboard.DT()
    dataTransfer.setData("text/plain", this.props.i18n.t('forestCharacteristics.forestCharacteristics'))
    dataTransfer.setData("text/html", htmlTable)
    clipboard.write(dataTransfer)
  }


  render () {
    const rows = this.props.rows
    return <div className="fra-table__container table-with-odp">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">{this.props.categoryHeader}</th>
            <th className="fra-table__header-cell" colSpan={R.values(this.props.fra).length}>
              <div>
                {this.props.tableHeader}
                <button className="fra-table__header-button btn-xs btn-primary" onClick={() => this.copyTableAsHtml(rows)}>
                  {this.props.i18n.t('tableWithOdp.copyToClipboard')}
                </button>
              </div>
            </th>
          </tr>
          <tr>
            {
              R.values(this.props.fra).map(value =>
                <th className={value.type === 'odp' ? 'odp-header-cell' : 'fra-table__header-cell'} key={`${value.type}_${value.name}`}>
                  {
                    value.type === 'odp'
                      ? <OdpHeading countryIso={this.props.countryIso} odpValue={value} section={this.props.section}/>
                      : value.name
                  }
                </th>
              )
            }
          </tr>
          </thead>
          <tbody>
            {buildRows(rows, this.props)}
          </tbody>
        </table>
      </div>
    </div>
  }
}

export class GenerateFraValuesControl extends React.Component {

  constructor(props) {
    super(props)
    const valueFieldNames = R.reject(R.isNil, R.pluck('field', props.rows))
    const annualChangeRates = R.pipe(
      R.map(fieldName => [fieldName, {ratePast: '', rateFuture: ''}]),
      R.fromPairs
    )(valueFieldNames)
    this.state = {generateMethod: '', annualChangeRates}
  }

  render() {
    const {i18n, fra, generatingFraValues, rows, useOriginalDataPoints} = this.props
    const rateValidationClass = rate => this.validRate(rate) || R.isEmpty(rate) ? '' : 'validation-error'
    const rowHeaders = R.reject(R.isNil, R.pluck('rowHeader', rows))
    return <div className="table-with-odp__generate-control">
      <select
        className="select-s"
        value={this.state.generateMethod}
        onChange={evt => this.setState({...this.state, generateMethod: evt.target.value})}>
        <option disabled>{i18n.t('tableWithOdp.placeholderSelect')}</option>
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
        this.state.generateMethod === 'annualChange'
          ? <table className="table-with-odp__generate-inputs-table">
              <tbody>
              {
                this.state.generateMethod === 'annualChange'
                  ? mapIndexed((field, i) =>
                      <tr key={i}>
                        <td className="table-with-odp__generate-input-header">{rowHeaders[i]}</td>
                        <td className="table-with-odp__generate-input-cell">
                          <input
                            type="text"
                            className={`text-input-s ${rateValidationClass(this.state.annualChangeRates[field].ratePast)}`}
                            placeholder={i18n.t('tableWithOdp.placeholderPast')}
                            value={this.state.annualChangeRates[field].ratePast}
                            onChange={(evt) => this.setState(R.assocPath(['annualChangeRates', field, 'ratePast'], evt.target.value, this.state))} />
                        </td>
                        <td className="table-with-odp__generate-input-cell">
                          <input
                            type="text"
                            className={`text-input-s ${rateValidationClass(this.state.annualChangeRates[field].rateFuture)}`}
                            placeholder={i18n.t('tableWithOdp.placeholderFuture')}
                            value={this.state.annualChangeRates[field].rateFuture}
                            onChange={(evt) => this.setState(R.assocPath(['annualChangeRates', field, 'rateFuture'], evt.target.value, this.state))} />
                        </td>
                      </tr>
                    , R.keys(this.state.annualChangeRates))
                  : null
              }
              </tbody>
            </table>
          : null
      }
    </div>
  }

  disableGenerateFraValues (fra, generatingFraValues) {
    if (this.state.generateMethod === '') return true
    if (this.state.generateMethod === 'clearTable') return false
    if (this.state.generateMethod === 'annualChange' && !this.validRates()) return true
    const odps = R.pipe(
      R.values,
      R.filter(value => value.type === 'odp')
    )(fra)
    return generatingFraValues || odps.length < 2
  }

  generateFraValues (generateMethod) {
    const {section, countryIso, i18n, fra, rows, generateFraValues} = this.props
    const generateAnnualChange = () => {
      if (!this.validRates()) { throw new Error('Validation errors rates') }
      generateFraValues(
        section,
        countryIso,
        {
          method: generateMethod,
          changeRates: this.state.annualChangeRates
        }
      )
    }
    const generate = () => {
      if (generateMethod === 'annualChange') {
        generateAnnualChange()
      } else {
        generateFraValues(section, countryIso, {method: generateMethod})
      }
    }
    if (hasFraValues(fra, rows)) {
      if (window.confirm(i18n.t('tableWithOdp.confirmGenerateFraValues'))) {
        generate()
      }
    } else {
      generate()
    }
  }

  validRates() {
    const loop = R.map(value =>
      this.validRate(value.ratePast) && this.validRate(value.rateFuture)
    , R.values(this.state.annualChangeRates))
    return R.all(R.identity, loop)
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
      <TableRow {...props} key={rowIdx} row={row} save={save} saveMany={saveMany} pasteUpdate={pasteUpdate} rowIdx={rowIdx}/>
    , rows)
}

const OdpHeading = ({countryIso, odpValue, section}) =>
  <Link className="link" to={`/country/${countryIso}/odp/${section}/${odpValue.odpId}`}>
    {odpValue.draft ? <Icon className="icon-sub icon-margin-right" name="pencil"/> : ''}
    {odpValue.name}
  </Link>

const fraValueCell = (fraValue, fra, countryIso, save, saveMany, pasteUpdate, field, rowIdx, colIdx) =>
  <ThousandSeparatedDecimalInput
    numberValue={ fraValue[field] }
    onPaste={ e => saveMany(countryIso, pasteUpdate(e, rowIdx, colIdx, fra)) }
    onChange={ e => { save(countryIso, fraValue.name, e.target.value, fraValue, field, acceptNextDecimal) } }/>

const validationErrorRow = columnErrorMsgs => {
  if (R.all(R.isNil, columnErrorMsgs)) return null
  return <tr key="validationError">
    <td style={{padding: '0'}}/>
    {
      mapIndexed((errorMsgs, colIdx) =>
        <td className="fra-table__validation-cell" key={colIdx}>
          <div className="fra-table__validation-container">
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

const renderFieldRow = ({row, countryIso, fra, save, saveMany, pasteUpdate, rowIdx, openCommentThread, section}) => {
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
          const tdClasses =
            R.pipe(
              R.reject(R.isNil),
              R.join(' ')
            )([
                fraColumn.type === 'odp' ? 'odp-value-cell' : 'fra-table__cell',
                validator(fraColumn, field) ? null : 'validation-error'
            ])
          return (
            <td className={tdClasses} key={`${fraColumn.type}_${fraColumn.name}`}>
            {
              fraColumn.type === 'odp'
                ? formatNumber(fraColumn[field])
                : fraValueCell(fraColumn, fra, countryIso, save, saveMany, pasteUpdate, field, rowIdx, colIdx)
            }
            </td>
          )
        },
        R.values(fra))
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={`${field}_ri`}
          section={section}
          title={rowHeader}
          target={[field]}
          countryIso={countryIso} />
      </div>
    </td>
  </tr>
}

const rowRenderers = {
  field: renderFieldRow,
  custom: ({row, fra}) => row.render(fra),
  validationErrors: ({row, fra}) => validationErrorRow(row.validationErrorMessages(fra))
}

const TableRow = props => {
  const rowType = props.row.type
  const renderer = rowRenderers[rowType]
  assert(renderer, `No renderer found for row type ${rowType}`)
  return renderer(props)
}

const updatePastedValues = (rowNames, evt, rowIdx, colIdx, fra) => {
  // Pasted values are not to be consumed if column is odp -- i.e. odp columns are to be skipped.
  // This is achieved by constructing correct 'view' on the fra data in two steps.
  // First odp values values that appear after where paste begins are filtered out.
  const fraOnly =  R.filter(R.pipe(R.prop('type'), R.equals('fra')))(R.drop(colIdx, fra))
  // Second both fra and odp columns before where paste begins are concatenated together
  // with the filtered part to preserve correct index.
  const readFrom = R.concat(R.take(colIdx, fra), fraOnly)

  let toPaste = {}
  mapIndexed((r, i) => {
    const row = rowIdx + i
    mapIndexed((c, j) => {
      const col = colIdx + j
      if (R.isNil(readFrom[col])) return
      toPaste = R.mergeDeepRight({[readFrom[col].year]: {[rowNames[row]]: c}}, toPaste)
    }, r)
  }, readPasteClipboard(evt, 'decimal'))

  const pasted = R.pipe(
    R.map(fra => {
      // Validates pasted values and filters out values that are not accepted
      const acceptedValues = R.pipe(
        R.keys,
        R.map(k => {
          return {[k]: acceptNextDecimal(String(toPaste[fra.year][k]), fra[k])}
        }),
        R.reduce(R.merge, {})
      )(R.defaultTo({}, toPaste[fra.year]))

      return toPaste[fra.year] ? R.merge(fra, acceptedValues) : null
    }),
    R.reject(R.isNil))(fra)

  return pasted
}
