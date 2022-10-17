import './Table.scss'
import React from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const Table: React.FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="table-container">{children}</div>
}

export default Table
