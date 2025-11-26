import './ExportButton.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { useTablePaginatedCount } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { useExportUrl } from './hooks/useExportUrl'

type Props = {
  path: string
}

const ExportButton: React.FC<Props> = (props) => {
  const { path } = props

  const exportUrl = useExportUrl({ path })

  const count = useTablePaginatedCount(path)
  const disabled = count?.total === 0

  const className = useButtonClassName({ disabled, iconName: 'hit-down' })

  return (
    <div className="table-paginated-export-button">
      <Link className={className} target="_blank" to={exportUrl}>
        <Icon name="hit-down" />
        CSV
      </Link>
    </div>
  )
}

export default ExportButton
