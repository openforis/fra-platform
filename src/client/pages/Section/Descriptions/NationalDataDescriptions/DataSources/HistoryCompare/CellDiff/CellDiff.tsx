import './CellDiff.scss'
import React from 'react'

import classNames from 'classnames'
import { Change } from 'diff'

import { DataCell } from 'client/components/DataGrid'

type Props = {
  changes: Array<Change>
  lastCol?: boolean
  lastRow: boolean
}

const CellDiff: React.FC<Props> = (props) => {
  const { changes, lastCol, lastRow } = props

  return (
    <DataCell className="history-compare__cell-diff" lastCol={lastCol} lastRow={lastRow}>
      {changes?.map((change, i) => {
        const { added, removed, value } = change

        return (
          <>
            {value.split('\n\r').map((text, j) => {
              const key = `${value}_${String(i)}`
              return (
                <React.Fragment key={key}>
                  <span key={`${key}_${String(j)}`} className={classNames({ added, removed })}>
                    {text}
                  </span>
                  {j !== 0 && <br />}
                </React.Fragment>
              )
            })}
          </>
        )
      })}
    </DataCell>
  )
}

CellDiff.defaultProps = {
  lastCol: false,
}

export default CellDiff
