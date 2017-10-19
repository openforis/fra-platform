import React from 'react'
import * as R from 'ramda'

import { Link } from './../link'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import ReviewIndicator from '../review/reviewIndicator'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import {acceptNextInteger, acceptNextDecimal} from '../utils/numberInput'

const mapIndexed = R.addIndex(R.map)

export class TableWithOdp extends React.Component {

  render () {
    const rows = this.props.rows
    return <div className="fra-table__container table-with-odp">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell" rowSpan="2">{this.props.categoryHeader}</th>
            <th className="fra-table__header-cell-middle" colSpan={R.values(this.props.fra).length}>{this.props.areaUnitLabel}</th>
          </tr>
          <tr>
            {
              R.values(this.props.fra).map(v =>
                <th className={`fra-table__header-cell-right ${v.type === 'odp' ? 'odp-header-cell' : ''}`} key={`${v.type}_${v.name}`}>
                  { v.type === 'odp' ? <OdpHeading countryIso={this.props.countryIso} odpValue={v}/>
                    : v.name
                  }
                </th>
              )
            }
          </tr>
          </thead>
          <tbody>
            {buildRows(rows, this.props)}
          </tbody>
          <tfoot>
            {
              this.props.footerRow
                ?  buildFooterRow(this.props)
                : null
            }
          </tfoot>
        </table>
      </div>
    </div>
  }
}

const buildRows = (rows, props) => {
  const save = R.partial(props.save, [props.section])
  const saveMany = R.partial(props.saveMany, [props.section])
  const paste = R.partial(updatePastedValues, [props.rowNames])

  return mapIndexed((row, i) =>
      tableRow(row, props.countryIso, props.fra, save, saveMany, paste, i, props.openCommentThread, props.section)
    , rows)
}

const buildFooterRow = (props) => {
  const {localizedName, yearValues} = props.footerRow
  return <tr>
    <td>{localizedName}</td>
    {
      mapIndexed((value, i) =>
        <td key={i}>{yearValues[value.name]}</td>,
        R.values(props.fra))
    }
  </tr>
}

const OdpHeading = ({countryIso, odpValue}) =>
  <Link className="link" to={`/country/${countryIso}/odp/${odpValue.odpId}`}>
    {odpValue.draft ? <svg className="icon icon-sub icon-red icon-margin"><use xlinkHref="img/icons.svg#alert"/></svg> : ''}
    {odpValue.name}
  </Link>

const fraValueCell = (fraValue, fra, countryIso, save, saveMany, pasteUpdate, field, colIdx, rowIdx) =>
  <ThousandSeparatedDecimalInput
    numberValue={ fraValue[field] }
    precision={2}
    onPaste={ e => saveMany(countryIso, pasteUpdate(e, colIdx, rowIdx, fra)) }
    onChange={ e => { save(countryIso, fraValue.name, e.target.value, fraValue, field, acceptNextDecimal) } }/>

const odpCell = (odpValue, field) =>
  <ThousandSeparatedDecimalInput
    numberValue={odpValue[field]}
    precision={2}
    disabled={true} />

const tableRow = (row, countryIso, fra, save, saveMany, pasteUpdate, colId, openThread, section) => {
  const {localizedName, field, className, customRender} = row

  return <tr
    key={field}
    className={`${openThread && R.isEmpty(R.difference(openThread.target, [field])) ? 'fra-row-comments__open' : ''}`}>
    <td className={className ? className : 'fra-table__header-cell'}>{ localizedName }</td>
    {
      customRender
      ? customRender(fra)
      : mapIndexed((v, i) =>
          <td className={`fra-table__cell ${v.type === 'odp' ? 'odp-value-cell' : ''}`} key={`${v.type}_${v.name}`}>
            {
              v.type === 'odp'
                ? odpCell(v, field)
                : fraValueCell(v, fra, countryIso, save, saveMany, pasteUpdate, field, colId, i)
            }
          </td>
        , R.values(fra))
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={`${field}_ri`}
          section={section}
          name={localizedName}
          target={[field]}
          countryIso={countryIso} />
      </div>
    </td>
  </tr>
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
  }, readPasteClipboard(evt))

  const pasted = R.pipe(
    R.map(fra => {
      // Validates pasted values and filters out values that are not accepted by
      // acceptNextInteger-function.
      const acceptedValues = R.pipe(
        R.keys,
        R.map(k => {
          return {[k]: acceptNextInteger(String(toPaste[fra.year][k]), fra[k])}
        }),
        R.reduce(R.merge, {})
      )(R.defaultTo({}, toPaste[fra.year]))

      return toPaste[fra.year] ? R.merge(fra, acceptedValues) : null
    }),
    R.reject(R.isNil))(fra)

  return pasted
}
