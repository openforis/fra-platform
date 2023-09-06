import './Count.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'

type Props = { path: string }

const Count = (props: Props) => {
  const { path } = props
  const { t } = useTranslation()

  const count = useTablePaginatedCount(path)

  if (!count) return null

  return (
    <div className="table-paginated-counts">
      {Object.entries(count).map(([key, value]) => (
        <div key={`count_${key}`} className="table-paginated-count-item">
          {`${t(`common.${key}`)} ${value || 0}`}
        </div>
      ))}
    </div>
  )
}

export default Count
