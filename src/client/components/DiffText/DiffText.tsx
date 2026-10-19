import './DiffText.scss'
import React from 'react'
import classNames from 'classnames'
import { ChangeObject } from 'diff'

interface Props {
  changes: Array<ChangeObject<unknown>>
  className?: string
}

const DiffText: React.FC<Props> = (props) => {
  const { changes, className = '' } = props

  return (
    <div className={classNames('diff-text', className)}>
      {changes?.map((change, i) => {
        const { added, removed, value } = change
        const key = `${value}_${String(i)}`
        const valueArray = Array.isArray(value) ? value : (value as string).split('\n\r')

        return (
          <React.Fragment key={key}>
            {valueArray.map((text, j) => (
              <React.Fragment key={`${key}_${String(j)}`}>
                {i + j !== 0 && <br />}
                <span className={classNames({ added, removed })}>{text}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default DiffText
