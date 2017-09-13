import React, { Component } from 'react'
import * as R from 'ramda'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'

class MirrorTable extends Component {

  render () {
    const rows = this.props.rows
    const cols = R.filter(v => v.type !== 'odp', R.values(this.props.fra))

    return <div>
      <Table countryIso={this.props.countryIso}
             categoriesHeader={this.props.header}
             colsHeader={this.props.avgTableHeader}
             rows={rows}
             cols={cols}
             fra={this.props.fra}
             values={this.props.values}
             type='avg'
             updateValues={this.props.updateValues}
      />

      <Table countryIso={this.props.countryIso}
             categoriesHeader={this.props.header}
             colsHeader={this.props.totalTableHeader}
             rows={rows}
             cols={cols}
             fra={this.props.fra}
             values={this.props.values}
             type='total'
             updateValues={this.props.updateValues}
      />
    </div>
  }

}

const Table = ({countryIso, categoriesHeader, colsHeader, cols, rows, type, fra, values, updateValues}) =>
  <div className="nde__data-table-container">
    <div className="nde__data-table-scroll-content">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell">{categoriesHeader}</th>
          <th colSpan={cols.length} className="fra-table__header-cell">{colsHeader}</th>
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
  </div>

const Row = ({countryIso, row, cols, type, fra, values, updateValues}) =>
  <tr>
    <td className="fra-table__header-cell">{row.localizedName}</td>
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
