import React from 'react'

type Props = {
  children: JSX.Element[] | JSX.Element | string
}

const TableCell: React.FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="table-cell">{children}</div>
}

export default TableCell
