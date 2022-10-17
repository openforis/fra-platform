import React from 'react'

type Props = {
  children: JSX.Element[] | JSX.Element
}

const TableHead: React.FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="table-head">{children}</div>
}

export default TableHead
