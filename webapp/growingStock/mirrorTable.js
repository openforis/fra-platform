import React, { Component } from 'react'
import * as R from 'ramda'

class MirrorTable extends Component {

  render () {
    const rows = this.props.rows
    const header = this.props.header

    return <div className="nde__data-table-container">
      <div className="nde__data-table-scroll-content">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell">{header}</th>
            {
              R.values(this.props.fra).map(v =>
                v.type !== 'odp'
                  ? <th className="fra-table__header-cell-right" key={`${v.name}`}>
                    {v.name}
                  </th>
                  : null
              )
            }
          </tr>
          </thead>
        </table>
      </div>
    </div>
  }

}

export default MirrorTable
