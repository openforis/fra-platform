import React from 'react'

import { TablePaginatedEmptyListComponent } from 'client/components/TablePaginated/types'

const DefaultEmptyList: React.FC = () => {
  return <div />
}

type Props = {
  Component?: TablePaginatedEmptyListComponent | undefined
}

const EmptyList: React.FC<Props> = (props) => {
  const { Component } = props

  const EmptyListComponent = Component ?? DefaultEmptyList

  return <EmptyListComponent />
}

EmptyList.defaultProps = {
  Component: undefined,
}

export default EmptyList
