import './DiffText.scss'
import React from 'react'

import classNames from 'classnames'
import { Change } from 'diff'

interface Props {
  changes: Array<Change>
  className?: string
}

const DiffText: React.FC<Props> = (props) => {
  const { changes, className = '' } = props

  return (
    <div className={classNames('diff-text', className)}>
      {changes?.map((change, i) => {
        const { added, removed, value } = change
        const key = `${value}_${String(i)}`

        return (
          <React.Fragment key={key}>
            {value.split('\n\r').map((text, j) => (
              <React.Fragment key={`${key}_${String(j)}`}>
                <span className={classNames({ added, removed })}>{text}</span>
                <br />
              </React.Fragment>
            ))}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default DiffText
