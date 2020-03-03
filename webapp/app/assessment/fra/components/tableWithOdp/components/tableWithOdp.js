import './tableWithOdp.less'

import React from 'react'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'
import * as R from 'ramda'
import clipboard from 'clipboard-polyfill'

import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'
import { toFixed } from '@common/bignumberUtils'
import defaultYears from '@server/eof/defaultYears'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import TableHeaderCell from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableHeaderCell'
import TableBodyRow from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyRow'

const mapIndexed = R.addIndex(R.map)

const getFraValues = (fra, rows) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rows))
  const fraValues = R.pipe(
    R.filter(value => R.includes(value.year, defaultYears)),
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
                  <TableHeaderCell
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
                <TableBodyRow
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

TableWithOdp.propTypes = {
  fra: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,

  copyValues: PropTypes.bool.isRequired
}

TableWithOdp.defaultProps = {
  copyValues: false
}

export default TableWithOdp

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
