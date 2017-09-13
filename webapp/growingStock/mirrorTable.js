import React, { Component } from 'react'
import * as R from 'ramda'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'

class MirrorTable extends Component {

  render () {
    const rows = this.props.rows
    const cols = R.filter(v => v.type !== 'odp', R.values(this.props.fra))

    return <div>
      <Table categoriesHeader={this.props.header}
             colsHeader={this.props.avgTableHeader}
             rows={rows}
             cols={cols}
             values={this.props.values}
             type='avg'/>

      <Table categoriesHeader={this.props.header}
             colsHeader={this.props.totalTableHeader}
             rows={rows}
             cols={cols}
             values={this.props.values}
             type='total'/>
    </div>
  }

}

const Table = ({categoriesHeader, colsHeader, cols, rows, type, values}) =>
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
              </th>
            )
          }
        </tr>
        </thead>
        <tbody>

        {
          rows.map((row, i) =>
            <Row
              key={i}
              row={row}
              cols={cols}
              type={type}
              values={values}
            />)
        }
        </tbody>
      </table>
    </div>
  </div>

const Row = ({row, cols, type, values}) =>
  <tr>
    <td className="fra-table__header-cell">{row.localizedName}</td>
    {
      cols.map((col, i) =>
        <Cell
          key={i}
          col={col}
          type={type}
          field={row.field}
          calculated={row.calculated}
          values={values}
        />)
    }
  </tr>

const Cell = ({col, type, field, values, calculated}) => {
  const value = R.pipe(
    R.find(R.propEq('year', col.year)),
    R.defaultTo({}),
    R.prop(`${field}${type === 'avg' ? 'Avg' : ''}`),
    R.defaultTo(null),
  )(values)

  return <td className="fra-table__cell">
    <ThousandSeparatedIntegerInput
      className="fra-table__integer-input"
      integerValue={value}
      disabled={calculated}
      onChange={ e => console.log('-- e ' , e ) }
    />
  </td>
}

export default MirrorTable
