import React from 'react'

type Props = {
  children: JSX.Element[] | JSX.Element
}

const TableRow: React.FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="table-row">{children}</div>
}

export default TableRow
