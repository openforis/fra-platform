import React from 'react'
import { useTranslation } from 'react-i18next'

import DataColumn from 'client/components/DataGrid/DataColumn'
import OrderBy from 'client/components/TablePaginated/Header/OrderBy'
import { Column } from 'client/components/TablePaginated/types'

type Props<Datum> = {
  columns: Array<Column<Datum>>
  path: string
}

const Header = <Datum extends object>(props: Props<Datum>) => {
  const { columns, path } = props
  const { t } = useTranslation()

  return (
    <>
      {columns.map((column) => {
        const { header: Header, key } = column

        return (
          <DataColumn head key={`${key}_header`}>
            {typeof Header === 'string' && t(Header)}
            {typeof Header !== 'string' && <Header />}

            {column.orderByProperty && <OrderBy column={column} path={path} />}
          </DataColumn>
        )
      })}
    </>
  )
}

export default Header
