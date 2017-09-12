import React, { Component } from 'react'
import * as R from 'ramda'

class MirrorTable extends Component {

  render () {
    const rows = this.props.rows
    const cols = R.filter(v => v.type !== 'odp', R.values(this.props.fra))

    return <div>
      <Table categoriesHeader={this.props.header}
             colsHeader={this.props.avgTableHeader}
             rows={rows}
             cols={cols}
             type='avg'/>

      <Table categoriesHeader={this.props.header}
             colsHeader={this.props.totalTableHeader}
             rows={rows}
             cols={cols}
             type='total'/>
    </div>
  }

}

const Table = ({categoriesHeader, colsHeader, cols, rows, type}) =>
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
      </table>
    </div>
  </div>

export default MirrorTable
