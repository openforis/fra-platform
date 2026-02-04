import './Actions.scss'
import React, { useMemo } from 'react'

import Hr from 'client/components/Hr'
import ExportButton from 'client/components/TablePaginated/ExportButton'
import Filters from 'client/components/TablePaginated/Filters'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Props = Pick<
  BaseProps<object>,
  'disableExport' | 'disableFilters' | 'export' | 'extraActions' | 'filters' | 'path'
>

const Actions: React.FC<Props> = (props) => {
  const { disableExport, disableFilters, export: exportTable, extraActions, filters, path } = props

  const withFilters = useMemo<boolean>(() => filters.filter((filter) => !filter.hidden).length > 0, [filters])

  const hasDefaultActions = exportTable || withFilters
  const hasActions = extraActions?.length > 0 || hasDefaultActions

  if (!hasActions) return null

  return (
    <div className="table-paginated-actions">
      {extraActions?.length > 0 && (
        <div className="table-paginated-actions__row table-paginated-actions__row--extra">
          {extraActions.map((action, index) => (
            <React.Fragment key={`extra-action-${String(index)}`}>{action}</React.Fragment>
          ))}
        </div>
      )}
      {hasDefaultActions && (
        <div className="table-paginated-actions__row">
          {exportTable && <ExportButton disabled={disableExport} path={path} />}
          {exportTable && withFilters && <Hr vertical />}
          {withFilters && <Filters disabled={disableFilters} filters={filters} path={path} />}
        </div>
      )}
    </div>
  )
}

export default Actions
