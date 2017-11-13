import React from 'react'
import * as R from 'ramda'
import './style.less'
import assert from 'assert'
import { Link } from '../reusableUiComponents/link'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import Icon from '../reusableUiComponents/icon'
import ReviewIndicator from '../review/reviewIndicator'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { acceptNextDecimal} from '../utils/numberInput'
import { formatNumber } from '../../common/bignumberUtils'

const mapIndexed = R.addIndex(R.map)

export const hasFraValues = (fra, rowsSpecs) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rowsSpecs))
  const flattenedFraValues = R.pipe(
    R.values,
    R.filter(v => v.type !== 'odp'),
    R.map(column => R.props(valueFieldNames, column)),
    R.flatten,
    R.reject(R.isNil)
  )(fra)
  return flattenedFraValues.length > 0
}

export class TableWithOdp extends React.Component {

  render () {
    const rows = this.props.rows
    return <div className="fra-table__container table-with-odp">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">{this.props.categoryHeader}</th>
            <th className="fra-table__header-cell" colSpan={R.values(this.props.fra).length}>{this.props.areaUnitLabel}</th>
          </tr>
          <tr>
            {
              R.values(this.props.fra).map(v =>
                <th className={v.type === 'odp' ? 'odp-header-cell' : 'fra-table__header-cell'} key={`${v.type}_${v.name}`}>
                  {
                    v.type === 'odp'
                      ? <OdpHeading countryIso={this.props.countryIso} odpValue={v}/>
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
        </table>
      </div>
    </div>
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

const OdpHeading = ({countryIso, odpValue}) =>
  <Link className="link" to={`/country/${countryIso}/odp/${odpValue.odpId}`}>
    {odpValue.draft ? <Icon className="icon-sub icon-margin" name="pencil"/> : ''}
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
    className
  } = row
  const validator = row.validator || alwaysOkValidator
  return <tr
    key={field}
    className={`${openCommentThread && R.isEmpty(R.difference(openCommentThread.target, [field])) ? 'fra-row-comments__open' : ''}`}>
    <th className={className ? className : 'fra-table__category-cell'}>{ rowHeader }</th>
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
