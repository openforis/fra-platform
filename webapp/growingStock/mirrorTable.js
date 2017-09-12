import React, { Component } from 'react'
import * as R from 'ramda'

class MirrorTable extends Component {

  render () {
    const rows = this.props.rows
    const colsData = R.filter(v => v.type !== 'odp', R.values(this.props.fra))

    return <div>
      <div className="nde__data-table-container">
        <div className="nde__data-table-scroll-content">
          <table className="fra-table">
            <thead>
            <tr>
              <th rowSpan="2" className="fra-table__header-cell">{this.props.header}</th>
              <th colSpan={colsData.length} className="fra-table__header-cell">{this.props.avgTableHeader}</th>
            </tr>
            <tr>
              {
                colsData.map(v =>
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

      <div className="nde__data-table-container">
        <div className="nde__data-table-scroll-content">
          <table className="fra-table">
            <thead>
            <tr>
              <th rowSpan="2" className="fra-table__header-cell">{this.props.header}</th>
              <th colSpan={colsData.length} className="fra-table__header-cell">{this.props.totalTableHeader}</th>
            </tr>
            <tr>
              {
                colsData.map(v =>
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

    </div>
  }

}

export default MirrorTable
