import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { useFetchData } from 'client/components/TablePaginated/hooks/useFetchData'
import { Props } from 'client/components/TablePaginated/types'

const TablePaginated = <Datum extends object>(props: Props<Datum>) => {
  const { columns, path } = props

  const { t } = useTranslation()
  useFetchData({ path })
  const data = useTablePaginatedData<Datum>(path)

  return (
    <div>
      {columns.map((column) => {
        const { header: Header, key } = column

        return (
          <div key={`${key}_header`}>
            {typeof Header === 'string' && t(Header)}
            {typeof Header !== 'string' && <Header />}
          </div>
        )
      })}

      {data?.map((datum, rowIndex) => (
        <div key={`row_${String(rowIndex)}`}>
          {columns.map((column) => {
            const { component: Component, key } = column

            return (
              <div key={key}>
                <Component datum={datum} />
              </div>
            )
          })}
        </div>
      ))}

      {/* TODO: add pagination */}
      {/* TODO: add counter */}
    </div>
  )
}

export default TablePaginated
