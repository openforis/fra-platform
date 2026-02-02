import './ExportButton.scss'
import React from 'react'
import { Link } from 'react-router'

import { useTablePaginatedCount } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { useExportUrl } from './hooks/useExportUrl'

type Props = {
  disabled?: boolean
  path: string
}

const ExportButton: React.FC<Props> = (props) => {
  const { disabled: disabledProp, path } = props

  const exportUrl = useExportUrl({ path })

  const count = useTablePaginatedCount(path)
  const disabled = disabledProp || count?.total === 0

  const className = useButtonClassName({ disabled, iconName: 'hit-down' })

  return (
    <div className="table-paginated-export-button">
      <Link
        aria-disabled={disabled}
        className={className}
        tabIndex={disabled ? -1 : undefined}
        target="_blank"
        to={exportUrl}
      >
        <Icon name="hit-down" />
        CSV
      </Link>
    </div>
  )
}

export default ExportButton
