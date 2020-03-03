import './tableWithOdp.less'
import React from 'react'
import * as R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import clipboard from 'clipboard-polyfill'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'
import { formatNumber, toFixed } from '@common/bignumberUtils'

import defaultYears from '@server/eof/defaultYears'
import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'
import ButtonTableExport from '@webapp/components/buttonTableExport'

import TableColumnHeader from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableColumnHeader'

const mapIndexed = R.addIndex(R.map)

const getFraValues = (fra, rows) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rows))
  const fraValues = R.pipe(
    R.filter(value => R.contains(value.year, defaultYears)),
    R.map(column => R.props(valueFieldNames, column))
  )(fra)
  return fraValues
}

export class TableWithOdp extends React.Component {
  constructor (props) {
    super(props)
    this.tableRef = React.createRef()
  }

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
    const {
      copyValues = true, disabled = false, section, sectionAnchor,
      i18n, userInfo,
      save, saveMany, countryIso,
      rows,
      fra //TODO rename in data
    } = this.props

    console.log(this.props)

    const dataValues = Object.values(fra)

    return (
      <div className="fra-table__container table-with-odp">
        <div className="fra-table__scroll-wrapper">
          <ButtonTableExport
            tableRef={this.tableRef}
            filename={sectionAnchor}
          />
          <table ref={this.tableRef} className="fra-table">
            <thead>
            <tr>
              <th className="fra-table__header-cell-left" rowSpan="2">{this.props.categoryHeader}</th>
              <th className="fra-table__header-cell" colSpan={dataValues.length}>
                <div>

                  {
                    this.props.tableHeader
                  }

                  {
                    copyValues && userInfo &&
                    <button className="fra-table__header-button btn-xs btn-primary no-print"
                            onClick={() => this.copyTableAsHtml()}>
                      {this.props.i18n.t('tableWithOdp.copyToClipboard')}
                    </button>
                  }
                </div>
              </th>
            </tr>
            <tr>
              {
                dataValues.map((datum, i) => (
                  <TableColumnHeader
                    key={i}
                    datum={datum}
                    section={section}
                  />
                ))
              }
            </tr>
            </thead>
            <tbody>
            {
              rows.map((row, i) => (
                <TableRow
                  {...this.props}
                  key={i}
                  row={row}
                  save={R.partial(save, [section])}
                  saveMany={R.partial(saveMany, [section])}
                  pasteUpdate={R.partial(updatePastedValues, [R.pluck('field', rows)])}
                  rowIdx={i}
                />
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableWithOdp

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

const renderFieldRow = ({ row, countryIso, fra, save, saveMany, pasteUpdate, rowIdx, openCommentThreadTarget, section, disabled }) => {
  const {
    rowHeader,
    field,
    className,
    rowVariable
  } = row
  const validator = row.validator || alwaysOkValidator
  return <tr
    key={field}
    className={`${!R.isEmpty(openCommentThreadTarget) && R.isEmpty(R.difference(openCommentThreadTarget, [field])) ? 'fra-row-comments__open' : ''}`}>
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
