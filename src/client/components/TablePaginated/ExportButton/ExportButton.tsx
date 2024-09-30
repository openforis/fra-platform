import './ExportButton.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

import { useExportUrl } from './hooks/useExportUrl'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

const ExportButton: React.FC<Props> = (props) => {
  const { filters, path } = props

  const exportUrl = useExportUrl({ filters, path })

  const className = useButtonClassName({ iconName: 'hit-down' })
  return (
    <div className="table-paginated-export-button">
      <Link className={className} target="_blank" to={exportUrl}>
        <Icon className="icon-sub icon-white" name="hit-down" />
        CSV
      </Link>
    </div>
  )
}

export default ExportButton
