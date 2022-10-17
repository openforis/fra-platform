import React from 'react'

type Props = {
  children: JSX.Element[] | JSX.Element
}

const TableBody: React.FC<Props> = (props: Props) => {
  const { children } = props

  return <div className="table-body">{children}</div>
}

export default TableBody
