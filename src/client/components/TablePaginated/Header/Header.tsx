import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { DataCell } from 'client/components/DataGrid'
import OrderBy from 'client/components/TablePaginated/Header/OrderBy'
import { Column } from 'client/components/TablePaginated/types'

type Props<Datum> = {
  columns: Array<Column<Datum>>
  path: string
}

const Header = <Datum extends object>(props: Props<Datum>): ReactElement => {
  const { columns, path } = props
  const { t } = useTranslation()

  return (
    <>
      {columns.map((column) => {
        const { header: Header, key } = column

        return (
          <DataCell key={`${key}_header`} header>
            {typeof Header === 'string' && t(Header)}
            {typeof Header !== 'string' && <Header />}

            {column.orderByProperty && <OrderBy column={column} path={path} />}
          </DataCell>
        )
      })}
    </>
  )
}

export default Header
