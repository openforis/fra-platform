import './Actions.scss'
import React, { useMemo } from 'react'

import Hr from 'client/components/Hr'
import ExportButton from 'client/components/TablePaginated/ExportButton/ExportButton'
import Filters from 'client/components/TablePaginated/Filters/Filters'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Props = Pick<BaseProps<object>, 'export' | 'extraActions' | 'filters' | 'path'>

const Actions: React.FC<Props> = (props) => {
  const { export: exportTable, extraActions, filters, path } = props

  const withFilters = useMemo<boolean>(() => filters.filter((filter) => !filter.hidden).length > 0, [filters])

  const hasDefaultActions = exportTable || withFilters
  const hasActions = extraActions?.length > 0 || hasDefaultActions

  if (!hasActions) return null

  return (
    <div className="table-paginated-actions">
      {extraActions?.length > 0 && (
        <>
          {extraActions.map((action, index) => (
            <React.Fragment key={`extra-action-${String(index)}`}>{action}</React.Fragment>
          ))}
          {hasDefaultActions && <Hr vertical />}
        </>
      )}
      {exportTable && <ExportButton path={path} />}
      {exportTable && withFilters && <Hr vertical />}
      {withFilters && <Filters filters={filters} path={path} />}
    </div>
  )
}

export default Actions
