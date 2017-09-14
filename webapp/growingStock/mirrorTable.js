import React, { Component } from 'react'
import * as R from 'ramda'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import ReviewIndicator from '../review/reviewIndicator'

class MirrorTable extends Component {

  render () {
    const cols = R.filter(v => v.type !== 'odp', R.values(this.props.fra))

    return <div>
      <Table
        categoriesHeader={this.props.header}
        colsHeader={this.props.avgTableHeader}
        cols={cols}
        type='avg'
        {...this.props} />
      <Table
        categoriesHeader={this.props.header}
        colsHeader={this.props.totalTableHeader}
        cols={cols}
        type='total'
        {...this.props} />
    </div>
  }

}

const Table = ({i18n, openCommentThread, section, countryIso, categoriesHeader, colsHeader, cols, rows, type, fra, values, updateValues}) =>
  <div className="nde__data-table-container">
    <div className="nde__data-table-scroll-content">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell">{categoriesHeader}</th>
          <th colSpan={cols.length} className="fra-table__header-cell-middle">{colsHeader}</th>
        </tr>
        <tr>
          {
            cols.map(v =>
              <th className="fra-table__header-cell-right" key={`${v.name}`}>
                {v.name}
              </th>)
          }
        </tr>
        </thead>
        <tbody>
        {
          rows.map((row, i) =>
            <Row
              openCommentThread={openCommentThread}
              i18n={i18n}
              countryIso={countryIso}
              key={i}
              row={row}
              cols={cols}
              type={type}
              fra={fra}
              values={values}
              updateValues={updateValues}
            />)
        }
        </tbody>
      </table>
    </div>
    <div className="nde__comment-column">
      {
        rows.map((row, i) =>
          <ReviewIndicator
            key={`${row.field}_ri`}
            section={section}
            name={i18n.t(row.labelKey)}
            target={[row.field, type]}
            countryIso={countryIso}
          />)
      }
    </div>
  </div>

const Row = ({openCommentThread, i18n, countryIso, row, cols, type, fra, values, updateValues}) =>
  <tr
    className={`${openCommentThread && R.isEmpty(R.difference(openCommentThread.target, [row.field, type])) ? 'fra-row-comments__open' : ''}`}>
    <td className="fra-table__header-cell">{i18n.t(row.labelKey)}</td>
    {
      cols.map((col, i) =>
        <Cell
          countryIso={countryIso}
          key={i}
          col={col}
          type={type}
          field={row.field}
          calculated={row.calculated}
          values={values}
          updateValues={updateValues}
          fra={fra}
        />)
    }
  </tr>

const Cell = ({countryIso, col, type, field, fra, values, calculated, updateValues}) => {
  const value = R.pipe(
    R.find(R.propEq('year', col.year)),
    R.defaultTo({}),
    R.prop(`${field}${type === 'avg' ? 'Avg' : ''}`),
    R.defaultTo(null),
  )(values)

  return <td className={`gs-fra-table__${calculated ? 'text-readonly-cell' : 'cell'}`}>
    {calculated
      ? <div>{value}</div>
      : <ThousandSeparatedIntegerInput
        className="fra-table__integer-input"
        integerValue={value}
        onChange={e => updateValues(fra, values, countryIso, col.year, field, type, e.target.value)}
      />}
  </td>
}

export default MirrorTable
